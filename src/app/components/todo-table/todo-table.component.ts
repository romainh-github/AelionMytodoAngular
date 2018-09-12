import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoInterface } from './../../shared/interfaces/todo-interface';
import { TodoService } from './../../shared/services/todo.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

// import material library
import {MatTableDataSource, MatSort, MatSelect, MatOption, MatFormField} from '@angular/material';


@Component({
  selector: 'todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;


  /**
   * Subscribing to a todo coming from TodoService
   */
  private todoSubscription: Subscription;

  public todos: TodoInterface[];
  public checkedStatus: boolean = false;
  /**
   * Source de data pour material table
   */
  public dataSource = new MatTableDataSource<TodoInterface>();
/**
 * columns variable that is a new variable
 */
  public columns = new FormControl();
/**
 * Reference the name of the column in the html mat-table
 */
  public displayedColumns = ['title', 'start', 'end', 'edit', 'delete'];
  /**
   * List of the available objects in the mat-select
   */
  public displayedFilter: any[] = [{value: 'start', label: 'Début'}, {value: 'end', label: 'Fin'}];
  /**
   * assign displayedFilter to selectedItems which is used in the NgModel in the html
   */
  public selectedItems = this.displayedFilter;

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
      this.dataSource.data = this.todos;
    });
   }

  ngOnInit() {
    // Get todos from db by subscribing to the observable
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      console.log('Il y a ' + this.todos.length + ' todos.');
      this.todoService.sendTodoList(this.todos);
      // define what the datasource will be
      this.dataSource.data = this.todos;
      this.dataSource.sort = this.sort;
    });

  }

  /**
   * Method to filter table by end date and start date of todo
   * @param event Selected option in the mat-select to filter the todo table
   */
  public filter(event) {
    console.log(JSON.stringify(event.value));
    const filt = JSON.stringify(event.value);
    console.log(filt);
    if (filt === '[]') {
      this.displayedColumns = ['title', 'edit', 'delete'];
    } else if (filt.includes('end') === true && filt.includes('start') === true) {
      this.displayedColumns = ['title', 'start', 'end' , 'edit', 'delete'];
    } else if (filt.includes('end') === true && filt.includes('start') === false)  {
      this.displayedColumns = ['title', 'end' , 'edit', 'delete'];
    } else if (filt.includes('end') === false && filt.includes('start') === true)  {
      this.displayedColumns = ['title', 'start' , 'edit', 'delete'];
    }
  }

  /*Methode par Jean Luc : 
   * Détecte un changement de sélection de colonnes
   * @param event Evénément propagé
   
  public changeView(event: any): void {
    console.log(this.selectedOptions + ' de taille : ' + this.selectedOptions.length);

    /
     * Définit le tableau final pour l'affichage des colonnes
    
    const toDisplay: String[] = [];

    toDisplay.push('title'); // Toujours affichée, donc... on le push

    if (this.selectedOptions.indexOf('begin') !== -1 ) {
      // begin est coché, on le push
      toDisplay.push('begin');
    }

    if (this.selectedOptions.indexOf('end') !== -1 ) {
      // end est coché, on le push
      toDisplay.push('end');
    }
    // On doit toujours avoir les boutons aussi
    toDisplay.push('update');
    toDisplay.push('delete');

    /**
     * On remplace le tableau des colonnes à afficher dans le tableau
    
    this.displayedColumns = toDisplay;
}*/

  /**
   * method to return the label of the filter mat-select in the th of the table
   * @param index index of the th label in the table
   */
  public getLabel(index: number): String {
    return this.displayedFilter[index].label;
  }


  public delete(todo: TodoInterface): void {
    const index = this.todos.indexOf(todo);
    const _todo = this.todos[index];
    console.log('Suppression de la ligne : ' + index);
    this.todos.splice(index, 1);
    this.todoService.deleteTodo(_todo);
    this.todoService.sendTodoList(this.todos);
    this.dataSource.data = this.todos;
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
