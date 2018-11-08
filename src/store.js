import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const user = {
  state: {
    currentUser: null,
    userData: null,
    userMenu: null,
  },
  mutations: {
    UDPATE_USER(context, userObj) {
      const state = context;
      state.currentUser = userObj;
    },
    UPDATE_USER_DATA(context, userData) {
      const state = context;
      state.userData = userData;
    },
    UPDATE_USER_MENU(context, userMenu) {
      const state = context;
      state.userMenu = userMenu;
    },
  },
  actions: {
    updateUser(context, userObj) {
      context.commit('UDPATE_USER', userObj);
    },
    updateUserData(context, userData) {
      context.commit('UPDATE_USER_DATA', userData);
    },
    updateUserMenu(context, userMenu) {
      context.commit('UPDATE_USER_MENU', userMenu);
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
