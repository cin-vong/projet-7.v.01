<template>
    <div class="Profile">
        <AccueilLogin v-if="!connected"/>
        <Header v-if="connected"/>
        <UserProfile v-if="connected"/>
        <UserPosts v-if="connected"/>
        
    </div>
</template>

<script>

import AccueilLogin from '@/components/AccueilLogin.vue';
import Header from '@/components/Header.vue';
import UserProfile from '@/components/UserProfile.vue';
import UserPosts from '@/components/UserPosts.vue';

export default {
    name: 'Profile',

    components: {
        AccueilLogin,
        Header,
        UserProfile,
        UserPosts
  },

  data() {
    return{
      connected: true
    };
  },

   created(){
    this.checkConnected()
  },

  methods: {
    checkConnected(){
      if(localStorage.user !== undefined){
        this.connected = true;
        console.log('Utilisateur connecté !');
      }
      else if(localStorage.user == undefined){
        this.connected = false;
        console.log('Utilisateur non connecté !');
      }
    },
  }
}
</script>

<style scoped>

</style>