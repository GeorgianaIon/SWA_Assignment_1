<template>
      <NavButton to="/register" label="Register" />
      <NavButton to="/" label="Login" />
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
  