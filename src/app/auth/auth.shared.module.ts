import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import {
  OAuthModule,
  OAuthNoopResourceServerErrorHandler,
  OAuthResourceServerErrorHandler,
} from "angular-oauth2-oidc";
import { TokenInterceptor } from "./services/token.interceptor";

@NgModule({
  imports: [CommonModule, HttpClientModule, OAuthModule.forRoot()],
  exports: [HttpClientModule, OAuthModule],
  providers: [
    {
      provide: OAuthResourceServerErrorHandler,
      useClass: OAuthNoopResourceServerErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AuthSharedModule {}
