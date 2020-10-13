<template>
  <div>Loading ...</div>
</template>

<script>
import { UserManager, WebStorageStateStore } from "oidc-client";
var config = {
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};
var mgr = new UserManager(config);
export default {
  created() {
    mgr.signinRedirectCallback().then(
      () => {
        window.history.replaceState(
          {},
          window.document.title,
          window.location.origin
        );
        const returnUrl = localStorage.getItem("returnUrl");
        if (returnUrl) {
          localStorage.removeItem("returnUrl");
          window.location = returnUrl;
        } else {
          window.location = "/";
        }
      },
      (error) => {
        console.error(error);
      }
    );
  },
};
</script>
