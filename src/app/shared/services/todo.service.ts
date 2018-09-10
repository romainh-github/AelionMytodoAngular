import { Injectable } from '@angular/core';
// import des modules d'observation
import { Observable, Subject } from 'rxjs';
import { TodoInterface } from './../interfaces/todo-interface';



@Injectable({
  providedIn: 'root'
})
export class TodoService {
  /**
   * Define an observable subject of type TodoInterface
   */
  private todoSubject: Subject<TodoInterface> = new Subject<TodoInterface>();

  constructor() { }
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



}
