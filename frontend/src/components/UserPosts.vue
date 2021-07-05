<template>

    <div class="UserPost">
        <div  v-for= "post in posts" :key="post.id">
            <router-link :to="{ name: 'Post', params: { id: post.id } }">
                <div class="post">
                    {{post.title}}
                </div> 
            </router-link>
        </div>

    </div>
    
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserPosts',

    data(){
        return{
            posts: []
        }
    },

    mounted(){
        this.getUserPosts();
    },

    methods: {
        getUserPosts(){
            const userId = this.$user.userId;
            
            axios.get(`http://localhost:3000/api/posts/user${userId}/posts`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(res => this.posts = res.data)
        }
    }

}
</script>

<style scoped>
    .UserPost{
        margin: 30px auto;
        max-width: 800px;
    }

    .post{
        background-color: #fffffffd;
        padding: 20px 20px 20px 30px;
        border-left: 2px solid #950913;
        margin-top: 20px;
        box-shadow: 0px 0px 50px -7px rgba(0,0,0,0.1);
        text-align: left;
        transition-duration: .1s;
        
    }

    .post:hover{
        box-shadow: 0px 0px 50px -7px rgba(0, 0, 0, 0.2);
    }

    
     @media (max-width: 670px) {
        .post{
           width: 50%;
           margin-left: 25%;
        }
    }

</style>