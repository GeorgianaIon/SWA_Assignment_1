<template >
  <div class="container">
    <h1>Login</h1>
    <Form @on-submit="handleLogin" />
    <LoginLink />
  </div>
</template>
  
<script lang="ts">
import Form from "../components/Form.vue"; 
import LoginLink from "../components/LoginLink.vue";
import * as api from '../api/gameapi'
import { model } from '../models/store'

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
      api.loginUser(credentials.username, credentials.password).then((result) => {
                if (result) {
                    model.login(result.userId, result.token);
                    this.$router.push('/menu');
                }
            });
    },
  },
};
</script>

<style scoped>

</style>
  