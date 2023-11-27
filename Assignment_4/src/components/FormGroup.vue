<template>
    <div class="form-group">
      <label class="form-label">{{ label }}</label>
      <div class="input">
        <input
          class="form-input"
          :type="inputType"
          :value="value"
          @input="(event: Event) => onChange && onChange(event as InputEvent)"
          required
        />
        <button
          v-if="isPassword"
          class="eye-icon"
          @click="toggleShowPassword"
          type="button"
        >
          <i v-if="showPassword" class="material-icons">visibility_off</i>
          <i v-else class="material-icons">visibility</i>
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      label: String,
      value: String,
      isPassword: {
        type: Boolean,
        default: false,
      },
      onChange: Function,
    },
    data() {
      return {
        showPassword: false,
      };
    },
    computed: {
      inputType() {
        return this.showPassword ? "text" : this.isPassword ? "password" : "text";
      },
    },
    methods: {
      toggleShowPassword() {
        this.showPassword = !this.showPassword;
      },
    },
  };
  </script>
  
<style scoped>
  .eye-icon {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #3A4D39;
    margin-left: -40px;
  }

  .eye-icon:hover {
    background-color: transparent;
  }
  .form-input{
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 1.2rem;
  }
  
  .input {
    display: flex;
  }

  .form-group{
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .form-label{
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #3A4D39
  }
</style>
  