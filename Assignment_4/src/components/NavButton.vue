<template>
    <router-link :to="to || '/'">
      <button class="button">{{ label }}</button>
    </router-link>
</template>
  
  <script lang="ts">
  export default {
    props: {
      to: String,
      label: String,
    },
  };
  </script>
  
  <style scoped>
  /* Your component-specific styles */
  </style>
  