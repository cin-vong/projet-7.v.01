<template>
  <div class="home">
    <AccueilLogin v-if="!connected"/>
    <EnTete v-if="connected"/>
    <NewPost v-if="connected"/>
    <Posts v-if="connected"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AccueilLogin from '@/components/AccueilLogin.vue';
import Posts from '@/components/Posts.vue';
import EnTete from '@/components/EnTete.vue';
import NewPost from '@/components/NewPost.vue';

export default {
  name: 'Home',

  components: {
    AccueilLogin,
    Posts,
    EnTete,
    NewPost
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
    }
  }
}
</script>
