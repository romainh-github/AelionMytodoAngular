import { Component, OnInit } from '@angular/core';
import { TodoService } from './../../../shared/services/todo.service';
import { Subscription } from 'rxjs';
import { TodoInterface } from './../../../shared/interfaces/todo-interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public todos: TodoInterface[];
  public todoL: number;
  /**
   * Subscribing to list of TodoInterface
   */
  private todoListSubscription: Subscription;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoListSubscription = this.todoService.getTodoList().subscribe((todos) => {
      this.todos = todos;
      this.todoL = todos.length;
      console.log('footer::init :: Il y a ' + this.todoL + ' todos.');
    });
  }

  private _loadFooter(): void {
    this.ngOnInit();
  }

}
