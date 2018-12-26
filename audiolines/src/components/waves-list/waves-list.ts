import { Component } from '@angular/core';

/**
 * Generated class for the WavesListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'waves-list',
  templateUrl: 'waves-list.html'
})
export class WavesListComponent {

  text: string;

  constructor() {
    console.log('Hello WavesListComponent Component');
    this.text = 'Hello World';
  }

}
