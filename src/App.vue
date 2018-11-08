<template>
  <main id="app">
    <Header
      v-bind:isConnected="connected"
      v-bind:currentUser="currentUser"
      v-bind:userData="userData"
    />
    <router-view
      v-show="connected"
      v-bind:isConnected="connected"
      v-bind:currentUser="currentUser"
      v-bind:currentUserID="currentUserID"
      v-bind:userData="userData"
    />
  </main>
</template>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: inherit;
}
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
}
.page-wrapper:not(.no-pad) {
  padding: 30px;
}
</style>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import Header from '@/components/Header.vue';

export default {
  name: 'app',
  components: {
    Header,
  },
  data() {
    return {
      connected: false,
      currentUser: null,
      currentUserID: null,
      userData: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.dispatch('updateUser', user);
      this.currentUser = user ? user.email : null;
      this.currentUserID = user ? user.uid : null;

      if (user) {
        console.log('User', user);
        const userDoc = firebase.firestore().collection('users').doc(user.uid);

        userDoc.onSnapshot((doc) => {
          if (doc.exists) {
            console.log('Current Document data:', doc.data());
            this.userData = doc.data();
            this.$store.dispatch('updateUserData', doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        }, (err) => {
          console.log(`Error:  ${err.message}`);
        });
      } else {
        this.userData = null;
        this.$store.dispatch('updateUserData', null);
      }
    });
    this.connected = true;
  },
};
</script>
