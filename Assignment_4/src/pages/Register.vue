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
      if(credentials.password && credentials.username) {
        const user = await api.createUser(credentials.username, credentials.password)
        if(user) {
          this.$router.push('/');
        }
      }
    },
  },
});
</script>

  