import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      nom: '',
      prenom: '',
      email: '',
      token: null,
      roleAdmin: false
    },
    StateValue: ""
  },
  mutations: {
    saveUserInfos(state, [nom, prenom, email, roleAdmin]) {
        state.user.nom = nom,
          state.user.prenom = prenom,
          state.user.email = email,
          state.user.token = localStorage.getItem('token'),
          state.user.roleAdmin = roleAdmin
    },
    StateValue(state, value) {
      state.StateValue = value
    }
  },
  actions: {
    getUserInfos(context) {
      axios
        .get("http://localhost:3000/api/user", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        
        .then(response => {
          console.log('api reponse',response);
          context.commit('saveUserInfos',[response.data.nom, response.data.id, response.data.email, response.data.roleAdmin])
        })
        .catch(error => {
          console.log('Erreur auth', error); 
        });
    },
  },
  modules: {
  }
})