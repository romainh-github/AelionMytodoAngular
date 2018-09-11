import { Component, OnInit } from '@angular/core';
import { TodoInterface } from './../../shared/interfaces/todo-interface';
import { TodoService } from './../../shared/services/todo.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit {


  /**
   * Subscribing to a todo coming from TodoService
   */
  private todoSubscription: Subscription;

  public todos: TodoInterface[];
  public checkedStatus: boolean = false;

  public constructor(private todoService: TodoService) {
    this.todos = [];

    this.todoSubscription = this.todoService.getTodo().subscribe((todo) => {
      console.log('Reception of observable of todo in todo-table: ' + JSON.stringify(todo));
      // if is not already in the list
      // if it exists i must replace the old value and not create a new line
      const index = this.todos.findIndex((obj) => obj.id === todo.id);
      // could be coded as :
      // const index: number = -1;
      // const ticker: number = 0;
      // for (const _todo of this.todos){ if(_todo.id === todo.id){index = ticker} ticker ++;}
      if ( index === -1 && todo.hasOwnProperty('id')) {
        this.todos.push(todo);
      } else {
        this.todos[index] = todo;
      }
      this.todoService.sendTodoList(this.todos);
    });
   }

  ngOnInit() {
    // Get todos from db by subscribing to the observable
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      console.log('Il y a ' + this.todos.length + ' todos.');
      this.todoService.sendTodoList(this.todos);
    });

  }

  public delete(index: number): void {
    const _todo = this.todos[index];
    console.log('Suppression de la ligne : ' + index);
    this.todos.splice(index, 1);
    this.todoService.deleteTodo(_todo);
    this.todoService.sendTodoList(this.todos);
    if (this.todos.length === 0) {
      this.checkedStatus = false;
    }

  }

  public isChecked(todo: TodoInterface): boolean {
    return todo.isChecked;
  }

  /**
 * @param index
 * toggle state of checkbox
 */
  public toggle(index: number): void {
    this.todos[index].isChecked = ! this.todos[index].isChecked;
    console.log('toggled to ' + this.todos[index].isChecked);
    this.checkedStatus = this._allChecked();
    console.log('checkedstatus est : ' + this.checkedStatus);
  }
  /**
   * delete all checked todos
   */
    public deleteAll(): void {
    const _todos: TodoInterface[] = [];

    for (const todo of this.todos) {
      if ( !todo.isChecked) {
        _todos.push(todo);
        console.log('ce qui reste est : ' + todo.title);
      } else {
        this.todoService.deleteTodo(todo);
      }
        this.checkedStatus = false;
    }
    this.todos = _todos;
    this.todoService.sendTodoList(this.todos);
    }
    public toggleAll(): void {

      this.checkedStatus = !this.checkedStatus;
      this._check();
      console.log('valeur de checkedStatus ' + this.checkedStatus);
  }

  private _check(): void {
    for (let index = 0; index < this.todos.length; index++) {
      this.todos[index].isChecked = this.checkedStatus;
    }
  }

  private _allChecked(): boolean {
    let allChecked: boolean = false;
    for (const todo of this.todos) {
      if (todo.isChecked) {
          allChecked = true;
      }
    }


    return allChecked;
  }
  /**
   * Check if one of the checkbox is checked
   */
  public notChecked(): boolean {
    let status: boolean = true;
    for (const todo of this.todos) {
      if (todo.isChecked) {
          status = false;
      }
    }
    if (this.todos.length === 0) {
      this.checkedStatus = false;
    }
    return status;
  }

  /**
   * Method to edit a todo
   * @param todo : edit a todo
   */
  public edit(todo: TodoInterface): void {
    console.log('click ' + todo.title);
    this.todoService.sendTodo(todo);
  }



}
