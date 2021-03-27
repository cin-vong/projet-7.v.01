<template>
    <div class="login">
        <nav><router-link to="/" class="active">Inscription</router-link> | <router-link to="/login">Connection</router-link></nav>
        <form @submit.prevent = login()>

            <input id="login-email" type="text" placeholder="Email" required>
            
            <input id="login-password" type="password" placeholder="Mot de passe" required>

            <button id="login-btn" type="submit">Connexion</button>

        </form>
    </div>
</template>

<script>
import router from "../router"   
import axios from 'axios'
export default {
    name: 'AccueilLogin',
    data(){
      return{
        email:"",
        password:"" 
       }
    },
    methods: {
        login(){
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            axios.post(`http://localhost:3000/api/user/login`,
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
               localStorage.setItem('user','token' ,JSON.stringify(res.data.token));
                router.push("/profile")
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
    .login{
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
        color: rgba(53, 53, 53, 0.664);
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
        background-color: rgb(83, 80, 80);
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