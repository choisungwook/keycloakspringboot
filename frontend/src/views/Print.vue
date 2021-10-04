<template>
  <v-container class="pt-10">
    {{ auth }}
    {{ token }}
    {{ idToken }}
  </v-container>
</template>

<script>
import Vue from "vue";
export default {
  data: () => ({
    auth: !Vue.$keycloak.authenticated,
    token: !Vue.$keycloak.token,
    idToken: !Vue.$keycloak.idToken,
  }),
};
</script>
