<template>
    <div class="onePost">
        <div class="post-wrapper" v-if="!modify">
            <h2 class="post-title">{{this.post.title}}</h2>
            <div class="post-content" v-html="this.post.content"></div>
        </div>

        <div class="modify-wrapper" v-if="modify">
            <label for="modify-title">Modifier le titre :</label>
            <input type="text" id="modify-title" v-model="this.post.title">

            <label for="modify-content">Modifier le contenu :</label>
            <editor 
                :initialValue="this.post.content"
                apiKey="wl4x61cpwc9upmhjgvieryy7lljn5fqq20vyu93ngtjghwby"
                v-model="modifiedContent"
                :init="{
                menubar: false,
                plugins: [
                    'advlist autolink lists link',
                    'searchreplace visualblocks code fullscreen',
                    'print preview anchor insertdatetime media',
                    'paste code help wordcount table'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | help'
                }"
            >
                <textarea id="modify-content" v-model="this.post.content"></textarea>
            </editor>

            <label for="new-attachement">Sélectionnez une image à publier</label>
             <input type="file" id="new-attachement" name="new-attachement" accept=".jpg, .jpeg, .png">

        </div>

        <button v-if="authorized && !modify" @click="modify = true">Modifier</button>
        <button v-if="modify" @click="modify = false">Annuler</button>
        <button v-if="modify" @click="modifyOnePost()">Publier les modifications</button>
        <button v-if="modify" class="delete-btn" @click="deleteOnePost()">Supprimer la publication</button>
    </div>
    
</template>

<script>
import axios from 'axios';
import Editor from '@tinymce/tinymce-vue';

export default {
    name: 'OnePost',

    components: {
      editor: Editor
    },

    data(){
        return{
            modifiedContent: '',
            post: [],
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

        modifyOnePost(){
            const postId = this.$route.params.id;
            const title = document.querySelector('#modify-title').value;
            const content = this.modifiedContent;
            
            axios.put(`http://localhost:3000/api/posts/${postId}`,
                {
                    postId,
                    title,
                    content
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(location.href = "/");
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
        display: flex;
        flex-direction: column;
        margin: 50px auto;
        padding: 30px;
        max-width: 800px;
        text-align: left;
        box-shadow: 0px 0px 50px -7px rgba(0,0,0,0.1);
        border-bottom: solid #d1515a 2px;
    }

    #modify-title {
        margin: 0;
        margin-bottom: 20px;
        color: #d1515a;
        font-size: 2rem;
    }

    #modify-content{
        margin-top: 20px;
        height: 200px;
        width: calc(100% - 22px);
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
            flex-direction: column;
            padding: 30px 20px 20px 20px;
        }
    }

    /* Image*/

    label {
    display: block;
    font: 1rem 'Fira Sans', sans-serif;
    }

    input,label {
    margin: .4rem 0;
    }

</style>