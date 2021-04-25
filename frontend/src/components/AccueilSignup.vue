<template>
    <div class="screen-responsive">
        <form @submit.prevent = signup()>
            <img src="/assets/img/logo.png" alt="Groupomania-logo">
            <nav><router-link to="/">Connexion</router-link> | <router-link to="/signup" class="active">Inscription</router-link></nav>
            
            <div class="form-row">
            <input id="signup-nom" class="form-row__input" type="text" placeholder="Nom" required>
            <input id="signup-prenom" class="form-row__input" type="text" placeholder="Prenom" required>
            </div>

            <input id="signup-password" class="form-row__input" type="password" placeholder="Mot de passe" required>
            <input id="signup-password-verification" class="form-row__input" type="password" placeholder="Vérifier mot de passe" required>
        
            <input id="signup-email" class="form-row__input" type="email" placeholder="Email" required>

            <div class="error-message">{{message}}</div>

            <button id="signup-btn" type="submit">S'inscrire</button>
   
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AccueilSignup',

    data() {
        return {
            message: "",
        };
    },

    methods: {
        signup(){
            const nom = document.getElementById("signup-nom").value;
            const prenom = document.getElementById("signup-prenom").value;
            const password = document.getElementById("signup-password").value;
            const passwordConfirm = document.getElementById("signup-password-verification").value;
            const email = document.getElementById("signup-email").value;

            if(password === passwordConfirm){
                axios.post(`http://localhost:3000/api/auth/signup`,
                    {
                        nom,
                        prenom,
                        password,
                        email
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then(res => {
                    if(res.status === 201) {
                         location.href = '/';
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        this.message = "Email non disponible.";
                    }  
                });
            }
            else if( password != passwordConfirm){
                this.message = "Vérifier le mot de passe";
            }
            
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
    background:white;
    border-radius: 16px;
    padding:32px;
    }

        form input{
        font-size: 1.05rem;
        padding: 10px;
        margin-bottom: 15px;
        text-align: center;
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

    .error-message{
        background-color: rgba(255, 0, 0, 0.301);
    }


    #signup-btn{
        padding: 10px;
        font-size: 1.1rem;
        color: white;
        background-color: #0e213f;
        border: none;
        border-radius: 10px;
        transition-duration: 0.2s;
        cursor: pointer;
    }

    #signup-btn:hover{
        transform: scale(1.025);
    }

    
</style>