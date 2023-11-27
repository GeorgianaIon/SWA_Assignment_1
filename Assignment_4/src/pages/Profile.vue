<script setup lang="ts">
  import { ref, onMounted } from "vue"
  import { model } from "../models/store"
  import { getUser, updateUser } from "../api/gameapi"
  import FormGroup from "../components/FormGroup.vue";
  import { UserModel } from "../models/apiModels";

  const password = ref("")

  onMounted(async () => {
    const userData = await getUser(model.token, model.user.id)
    model.user = userData
    password.value = userData.password
  })

  const changePassword = async () => {
    if (password.value === model.user.password) {
      return
    }

    const confirmed = confirm("Are you sure you want to change your password?");
    if (!confirmed) {
      return;
    }

    const updatedUser: UserModel = {
      id: model.user.id,
      username: model.user.username,
      password: password.value,
      admin: model.user.admin,
    }

    try {
      await updateUser(model.token, updatedUser)
      model.user = updatedUser
      alert("Your password was successfully changed")
    }
    catch {
      alert("Could not update the user")
    }
  }

  const handlePasswordChange = (e: Event): void => {
    password.value = (e.target as HTMLInputElement).value
  }
</script>

<template>
  <div class="profile-wrapper">
    <h1>Welcome to your profile</h1>
    <div class="content-wrapper">
      <h3>Username: <strong class="bigger-font">{{ model.user.username }}</strong></h3>
      <h3>Is administrator: <strong class="bigger-font">{{ model.user.admin ? "Yes" : "No" }}</strong></h3>
      <div class="password-wrapper">
        <div>
          <FormGroup label="Change Password:" :value="password" @input="handlePasswordChange" isPassword />
        </div>
        <button @click="changePassword">Change password</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .content-wrapper {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 5px;
    padding: 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: 1rem 0;
    width: fit-content;
  }

  .profile-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .password-wrapper {
    display: flex;
    flex-direction: column;
    gap: .3rem;
    width: fit-content;
  }

  .bigger-font {
    font-size: 2rem;
  }
</style>