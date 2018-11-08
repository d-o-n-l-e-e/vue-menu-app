<template>
  <div id="user" class="user" v-if="isConnected">
    <div id="currentUser" class="currentUser" v-if="currentUser">
      {{currentUser}}
      <button @click="signout">Sign Out</button>
    </div>
    <form id="signin" class="signin" v-else @submit.prevent="signin">
      <input type="text" v-model="email" placeholder="Email" @input="(e) => {errorMsg = ''}">
      <input type="password"
        v-model="password"
        placeholder="Password"
        @input="(e) => {errorMsg = ''}">
      <button type="submit">Submit</button>
    </form>
    <span v-if="errorMsg" style="color: red; font-size: 0.8em">{{errorMsg}} </span>
  </div>
</template>

<style lang="scss" scoped>
.user {
  margin-left: auto;
  text-align: right;
}

.signin input {
  margin-right: 5px;
  width: 120px;
  padding: 5px;
}
</style>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import Navigation from '@/components/Navigation.vue';

export default {
  name: 'signin-signout',
  components: {
    Navigation,
  },
  data() {
    return {
      email: undefined,
      password: undefined,
      errorMsg: '',
    };
  },
  props: ['isConnected', 'currentUser'],
  methods: {
    signin() {
      if (this.email && this.password) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((res) => {
          console.log('Logged in as: ', res.user.email);
          this.email = '';
          this.password = '';

          this.$router.replace('/menus');
        }, (err) => {
          this.errorMsg = err.message;
          // console.log(`Error:  ${err.message}`);
        });
      } else {
        this.errorMsg = 'Invalid Credentials';
      }
    },
    signout() {
      firebase.auth().signOut()
        .then(() => {
          console.log('Logged out');
          this.$router.replace('/');
        });
    },
  },
};
</script>
