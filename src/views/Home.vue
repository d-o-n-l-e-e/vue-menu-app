<template>
  <div id="#home" class="home page-wrapper">
    <SignUp v-if="isConnected && !currentUser"/>
    <div v-if="isConnected && currentUser && userData">
      <p>Logged in as: {{userData.storeName}}</p>
      <router-link to="/menu">View Menu</router-link>
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
</style>

<script>
import SignUp from '@/components/SignUp.vue';

export default {
  name: 'home',
  components: {
    SignUp,
  },
  props: ['isConnected', 'currentUser', 'userData'],
};
</script>
