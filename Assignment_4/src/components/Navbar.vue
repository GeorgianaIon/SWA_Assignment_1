<template>
    <nav>
      <div>
        <h2>Kitty Crush</h2>
      </div>
      <div class="menu">
        <AuthNav v-if="token" @logout="logOut" />
        <NotAuthNav v-else />
      </div>
    </nav>
  </template>
  
  <script lang="ts">
  import AuthNav from "./AuthNav.vue";
  import NotAuthNav from "./NotAuthNav.vue";
  
  export default {
    data() {
      return {
        token: 1,// user token
      };
    },
    methods: {
      async logOut() {
        // logout logic
      },
    },
    components: {
      AuthNav,
      NotAuthNav,
    },
  };
  </script>
  
  <style scoped>
  /* Your component-specific styles */
  </style>
  