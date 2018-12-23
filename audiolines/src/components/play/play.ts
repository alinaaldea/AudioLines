import { Component } from '@angular/core';

/**
 * Generated class for the PlayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'play',
  templateUrl: 'play.html'
})
export class PlayComponent {

  text: string;

  constructor() {
    console.log('Hello PlayComponent Component');
    this.text = 'Hello World';
  }

}
