<template>
  <div class="post">
   <img alt="Vue logo" src="../assets/logo.png">
    <AccueilLogin v-if="!connected"/>
    <EnTete v-if="connected"/>
    <OnePost v-if="connected"/>
    <NewPosts v-if="connected"/>
    <Comments v-if="connected"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AccueilLogin from '@/components/AccueilLogin.vue';
import EnTete from '@/components/EnTete.vue';
import OnePost from '@/components/OnePost.vue';
import Comments from '@/components/Comments.vue';
import NewPosts from '@/components/NewPosts.vue';

export default {
  name: 'Post',

  components: {
    EnTete,
    AccueilLogin,
    OnePost,
    Comments,
    NewPosts
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