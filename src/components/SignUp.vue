<template>
  <div class="signup-ctn">
    <h2>Sign Up</h2>
    <form id="signup" class="signup" @submit.prevent="signup">
      <input type="text" v-model="storeName" placeholder="Store Name" @input="resetErrorMsg">
      <br>
      <input type="text" v-model="email" placeholder="Email" @input="resetErrorMsg">
      <br>
      <input type="password" v-model="password" placeholder="Password" @input="resetErrorMsg">
      <br>
      <button type="submit">Sign Up</button>
    </form>
    <p v-if="error" style="color: red;">{{error}}</p>
  </div>
</template>

<style lang="scss" scoped>
  .signup-ctn {
    padding: 20px;
    text-align: center;
  }
  h2 {
    font-size: 24px;
    margin: 0 0 15px;
  }
  input {
    width: 220px;
    padding: 5px;
    margin-bottom: 10px;
  }
</style>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default {
  name: 'signup',
  data() {
    return {
      storeName: undefined,
      email: undefined,
      password: undefined,
      error: undefined,
    };
  },
  methods: {
    signup() {
      if (this.storeName && this.email && this.password) {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((res) => {
          firebase.firestore().collection('users').doc(res.user.uid).set({
            storeName: this.storeName,
            email: res.user.email,
            menu: null,
          })
            .then(() => {
              console.log('Document successfully written!');
            })
            .catch((error) => {
              console.error('Error writing document: ', error);
            });

          this.$router.replace('/menu');

          console.log('User Created: ', res.user);
          this.storeName = '';
          this.email = '';
          this.password = '';
        }, (err) => {
          this.error = err.message;
          console.log('Error: ', err.message);
        });
      } else {
        this.error = 'Please complete the form.';
        console.log(this.error);
      }
    },
    resetErrorMsg() {
      this.error = undefined;
    },
  },
};
</script>
