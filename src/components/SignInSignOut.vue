<template>
  <div id="user" class="user" v-if="isConnected">
    <div id="currentUser" class="currentUser" v-if="currentUser">
      {{currentUser}}
      <button @click="signout">Sign Out</button>
    </div>
    <form id="signin" class="signin" v-else @submit.prevent="signin">
      <input type="text" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Password">
      <button type="submit">Submit</button>
    </form>
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
          console.log(`Error:  ${err.message}`);
        });
      } else {
        console.log('[Sign In] Invalid Credentials');
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
