<template>
  <div class="newPost">
      <div class="newPost-create-btn" @click="visible = true">Ajouter une nouvelle publication</div>

    <transition name="fade">
      <div class="overlay" v-if="visible">
          <div class="form-wrapper">
            <span class="form-close"  @click="visible = false">Fermer</span>
            <form class="newPost-form" @submit.prevent="sendForm()">

                <label for="newPost-title">Titre</label>
                <input id="newPost-title" v-model="title" type="text" placeholder="Titre de votre post..." required>
                
                <label for="newPost-content">Contenu</label>                 
                <textarea id="newPost-content"  v-model="content" placeholder="Contenu de votre post..." rows="5" cols="33"></textarea>

                <label class="custom-file-label" for="image">Choisir une image</label>
                <input name="image" id="image" type="file"  @change="setImage"/>

                <button id="newPost-btn" type="submit" >Publier</button>

            </form>
          </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'NewPost',

    data(){
        return{
            visible: false,
            title: '',
            content: '',
            image: null,
        }
    },

    methods: {

     setImage: function (event) {
      this.image = event.target.files[0]
    },
        sendForm(){
            let formData = new FormData();
              if (this.image !== null || "") {
            formData.append(`userId`, this.$user.userId);
            formData.append(`title`, this.title);
            formData.append("image", this.image, this.image.filename);
            formData.append(`content`, this.content);
      } else {
        formData.append(`userId`, this.$user.userId);
            formData.append(`title`, this.title);
            formData.append(`content`, this.content);
      }

             console.log(this.$user.userId);
              console.log(this.title);
               console.log(this.content);
                console.log(this.image);
                console.log(formData.entries);
            
            axios.post(`http://localhost:3000/api/posts/`,formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${this.$token}`
                        }
                    }
                )
                .then( this.visible = false)
                .then(this.$root.$emit('Posts'));
        }
    }
}
</script>

<style scoped> 

    .newPost{
        padding: 20px 20px 0px 20px ;   
    }

    .newPost-create-btn{
        margin: 30px auto;
        padding: 20px;
        border-radius: 30px;
        background-color: #0e213f;
        color: white;
        max-width: 750px;
        font-size: 1.5rem;
        transition-duration: 0.2s;
        cursor: pointer;
    }

    .newPost-create-btn:hover{
        transform: scale(1.02);
    }

    .overlay{
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(31, 30, 30, 0.678);
        z-index: 1;
    }

    .form-wrapper{
        box-sizing: border-box;
        background-color: white;
        display: flex;
        flex-direction: column;
        padding: 5%;
        width: 800px;
        height: 80%;
        border-radius: 30px;
    }

    .form-close{
        cursor: pointer;
        align-self: flex-end;
    }

    .newPost-form{
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    form input{
        font-size: 1.05rem;
        padding: 10px;
        margin-bottom: 15px;
        text-align: center;
        text-align: left;
        margin-bottom: 30px;    
    }

    form label{
        color: #d1515a;
        font-weight: bold;
        font-size: 1.3rem;
        margin-bottom: 10px;
    }

    #newPost-content{
        font-family: Avenir, Helvetica, Arial, sans-serif;
        height: 200px;
        width: calc(100% - 20px);
        padding: 10px;
        overflow-y: scroll;
    }

    #newPost-btn{
        margin-top: 20px;
        padding: 10px;
        font-size: 1.1rem;
        color: white;
        background-color: rgb(43, 42, 42);
        border: none;
        border-radius: 10px;
        transition-duration: 0.2s;
        cursor: pointer;
    }

    /* Transition */
    .fade-enter-active, .fade-leave-active {
    transition: opacity .8s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }
</style>