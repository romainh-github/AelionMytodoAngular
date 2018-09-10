import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
// import des modules d'observation
import { Observable, Subject } from 'rxjs';
import { TodoInterface } from './../interfaces/todo-interface';
// import constants
import { Constants } from './../constants/constants';



@Injectable({
  providedIn: 'root'
})
export class TodoService {
  /**
   * Define an observable subject of type TodoInterface
   */
  private todoSubject: Subject<TodoInterface> = new Subject<TodoInterface>();

  /**
   * Inject dependency HttpClient
   * @param _api HttpClient transport to backend
   */
  constructor(private _api: HttpClient) { }

  public getTodos(id: number = null): Observable<TodoInterface[]> {
    if (id !== null) {
      return this._api.get<TodoInterface[]>(
        Constants._API_ROOT + '/' + id
      );
    } else {
      return this._api.get<TodoInterface[]>(
        Constants._API_ROOT
      );
    }
  }

  /**
   * Post method to add todo to db
   * @param todo , the todo to add to db from form
   */
  public addTodo(todo: TodoInterface) {
    this._api.post<TodoInterface[]>(
      Constants._API_ROOT,
      todo)
        .subscribe((addedTodo) => {
          addedTodo[0].isChecked = false;
          this.sendTodo(addedTodo[0]);
      });
  }

  public deleteTodo(todo: TodoInterface) {
    this._api.delete<TodoInterface[]>(
      Constants._API_ROOT + '/' + todo.id
    ).subscribe((result) => {
      // nothing
    });
  }

/**
 * Method allowing classes to subscribe to the subject
 */
  public getTodo(): Observable <TodoInterface> {
    return this.todoSubject.asObservable();
  }

  /**
   * Broadcast the subject to the subscribers
   * @param todo TodoInterface un todo qui passe
   */
  public sendTodo(todo: TodoInterface) {
    this.todoSubject.next(todo);
  }
  /**
   * Method to edit the todo in the db and broadcast change
   * @param todo : edited todo
   */
  public editTodo(todo: TodoInterface): void {
    this._api.put<TodoInterface>(
      Constants._API_ROOT + '/' + todo.id,
      todo
    ).subscribe((result) => {
      // broadcast change to the service
      const _emptyTodo = {
        title: '',
        start: new Date(),
        end: new Date()
      };
      this.sendTodo(todo);
      this.sendTodo(_emptyTodo);
    });
  }





}
