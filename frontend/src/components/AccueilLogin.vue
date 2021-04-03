<template>
    <div class="login">
        <nav><router-link to="/" class="active">Inscription</router-link> | <router-link to="/login">Connection</router-link></nav>
        <form @submit.prevent = login()>

            <input id="login-email" type="text"  v-model="email" placeholder="Email" required>
            
            <input id="login-password" type="password"  v-model="password" placeholder="Mot de passe" required>

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
            const data = {
                email: this.email,
                password: this.password
            };
            axios.post(`http://localhost:3000/api/user/login/`, data)
                .then(
                    res => {
                        localStorage.setItem('user', JSON.stringify(res.data));
                         //this.$store.dispatch('token',JSON.stringify(res.data));
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