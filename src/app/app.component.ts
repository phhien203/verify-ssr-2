import { Component, Inject } from "@angular/core";
import { LOCAL_STORAGE, WINDOW } from "@ng-web-apis/common";
import { AuthConfig, OAuthService } from "angular-oauth2-oidc";
import { JwksValidationHandler } from "angular-oauth2-oidc-jwks";
import { authCodeFlowConfig } from "./auth/auth.config";

@Component({
  selector: "app-root",
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>Welcome to {{ title }}!</h1>
      <span style="display: block">{{ title }} app is running!</span>
      <img
        width="300"
        alt="Angular Logo"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="
      />
    </div>
    <h2>Here are some links to help you start:</h2>
    <ul>
      <li>
        <h2>
          <a target="_blank" rel="noopener" href="https://angular.io/tutorial"
            >Tour of Heroes</a
          >
        </h2>
      </li>
      <li>
        <h2>
          <a target="_blank" rel="noopener" href="https://angular.io/cli"
            >CLI Documentation</a
          >
        </h2>
      </li>
      <li>
        <h2>
          <a target="_blank" rel="noopener" href="https://blog.angular.io/"
            >Angular blog</a
          >
        </h2>
      </li>
    </ul>

    <a [routerLink]="['/']">Home</a> | <a [routerLink]="['/login']">Login</a> |
    <a [routerLink]="['/profile']">Profile</a> |

    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = "verify-ssr-2";

  private configMap: any = {
    demo: authCodeFlowConfig,
  };

  constructor(
    private oauthService: OAuthService,
    @Inject(WINDOW) private readonly windowRef: Window,
    @Inject(LOCAL_STORAGE) private readonly localStorageRef: Storage
  ) {
    console.log(this.windowRef.location.href);
    // this.localStorageRef.setItem("verify-ssr-2", "hehehe2");
    this.configureCodeFlow(this.configMap["demo"]);
  }

  private getUserInfo() {
    this.oauthService.loadUserProfile().then((userInfo: object) => {
      // console.log(userInfo);
      // this._user.next(userInfo as UserInfo);
    });
  }

  private configureCodeFlow(authConfig: AuthConfig): void {
    this.oauthService.configure(authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(
      (): void => {
        if (this.oauthService.hasValidAccessToken()) {
          this.getUserInfo();
        } else {
          this.oauthService.initCodeFlow();
        }
      },
      () => {}
    );
  }
}
