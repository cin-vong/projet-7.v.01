<template>
    <div class="signup">
        <form @submit.prevent = signup>
            <nav><router-link to="/" class="active">Inscription</router-link> | <router-link to="/login">Connection</router-link></nav>
            <input id="nom" type="text" v-model="nom" placeholder="Nom" required>

             <input id="prenom" type="text" v-model="prenom" placeholder="Prénom" required>

            <input id="email" type="email" v-model="email" placeholder="Email" required>

            <input id="password" type="password" v-model="password" placeholder="Mot de passe" required>

            <input id="password_confirm" type="password" v-model="password_confirm" placeholder="Vérifier du mot de passe" required>

            <button id="signup-btn" type="submit">S'inscrire</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import router from "../router" 
export default {
    name: 'AccueilSignup',
    data(){
      return{
        nom:"",
        prenom:"",
        email:"",
        password:"",
        password_confirm:"" 
       }
    },
    methods: {
        signup(){
            const data = {
                nom: this.nom,
                prenom: this.prenom,
                email: this.email,
                password: this.password,
                password_confirm: this.password_confirm
            };
            

            axios.post(`http://localhost:3000/api/user/signup`, data)
                .then(
                    res => {
                        localStorage.setItem('user', JSON.stringify(res.data));
                         router.push("/profile")
                        console.log(res)
                    }
                ).catch(
                    err => {
                        console.log(err)
                    }
                )   
        }
    }
}
  
</script>

<style scoped>
    .background-color{
        color: #bebeba;
    }

    .signup{
        max-width: 500px;
        margin: 90px auto;
    }

    img{
        width: 100%;
    }

    nav{
        font-size: 1.05rem;
        margin: 20px;
    }

    .active{
        color: #0e213f;
        font-weight: bold;
    }

    form{
        display: flex;
        flex-direction: column;
    }

    form label{
        color: rgba(0, 0, 0, .5);
        margin: 10px;
    }

    .error-message{
        background-color: rgba(255, 0, 0, 0.301);
    }

    form input{
        font-size: 1.05rem;
        padding: 10px;
        margin-bottom: 15px;
        text-align: center;
    }

    #signup-btn{
        padding: 10px;
        font-size: 1.1rem;
        color: white;
        background-color: rgb(83, 80, 80);
        border: none;
        border-radius: 10px;
        transition-duration: 0.2s;
        cursor: pointer;
    }

    #signup-btn:hover{
        transform: scale(1.025);
    }

    label{
        font-size: 0.8rem;
        font-weight: bold;
        color: rgb(109, 109, 109);
        text-align: left;
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }
    
</style>