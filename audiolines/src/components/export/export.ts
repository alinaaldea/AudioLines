import { Component } from "@angular/core";

/**
 * Generated class for the ExportComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "export",
  templateUrl: "export.html"
})
export class ExportComponent {
  state: string = "idle";

  onClick() {
    if (this.state == "idle") this.state = "active";
    else if (this.state == "active") this.state = "idle";
  }
}
