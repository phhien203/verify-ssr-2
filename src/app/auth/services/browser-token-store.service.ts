import { Injectable } from "@angular/core";
import { CookiesService } from "@ngx-utils/cookies";
import { OAuthStorage } from "angular-oauth2-oidc";

@Injectable()
export class BrowserTokenStoreService implements OAuthStorage {
  constructor(private cookieService: CookiesService) {
    console.log("BrowserTokenStoreService");
  }

  getItem(key: string): string | null {
    return this.cookieService.get(key);
  }
  removeItem(key: string): void {
    this.cookieService.remove(key);
  }
  setItem(key: string, data: string): void {
    this.cookieService.put(key, data);
  }
}
