<template >
    <div class="container">
      <h1>Login</h1>
      <Form @onSubmit="handleLogin" />
      <LoginLink />
    </div>
  </template>
  
  <script lang="ts">
  import Form from "../components/Form.vue"; 
  import LoginLink from "../components/LoginLink.vue";
  
  interface Credentials {
  username: string;
  password: string;
}

  export default {
    components: {
      Form,
      LoginLink,
    },
    methods: {
      handleLogin(credentials: Credentials) {
        console.log(credentials)
      },
    },
  };
  </script>
  
  <style scoped>

  </style>
  