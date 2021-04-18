<template>
    <div class="screen-responsive">
        <img src="/assets/img/logo.png" alt="Groupomania-logo">
        <nav><router-link to="/" class="active">Connexion</router-link> | <router-link to="/signup">Inscription</router-link></nav>
        <form @submit.prevent = login()>

            <label for="login-email">Email :</label>
            <input id="login-email" class="form-row__input" type="text" placeholder="Email" required>
            
            <label for="login-password">Mot de passe :</label>
            <input id="login-password" class="form-row__input" type="password" placeholder="Mot de passe" required>

            <div class="error-message">{{message}}</div>

            <button id="login-btn" type="submit">Connexion</button>

            
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AccueilLogin',

    data() {
        return {
            message: "",
        };
    },

    methods: {

        login(){
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            axios.post(`http://localhost:3000/api/auth/login`,
                {
                    email,
                    password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                location.reload();
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    this.message = "Utilisateur inconnu.";
                }
                if (error.response.status === 401) {
                    this.message = "Email ou mot de passe invalide.";
                }
                if (error.response.status === 500) {
                    this.message = "Erreur serveur.";
                }
            });
        }
    }
}
</script>

<style scoped>
    .form-row {
    display: flex;
    margin: 16px 0px;
    gap:16px;
    flex-wrap: wrap;
  }

    .screen-responsive{
    max-width: 100%;
    width: 540px;
    background:white;
    border-radius: 16px;
    padding:32px;
    }


    .form-row__input {
    padding:8px;
    border: none;
    border-radius: 8px;
    background:#f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
  }

    img{
         width: 50%;
        margin-left: auto;
        margin-right: auto;
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

    form input{
        font-size: 1.05rem;
        padding: 10px;
        margin-bottom: 15px;
        text-align: center;
    }

    #login-btn{
        padding: 10px;
        font-size: 1.1rem;
        color: white;
        background-color: #0e213f;
        border: none;
        border-radius: 10px;
        transition-duration: 0.2s;
        cursor: pointer;
    }

    #login-btn:hover{
        transform: scale(1.025);
    }

    .error-message{
        background-color: rgba(255, 0, 0, 0.301);
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