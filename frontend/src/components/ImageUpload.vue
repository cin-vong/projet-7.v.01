<template>
  <div class="file-upload">
    <input type="file" @change="onFileChange" />
    <button @click="onUploadFile" class="upload-button" :disabled="!this.selectedFile">Upload file</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
     name: 'ImageUpload',
     
  data() {
    return {
      selectedFile: "",
    };
  },
  methods: {
    onFileChange(e) {
      const selectedFile = e.target.files[0];
       this.selectedFile = selectedFile;
    },
    onUploadFile() {
      const formData = new FormData();
      formData.append("file", this.selectedFile); 
     // Envoi le fichier vers le backend
      axios.post("http://localhost:3000/api/posts/", formData)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>