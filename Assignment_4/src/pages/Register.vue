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
  import Form from '../components/Form.vue'; 
  
  export default defineComponent({
    components: {
      Form,
    },
    methods: {
      async handleSubmit(credentials: Credentials) {
        console.log(credentials);
        this.$router.push('/');
      },
    },
  });
  </script>
  
  <style scoped>

  </style>
  