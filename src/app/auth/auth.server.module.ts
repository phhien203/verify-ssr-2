import { NgModule } from "@angular/core";
import { OAuthStorage } from "angular-oauth2-oidc";
import { AuthSharedModule } from "./auth.shared.module";
import { ServerTokenStoreSessionService } from "./services/server-token-store.session.service";

@NgModule({
  declarations: [],
  imports: [AuthSharedModule],
  providers: [
    // {
    //   provide: OAuthStorage,
    //   useClass: ServerTokenStoreService,
    // },
    // {
    //   provide: OAuthStorage,
    //   useClass: ServerTokenStoreSessionService,
    // },
  ],
})
export class AuthServerModule {}
