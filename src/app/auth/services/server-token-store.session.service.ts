import { Inject, Injectable } from "@angular/core";
import { SESSION_STORAGE } from "@ng-web-apis/common";
import { OAuthStorage } from "angular-oauth2-oidc";

@Injectable()
export class ServerTokenStoreSessionService implements OAuthStorage {
  constructor(@Inject(SESSION_STORAGE) private sessionStorage: Storage) {
    console.log("ServerTokenStoreSessionService");
  }

  getItem(key: string): string | null {
    return this.sessionStorage.getItem(key);
  }

  removeItem(key: string): void {
    this.sessionStorage.removeItem(key);
  }

  setItem(key: string, data: string): void {
    this.sessionStorage.setItem(key, data);
  }
}
