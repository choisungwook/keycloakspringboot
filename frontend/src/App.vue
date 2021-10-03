<template>
  <v-app id="inspire">
    <v-app-bar app color="deep-purple accent-4" dark>
      <v-toolbar-title>Vuejs + Springboot + Keycloak Example</v-toolbar-title>

      <v-spacer />

      <v-btn>
        <span>회원가입</span>
      </v-btn>
      <v-btn>
        <span>로그인</span>
      </v-btn>
    </v-app-bar>

    <v-main class="grey lighten-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>
