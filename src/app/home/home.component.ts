import { Component } from "@angular/core";
import { AuthService } from "../auth/services/auth.service";

@Component({
  selector: "app-home",
  template: `
    <h1>{{ title }}</h1>
    <h3>{{ subtitle }}</h3>
    <p *ngIf="auth.$isAuthenticated | async">Authenticated</p>
    <p *ngIf="!(auth.$isAuthenticated | async)">Unauthenticated</p>
  `,
})
export class HomeComponent {
  title = "Angular SSR with OAuth2";
  subtitle = "Featuring Universal and angular-oauth2-oidc";

  constructor(public auth: AuthService) {}
}
