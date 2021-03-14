<template>
  <div class="login">
       <h1> Bienvenue !</h1>
      <img alt="Vue logo" src="../assets/logo.png">
    <AccueilLogin/>
  </div>
</template>

<script>
// @ is an alias to /src
import AccueilLogin from '@/components/AccueilLogin.vue';

export default {
  name: 'Login',
  components: {
    AccueilLogin
  }
}
</script>