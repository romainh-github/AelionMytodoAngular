import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateValidators } from './../../shared/validators/date-validators';
import { TodoService } from './../../shared/services/todo.service';
import { TodoInterface } from '../../shared/interfaces/todo-interface';
import { Subscription } from 'rxjs';

/**
 * Import external library
 */
import * as moment from 'moment';

@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  /**
   * @var todoForm: FormGroup , manages form with ReactiveForms
   */
  public todoForm: FormGroup;
  /**
   * Subscribing to todo list from todo table via todo.service
   */
  private todoSubscription: Subscription;

  /**
   * @var todoEdit : value to display when editing
   */
  private todoEdit: TodoInterface;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) {
    // create an empty todoEdit
    this.todoEdit = {
      title: '',
      start: new Date(),
      end: new Date(),
    };
    // subscription to one todo from the table
    this.todoSubscription = this.todoService.getTodo().subscribe((aTodo) => {
      console.log('Reception of observable of todo in todo form : ' + JSON.stringify(aTodo));
      this.todoEdit = aTodo;
      // reload ngOnInit()
      this._loadForm();
    });

  }
/**
 * @return FormControl controles title of form
 */
  public get title() {
    return this.todoForm.controls.title;
  }

  /**
   * Method defines on OnInit interface
   * call just after the end of the constructor
   * create form todoForm
   */
  ngOnInit() {
    this.todoForm = this.formBuilder.group(
      {
        title: [
          // default value
          this.todoEdit.title,
          // validation rule
          [Validators.required, Validators.minLength(5)]
        ],
        start: [
          moment(this.todoEdit.start).format('YYYY-MM-DD'),
          [Validators.required]
        ],
        end: [
          moment(this.todoEdit.end).format('YYYY-MM-DD'),
          [Validators.required]
        ]
      },
      {
        validator: Validators.compose([
          DateValidators.dateLessThan('start', 'end', {'start': true})
        ])
      }
    );
  }
/**
 * Broadcast the new todo to the service
 */
  public saveTodo(): void {
    const _todo: TodoInterface = this.todoForm.value;
    _todo.isChecked = false;
    // check if it is an update or a new entry
    if (this.todoEdit.hasOwnProperty('id')) {
      // it is an update
      _todo.id = this.todoEdit.id;
      this.todoService.editTodo(_todo);

    } else {
      this.todoService.addTodo(_todo);
    }
   console.log('todoEdit : ' + JSON.stringify(this.todoEdit));
  }


  private _loadForm(): void {
    this.ngOnInit();
  }



}
