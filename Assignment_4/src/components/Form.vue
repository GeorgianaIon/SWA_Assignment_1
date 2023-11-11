<template>
    <form class="content-wrapper" @submit.prevent="handleSubmit"> <!-- emit better? -->
      <FormGroup label="Username:" :value="username" @input="handleUsernameChange" />
      <FormGroup label="Password:" :value="password" @input="handlePasswordChange" isPassword />
      <FormGroup
        v-if="isRegister"
        label="Confirm Password:"
        :value="confirmPassword"
        @input="handleConfirmPasswordChange"
        isPassword
      />
      <button class="form-button" type="submit">
        {{ isRegister ? 'Register' : 'Login' }}
      </button>
    </form>
  </template>
  
  <script lang="ts">
  import FormGroup from './FormGroup.vue';
  
  export default {
    components: {
      FormGroup,
    },
    props: {
      isRegister: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: '',
      };
    },
    methods: {
        handleUsernameChange(event: Event) {
                this.username = (event.target as HTMLInputElement).value;
            },
        handlePasswordChange(event: Event) {
            this.password = (event.target as HTMLInputElement).value;
        },
        handleConfirmPasswordChange(event: Event) {
            this.confirmPassword = (event.target as HTMLInputElement).value;
        },
        handleSubmit() {
        if (this.isRegister && this.password !== this.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        },
    },

  };
  </script>
  
  <style scoped>

  </style>
  