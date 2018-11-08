<template>
  <div id="#test" class="test page-wrapper">
    <div class="links">
      <Navigation/>
    </div>
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<style lang="scss" scoped>
.test {
  padding-top: 60px;
  text-align: center;
}
.links {
  margin-bottom: 20px;
}
</style>


<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
    Navigation,
  },
  props: ['isConnected', 'currentUser', 'userData'],
};
</script>
