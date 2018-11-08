import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const user = {
  state: {
    currentUser: null,
    userData: null,
  },
  mutations: {
    updateUser(state, userObj) {
      state.currentUser = userObj;
    },
    updateUserData(state, userData) {
      state.userData = userData;
    },
  },
  actions: {
    updateUser(context, userObj) {
      context.commit('updateUser', userObj);
    },
    updateUserData(context, userData) {
      context.commit('updateUserData', userData);
    },
  },
  getters: {
    userEmail(state) {
      return (state.currentUser) ? state.currentUser.email : null;
    },
    userData(state) {
      return (state.userData) ? state.userData : null;
    },
  },
};

const store = new Vuex.Store({
  modules: {
    user,
  },
});

export default store;
