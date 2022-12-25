import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private oauthService: OAuthService, private router: Router) {
    console.log("AuthGuard");
  }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | boolean
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.oauthService.hasValidAccessToken()) {
      return true;
    }

    return this.router
      .navigate(["login"])
      .then(() => {
        console.log("Route exists, redirection is done");
        return false;
      })
      .catch(() => {
        console.log("Route not found");
        this.oauthService.initLoginFlow();
        return false;
      });
  }
}
