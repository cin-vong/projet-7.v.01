<template>
  <div class="signup">
    <AccueilSignup/>
  </div>
</template>

<script>
// @ is an alias to /src
import AccueilSignup from '@/components/AccueilSignup.vue';

export default {
  name: 'Signup',

  components: {
    AccueilSignup
  },
}
</script>