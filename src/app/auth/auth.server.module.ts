import { NgModule } from "@angular/core";
import { ServerCookiesModule } from "@ngx-utils/cookies/server";
import { OAuthStorage } from "angular-oauth2-oidc";
import { AuthSharedModule } from "./auth.shared.module";
import { ServerTokenStoreSessionService } from "./services/server-token-store.session.service";

@NgModule({
  declarations: [],
  imports: [AuthSharedModule, ServerCookiesModule.forRoot()],
  providers: [
    // {
    //   provide: OAuthStorage,
    //   useClass: ServerTokenStoreService,
    // },
    {
      provide: OAuthStorage,
      useClass: ServerTokenStoreSessionService,
    },
  ],
})
export class AuthServerModule {}
