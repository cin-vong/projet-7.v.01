<template>
  <div class="login">
       <h1> Bienvenue !</h1>
      <img alt="Vue logo" src="../assets/logo.png">
    <LoginForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'Login',
  components: {
    LoginForm
  }
}
</script>