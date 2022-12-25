import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  template: `
    <button
      [disabled]="auth.$isAuthenticated | async"
      (click)="auth.login('demo')"
    >
      Login
    </button>

    <button *ngIf="auth.$isAuthenticated | async" (click)="auth.logout()">
      Logout
    </button>
  `,
})
export class LoginComponent {
  constructor(public auth: AuthService) {}
}
