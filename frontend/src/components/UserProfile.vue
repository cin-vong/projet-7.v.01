<template>
    <div class="profile">
        <div class="profile-info">
            <h2>Bonjour,</h2>
        
        </div>

        <div class="delete-profile" @click="deleteUser()">Supprimer le compte</div>

        <h3>Vos publications :</h3>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserProfile',


  methods: {

    deleteUser(){
  
      axios.delete(`http://localhost:3000/api/user/profile`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer 'RANDOM_TOKEN_SECRET'`
            }
          }
      )
      .then(localStorage.removeItem('user'))
      .then(location.href = "/login");
    }

  }
}
</script>

<style scoped>

    .profile-info{
        margin: 50px auto;
        max-width: 800px;
        text-align: left;
    }

    .profile-info h2 {
        margin-bottom: 20px;
        font-size: 3rem;
    }

    .profile-info h3 {
      text-align: left;
    }

    .profile-info span {
        font-size: 3rem;
    }

    .delete-profile{
      color:  rgba(255, 0, 0, 0.301);
      margin-bottom: 30px;
      font-size: 24px;
      cursor: pointer;
    }
</style>