import { Component } from '@angular/core';

/**
 * Generated class for the SetBpmViewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'set-bpm-view',
  templateUrl: 'set-bpm-view.html'
})
export class SetBpmViewComponent {

  text: string;

  constructor() {
    console.log('Hello SetBpmViewComponent Component');
    this.text = 'Hello World';
  }

}
