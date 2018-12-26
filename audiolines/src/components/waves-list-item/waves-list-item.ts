import { Component } from "@angular/core";

/**
 * Generated class for the WavesListItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "waves-list-item",
  templateUrl: "waves-list-item.html"
})
export class WavesListItemComponent {
  menuIsOpen: boolean = false;

  onClick() {
    this.menuIsOpen = !this.menuIsOpen;
  }
}
