import { AuthConfig } from "angular-oauth2-oidc";

export const authCodeFlowConfig: AuthConfig = {
  requireHttps: false,
  disableAtHashCheck: true,
  // Url of the Identity Provider
  // issuer: 'https://demo.identityserver.io',
  issuer: "http://localhost:8080/realms/zillearn",

  // URL of the SPA to redirect the user to after login
  //redirectUri: window.location.origin + '/index.html',
  //redirectUri: window.location.origin,
  redirectUri: "http://localhost:4000",
  // redirectUri: 'http://localhost:4200',

  //make sure you change this for local testing
  // redirectUri: 'https://angular-oauth.herokuapp.com',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: "zillearn",

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',

  responseType: "code",

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  // scope: 'openid profile email offline_access api',
  scope: "openid profile email offline_access",

  /**
   * Defines whether additional debug information should
   * be shown at the console. Note that in certain browsers
   * the verbosity of the console needs to be explicitly set
   * to include Debug level messages.
   */
  showDebugInformation: true,
};
