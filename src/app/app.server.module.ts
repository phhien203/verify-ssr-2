import { NgModule } from "@angular/core";
import { ServerModule } from "@angular/platform-server";

import { AppModule } from "./app.module";
import { AppComponent } from "./app.component";
import { UniversalModule } from "@ng-web-apis/universal";
import { AuthServerModule } from "./auth/auth.server.module";

@NgModule({
  imports: [AppModule, ServerModule, UniversalModule, AuthServerModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
