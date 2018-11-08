<template>
  <div id="#home" class="home page-wrapper">
    <div v-if="!currentUser">
      <p>Log in if you already have an account or sign up if do not.</p>
      <p>(Note:
        Each account is tied to a unique email, but the email address does not get validated.
        So feel free to use a fake email.
        )
      </p>
      <hr>
    </div>
    <SignUp v-if="isConnected && !currentUser"/>
    <div v-if="isConnected && userMenu">
      <p>Logged in as: {{userMenu.storeName}}</p>
      <p><router-link :to="`/menu/${userMenu.storeName}`">View Menu</router-link></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
header {
  background: #ccc;
  padding: 10px 20px;
}
.user {
  float: right;
  line-height: 45px;
}
h1 {
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  margin: 0;
  line-height: 45px;
}
p {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}
</style>

<script>
import SignUp from '@/components/SignUp.vue';

export default {
  name: 'home',
  components: {
    SignUp,
  },
  props: ['isConnected', 'currentUser', 'userData', 'userMenu'],
};
</script>
