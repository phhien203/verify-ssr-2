import { Component } from "@angular/core";
import { AuthService } from "../auth/services/auth.service";

@Component({
  selector: "app-profile",
  template: ` <p>{{ auth.$user | async | json }}</p> `,
})
export class ProfileComponent {
  constructor(public auth: AuthService) {}
}
