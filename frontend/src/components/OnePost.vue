<template>

    <div class="onePost">
        <div class="post-wrapper" v-if="!modify">
            <h2 class="post-title">{{this.post.title}}</h2>
            <div class="post-content" v-html="this.post.content"></div>
             <img :src="post.image">
        </div>

        <div class="modify-wrapper" v-if="modify">
            <label for="modify-title">Modifier le titre :</label>
            <input type="text" id="modify-title" v-bind:value="this.post.title">

            <label for="modify-content">Modifier le contenu :</label>
            <textarea id="modify-content" v-bind:value="this.post.content"></textarea>
             <img id= "modify-image" :src="post.image" alt="image" height="200" width="200">
        </div>

        
        <button v-if="authorized && !modify" @click="modify = true">Modifier</button>

        <label v-if="modify" class="custom-file-label" for="image">Choisir une image</label>
        <input v-if="modify" name="image" id="image" type="file"  @change="setImage"/>


        <button v-if="modify" @click="modify = false">Annuler</button>
        <button v-if="modify" v-on:click.prevent="modifyOnePost">Publier les modifications</button>
        <button v-if="modify" class="delete-btn" @click="deleteOnePost()">Supprimer la publication</button>
    </div>
    
</template>

<script>
import axios from 'axios';


export default {
    name: 'OnePost',

    data(){
        return{
            post: [],
            title:'',
            content:'',
            image: null,
            authorized: false,
            modify: false
        }
    },

    mounted(){
        this.getOnePost();
    },

    methods: {
        getOnePost(){
            const postId = this.$route.params.id;
            
            axios.get(`http://localhost:3000/api/posts/${postId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(res => {
                this.post = res.data[0];
                this.title = this.post.title;
                this.content = this.post.content;
                this.image = this.post.image;


                if(this.$user.userId === this.post.userId || this.$user.roleAdmin == 1){
                    this.authorized = true;
                 }

                else{
                    this.authorized = false;
                }
            })
        },

        deleteOnePost(){
            const postId = this.$route.params.id;
            
            axios.delete(`http://localhost:3000/api/posts/${postId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(location.href = "/");
        },

       setImage: function (event) {
      this.image = event.target.files[0]
    },
        modifyOnePost(){
            const postId = this.$route.params.id;
            const title = document.querySelector('#modify-title').value;
            const content = document.querySelector('#modify-content').value;
            const image = document.querySelector('#modify-image').value;
        

            console.log( this.post.content);
            console.log('test');
            axios.put(`http://localhost:3000/api/posts/${postId}`,
                {
                    postId,
                    title,
                    content,
                    image
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(res =>{
                console.log(res);
                window.location = "/";
            });
        },
    }
}
</script>

<style scoped>
    /* Post style */
    .post-wrapper{
        margin: 50px auto 30px auto;
        padding: 30px;
        max-width: 800px;
        text-align: left;
        box-shadow: 0px 0px 50px -7px rgba(0,0,0,0.1);
        border-bottom: solid #d1515a 5px;
    }

    .post-title {
        margin: 0;
        color: #d1515a;
        font-size: 2rem;
    }

    .post-content{
        margin-top: 20px;
    }

    /* Modify style */

    .modify-wrapper{
        box-sizing: border-box;
        background-color: white;
        display: flex;
        flex-direction: column;
        padding: 5%;
        width: 800px;
        height: 80%;
        border-radius: 30px;
    }

    #modify-title {
        margin: 0;
        margin-bottom: 20px;
        color: #d1515a;
        font-size: 2rem;
    }

    #modify-content{
        font-family: Avenir, Helvetica, Arial, sans-serif;
        height: 200px;
        width: calc(100% - 20px);
        padding: 10px;
        resize: none;
        overflow-y: scroll;
    }

    .onePost button{
        margin-top: 20px;
        padding: 10px;
        font-size: 1.1rem;
        color: white;
        background-color: rgb(43, 42, 42);
        border: none;
        border-radius: 10px;
        transition-duration: 0.2s;
        cursor: pointer;
        margin: 0px 20px 50px 20px;
    }

    .delete-btn{
        background-color: #d1515a !important;
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

     @media (max-width: 670px) {
        .post-wrapper{
            margin-left: 10%;
            width: 80%;
            flex-direction: column;
            padding: 30px 20px 20px 20px;
        }

        #modify-title {
        margin: 0;
        width: calc(50% - 10px);
        margin-left: 230px;
        margin-bottom: 50px;
        color: #d1515a;
        font-size: 2rem;

    }

        #modify-content{
        font-family: Avenir, Helvetica, Arial, sans-serif;
        height: 200px;
        width: calc(60% - 70px);
        margin-left: 230px;
        padding: 10px;
        resize: none;
        overflow-y: scroll;
    }

    #modify-image, #image{
         margin-left: 230px;
    }

    #delete-btn{
        background-color: #d1515a !important;
        margin-left: 10px;
    }
        
    }
</style>