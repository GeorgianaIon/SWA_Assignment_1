<template>
    <div class="container">
      <h1>Register</h1>
      <Form @on-submit="handleSubmit" :isRegister="true" />
    </div>
  </template>
  
  <script lang="ts">
  interface Credentials {
  username: string;
  password: string;
}

  import { defineComponent } from 'vue';
  import * as api from '../api/gameapi'
  import Form from '../components/Form.vue'; 
  
  export default defineComponent({
    components: {
      Form,
    },
    methods: {
      async handleSubmit(credentials: Credentials) {
        api.createUser(credentials.username, credentials.password)
        this.$router.push('/');
      },
    },
  });
  </script>
  
  <style scoped>

  </style>
  