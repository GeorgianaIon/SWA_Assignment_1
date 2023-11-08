<template>
    <div>
        <h1>Login</h1>
        <form>
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username">
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password">
            </div>
            <button type="submit" @click.prevent="login">Login</button>
        </form>
    </div>
</template>

<script lang="ts" scoped>
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'Login',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            console.log(`Logging in with username: ${this.username} and password: ${this.password}`);
        }
    }
})
</script>


