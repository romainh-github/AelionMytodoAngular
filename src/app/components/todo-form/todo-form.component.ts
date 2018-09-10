import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateValidators } from './../../shared/validators/date-validators';
import { TodoService } from './../../shared/services/todo.service';
import { TodoInterface } from '../../shared/interfaces/todo-interface';

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
  constructor(private formBuilder: FormBuilder, private todoService: TodoService) {  

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
          '',
          // validation rule
          [Validators.required, Validators.minLength(5)]
        ],
        start: [
          '',
          [Validators.required]
        ],
        end: [
          '',
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
    console.log('about to send : ' + JSON.stringify(_todo));
    this.todoService.sendTodo(_todo);
  }


}
