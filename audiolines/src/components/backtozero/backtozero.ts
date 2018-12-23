import { Component } from '@angular/core';

/**
 * Generated class for the BacktozeroComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'backtozero',
  templateUrl: 'backtozero.html'
})
export class BacktozeroComponent {

  text: string;

  constructor() {
    console.log('Hello BacktozeroComponent Component');
    this.text = 'Hello World';
  }

}
