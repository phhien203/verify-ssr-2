import { NgModule } from "@angular/core";
import { BrowserCookiesModule } from "@ngx-utils/cookies/browser";
import { OAuthStorage } from "angular-oauth2-oidc";
import { AuthSharedModule } from "./auth.shared.module";
import { BrowserTokenStoreService } from "./services/browser-token-store.service";

@NgModule({
  declarations: [],
  imports: [AuthSharedModule, BrowserCookiesModule.forRoot()],
  providers: [
    {
      provide: OAuthStorage,
      useClass: BrowserTokenStoreService,
    },
  ],
})
export class AuthBrowserModule {}
