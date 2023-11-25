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

  </style>
  