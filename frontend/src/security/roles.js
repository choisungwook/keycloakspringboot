export default (role) => {
  const keycloakObject = this.$store.getters["keycloak/getAuth"];
  if (keycloakObject.authenticated) {
    return keycloakObject.hasResourceRole(role);
  } else {
    return false;
  }
};
