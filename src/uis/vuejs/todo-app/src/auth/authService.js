import { UserManager, WebStorageStateStore } from "oidc-client";

import env from "../../enviroments/enviroment";

class AuthService {
  constructor() {
    var config = {
      authority: env.OpenIdConnect.Authority,
      client_id: env.OpenIdConnect.ClientId,
      redirect_uri: `${env.CurrentUrl}oidc-login-redirect`,
      scope: "openid profile email fa_tms_api",
      response_type: "id_token token",
      post_logout_redirect_uri: `${env.CurrentUrl}?postLogout=true`,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
    };
    this._userManager = new UserManager(config);
  }

  loadUser = () => {
    var promise = this._userManager.getUser();
    promise.then((user) => {
      if (user && !user.expired) {
        this._user = user;
      }
    });
    return promise;
  };

  login = (returnUrl) => {
    console.log("Return Url:", returnUrl);
    localStorage.setItem("returnUrl", returnUrl);
    return this._userManager.signinRedirect();
  };

  logout = () => {
    return this._userManager.signoutRedirect();
  };

  isLoggedIn = () => {
    return this._user && this._user.access_token && !this._user.expired;
  };

  getAccessToken = () => {
    return this._user ? this._user.access_token : "";
  };

  signoutRedirectCallback = () => {
    return this._userManager.signoutRedirectCallback();
  };

  getCurrentUser = () => {
    return this._user.profile;
  };

  isAuthenticated = () => {
    return this.isLoggedIn();
  };
}

const instance = new AuthService();

export default instance;
