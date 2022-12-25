import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import {
  Inject,
  Injectable,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from "@angular/core";
import { Router } from "@angular/router";
import { CookiesService } from "@ngx-utils/cookies";
import {
  AuthConfig,
  JwksValidationHandler,
  OAuthErrorEvent,
  OAuthInfoEvent,
  OAuthService,
  OAuthSuccessEvent,
  UserInfo,
} from "angular-oauth2-oidc";
import { BehaviorSubject } from "rxjs";
import { authCodeFlowConfig } from "../auth.config";

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnInit, OnDestroy {
  private subscriptions: any = {};

  private configMap: any = {
    demo: authCodeFlowConfig,
  };

  private readonly _user = new BehaviorSubject<UserInfo | null>(null);
  public readonly $user = this._user.asObservable();

  private readonly _isAuthenticated = new BehaviorSubject<Boolean>(false);
  public readonly $isAuthenticated = this._isAuthenticated.asObservable();

  constructor(
    private router: Router,
    private oauthService: OAuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookieService: CookiesService
  ) {
    console.log("AuthService");

    if (isPlatformBrowser(this.platformId)) {
      // Client only code.
      let storedConfig = this.cookieService.get("config");

      if (storedConfig) {
        this.configureCodeFlow(this.configMap[storedConfig]);
        //this.cookieService.remove(storedConfig);
      }
    }

    this._isAuthenticated.next(this.oauthService.hasValidAccessToken());

    this.subscriptions.oauthEvents = this.oauthService.events.subscribe(
      (event) => {
        this._isAuthenticated.next(this.oauthService.hasValidAccessToken());

        if (event instanceof OAuthErrorEvent) {
          console.error(event);
          if (["session_terminated", "session_error"].includes(event.type)) {
            this.router.navigate(["login"]);
          }
        } else if (event instanceof OAuthSuccessEvent) {
          console.warn(event);
          if (["token_received"].includes(event.type)) {
            this.getUserInfo();
          }
        } else if (event instanceof OAuthInfoEvent) {
          console.info(event);
          // if(['discovery_document_loaded'].includes(event.type) && event.info && this.oauthService.hasValidAccessToken()){
          //   this.oauthService.initCodeFlow();
          // }
        }
      }
    );
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Client only code.
    }
    if (isPlatformServer(this.platformId)) {
      // Server only code.
    }
  }

  ngOnDestroy() {
    Object.keys(this.subscriptions).forEach((key) =>
      this.subscriptions[key].unsubscribe()
    );
  }

  login(config: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // Client only code.
      this.cookieService.put("config", config);
    }

    this.configureCodeFlow(this.configMap[config]);
  }

  logout(): void {
    this.cookieService.remove("config");
    this.oauthService.logOut();
  }

  private getUserInfo() {
    this.oauthService.loadUserProfile().then((userInfo: object) => {
      // console.log(userInfo);
      this._user.next(userInfo as UserInfo);
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
