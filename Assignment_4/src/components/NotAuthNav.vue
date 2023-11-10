<template>
    <div>
      <NavButton to="/register" label="Register" />
      <NavButton to="/" label="Login" />
    </div>
  </template>
  
  <script lang="ts">
  import NavButton from "./NavButton.vue";
  
  export default {
    components: {
      NavButton,
    },
  };
  </script>
  
  <style scoped>

  </style>
  