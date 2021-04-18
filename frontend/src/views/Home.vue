<template>
  <div class="home">
    <AccueilLogin v-if="!connected"/>
    <Header v-if="connected"/>
    <NewPost v-if="connected"/>
    <Posts v-if="connected"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AccueilLogin from '@/components/AccueilLogin.vue';
import Posts from '@/components/Posts.vue';
import Header from '@/components/Header.vue';
import NewPost from '@/components/NewPost.vue';

export default {
  name: 'Home',

  components: {
    AccueilLogin,
    Posts,
    Header,
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
