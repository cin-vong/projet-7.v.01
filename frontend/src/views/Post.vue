<template>
  <div class="post">
    <AccueilLogin v-if="!connected"/>

    <Header v-if="connected"/>
    <OnePost v-if="connected"/>

    <Comments v-if="connected"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AccueilLogin from '@/components/AccueilLogin.vue';
import Header from '@/components/Header.vue';
import OnePost from '@/components/OnePost.vue';
import Comments from '@/components/Comments.vue';


export default {
  name: 'Post',

  components: {
    Header,
    AccueilLogin,
    OnePost,
    Comments
  },

  data() {
    return{
      connected: true,
      authorized: true
    };
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
  },

  created(){
    this.checkConnected()
  }
}
</script>
