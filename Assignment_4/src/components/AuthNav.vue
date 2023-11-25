<template>
      <NavButton to="/menu" label="Menu" />
      <NavButton to="/highscore" label="High Scores" />
      <NavButton to="/profile" label="My Profile" />
      <router-link to="/" @click="onLogout">
        <button class="button">Logout</button>
      </router-link>
  </template>
  
  <script lang="ts">
  import NavButton from "./NavButton.vue";

  export default {
    components: {
      NavButton,
    },
    methods: {
      onLogout() {
        this.$emit("onLogout");
      },
    },
    emits: ["onLogout"],
  };
  </script>
  
  <style scoped>
  /* Your component-specific styles */
  </style>
  