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
   * Constructeur de la classe AppComponent
   * Invoqued on creation of an object of type AppComponent
   */
  public constructor() {
  }


  public changeTitle(): void {
    if (this.btnTitle === 'EN') {
      this.title = 'Welcome to the Angular Todo List';
      this.btnTitle = 'FR';
    } else {
      this.title = 'Bonjour Angular Todo Liste';
      this.btnTitle = 'EN';
    }
  }
}
