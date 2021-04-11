<template>
    <div class="profile">
        <div class="profile-info">
            <h2>Bonjour,</h2>  
        <h3 v-if="nom">{{user.nom}}</h3>
        <h3 v-if="prenom">{{user.prenom}}</h3>
        </div>
        <div class="delete-profile" @click="deleteUser()">Supprimer le compte</div>
        <router-link to="/post" class="active">Vos publications</router-link>
    </div>
</template>

<script>
import router from "../router" 
import axios from 'axios';
export default {
  name: 'UserProfile',
data(){
  return {
    data:JSON.parse(localStorage.getItem('user')),
        nom:"",
        prenom:""
  }
},
mounted(){
    //Appel de l'api pour l'affichage de l'utilisateur
     axios.get(`http://localhost:3000/api/user/profile`)
        .then(response => {
          console.log(response.data)
          this.user = response.data
        })
        .catch(error => console.log(error)) 
},
  methods: {
    deleteUser: function(id){
      axios.delete(`http://localhost:3000/api/user/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer` + localStorage.getItem('token')
            }
          }
      )
      .then(localStorage.removeItem('user'))
      .then(router.push("/login"));
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