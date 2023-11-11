<template>
    <div class="form-group">
      <label class="form-label">{{ label }}</label>
      <div class="input">
        <input
          class="form-input"
          :type="inputType"
          :value="value"
          @input="(event: Event) => onChange && onChange(event as InputEvent)"
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
  /* Your component-specific styles */
  </style>
  