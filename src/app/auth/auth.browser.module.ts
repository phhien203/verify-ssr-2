import { NgModule } from "@angular/core";
import { AuthSharedModule } from "./auth.shared.module";
import { BrowserTokenStoreSessionService } from "./services/browser-token-store.session.service";

@NgModule({
  declarations: [],
  imports: [AuthSharedModule],
  providers: [
    // {
    //   provide: OAuthStorage,
    //   useClass: BrowserTokenStoreService,
    // },
    // {
    //   provide: OAuthStorage,
    //   useClass: BrowserTokenStoreSessionService,
    // },
  ],
})
export class AuthBrowserModule {}
