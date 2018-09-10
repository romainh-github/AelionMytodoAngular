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

  public constructor(private todoService: TodoService) {
    this.todos = [];

    this.todoSubscription = this.todoService.getTodo().subscribe((todo) => {
      console.log('Observable of todo: ' + JSON.stringify(todo));
      this.todos.push(todo);
    });
   }

  ngOnInit() {
  }



}
