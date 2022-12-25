import { Injectable } from "@angular/core";
import { CookiesOptionsService, CookiesService } from "@ngx-utils/cookies";
import { OAuthStorage } from "angular-oauth2-oidc";

@Injectable()
export class ServerTokenStoreService
  extends CookiesService
  implements OAuthStorage
{
  constructor(
    private cookiesService: CookiesService,
    cookiesOptions: CookiesOptionsService
  ) {
    super(cookiesOptions);
    console.log("ServerTokenStoreService");
  }

  getItem(key: string): string | null {
    return this.cookiesService.get(key);
  }

  removeItem(key: string): void {
    this.cookiesService.remove(key);
  }

  setItem(key: string, data: string): void {
    this.cookiesService.put(key, data);
  }
}
