import { Component } from '@angular/core';
import { TodoInterface } from './shared/interfaces/todo-interface';
// @annotation est appele un decorateur
// decorateur est un design pattern
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// export permet de mettre la classe accessible en public
export class AppComponent {
  public title: String = 'Todo Liste';
  public btnTitle: String = 'EN';


  /**
   * @var todos TodoInterface[]
   * Tableau des todos
   */
  public todos :TodoInterface[];
/**
 * @var aTodo : String
 * 
 */
  public aTodo : String;
  public checkedStatus : boolean = false;

  /**
   * Constructeur de la classe AppComponent
   * Invoqued on creation of an object of type AppComponent
   */
  public constructor(){
    this.todos = [];
    this.aTodo='';
  }
/**
 * ajoute un todo dans le tableau
 * @return void
 */
  /*public addTodo():void{
    this.todos.push({title: this.aTodo, isChecked: false});
    this.aTodo='';
  }*/
/**
 * supprime un todo du tableau
 * @return void
 * @param index : index of the ligne of the table
 */
  public delete(index: number):void{
    console.log('Suppression de la ligne : '+index);
    this.todos.splice(index,1);
    if(this.todos.length === 0){
      this.checkedStatus= false;
    }
    
  }
/**
 * 
 * @param index 
 * toggle state of checkbox
 */
  public toggle(index: number): void{
    this.todos[index].isChecked=! this.todos[index].isChecked;
    console.log('toggled to '+ this.todos[index].isChecked);
    this.checkedStatus = this._allChecked();
    console.log('checkedstatus est : '+this.checkedStatus);
  }
/**
 * delete all checked todos
 */
  public deleteAll(): void{
    const _todos: TodoInterface[] = [];

    for(const todo of this.todos){
      if(!todo.isChecked){
        _todos.push(todo);
      }
    }
    this.todos = _todos;
    if(this.todos.length === 0){
      this.checkedStatus= false;
    }
    
   
  }

  /**
   * Check if one of the checkbox is checked
   */
  public notChecked(): boolean{
    let status: boolean = true;
    for(const todo of this.todos){
      if(todo.isChecked){
          status=false;
      }
    }
    if(this.todos.length === 0){
      this.checkedStatus= false;
    }
    return status;
  }

  /**
   * check if the input text to add todo has at least 5 characters
   */
  public hasMoreChara(): boolean{
    let status: boolean = true;
    if(this.aTodo.length >= 5){
      status = false;
    }
    return status;
  }

  public toggleAll():void{

      this.checkedStatus = !this.checkedStatus;
      this._check();
      console.log('valeur de checkedStatus '+ this.checkedStatus);
    
  }

  private _check():void{
    for(let index=0; index< this.todos.length;index++){
      this.todos[index].isChecked = this.checkedStatus;
    }
  }

  private _allChecked(): boolean{
    let allChecked: boolean = true;
    for(const todo of this.todos){
      if(!todo.isChecked){
          allChecked=false;
      }
    }


    return allChecked;
  }

  /**
   * 
   * @param todo informe si le todo est checked ou pas
   */
  public isChecked(todo: TodoInterface): boolean{
    return todo.isChecked;
  }

  public changeTitle(): void {
    if(this.btnTitle === 'EN'){
      this.title = 'Welcome to the Angular Todo List';
      this.btnTitle = 'FR'
    }
    else{
      this.title = 'Bonjour Angular Todo Liste';
      this.btnTitle = 'EN'
    }
  }
  
}
