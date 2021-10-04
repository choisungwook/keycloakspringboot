import Keycloak from "keycloak-js";
import store from "@/store";

const initOptions = {
  url: process.env.VUE_APP_KEYCLOAK_ENDPOINT + "/auth",
  realm: process.env.VUE_APP_KEYCLOAK_REALM,
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT,
};

const keycloak = Keycloak(initOptions);

export default (next, roles) => {
  keycloak
    .init({ onLoad: "login-required" })
    .then((auth) => {
      if (!auth) {
        window.location.reload();
      }

      console.log("[keycloak init] 인증성공");
      store.dispatch("keycloak/login", keycloak);
      // 권한 검사
      for (const role of roles) {
        if (!keycloak.hasResourceRole(role)) {
          console.log("[keycloak init] role검사 오류 => " + role);
          next({ name: "Unauthorized" });
        }
      }

      // 다음 필터 진행
      next();
    })
    .catch((error) => {
      console.log("[keycloak init]" + error);
    });
};
