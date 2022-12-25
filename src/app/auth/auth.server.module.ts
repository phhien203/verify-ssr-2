import { NgModule } from "@angular/core";
import { ServerCookiesModule } from "@ngx-utils/cookies/server";
import { OAuthStorage } from "angular-oauth2-oidc";
import { AuthSharedModule } from "./auth.shared.module";
import { ServerTokenStoreService } from "./services/server-token-store.service";

@NgModule({
  declarations: [],
  imports: [AuthSharedModule, ServerCookiesModule.forRoot()],
  providers: [
    {
      provide: OAuthStorage,
      useClass: ServerTokenStoreService,
    },
  ],
})
export class AuthServerModule {}
