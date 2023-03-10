import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private oauthService: OAuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.oauthService.hasValidAccessToken()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.oauthService.getAccessToken()}`,
        },
      });
    }

    return next.handle(req);
  }
}
