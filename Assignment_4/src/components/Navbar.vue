<template>
    <nav>
      <div>
        <h2>Kitty Crush</h2>
      </div>
      <div class="menu">
        <AuthNav v-if="model.token" @on-logout="logOut" />
        <NotAuthNav v-else />
      </div>
    </nav>
  </template>
  
  <script lang="ts">
  import { model } from '../models/store'
  import * as api from '../api/gameapi'
  import AuthNav from "./AuthNav.vue";
  import NotAuthNav from "./NotAuthNav.vue";
  
  export default {
    data() {
      return {
        model,
      };
    },
    methods: {
      async logOut() {
        api.logoutUser(model.token)
        model.logout()
      },
    },
    components: {
      AuthNav,
      NotAuthNav,
    },
  };
  </script>
  
<style scoped>
nav {
  text-decoration: none;
  padding: 2rem;
  font-weight: bold;
  background-color: #739072;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
</style>
  