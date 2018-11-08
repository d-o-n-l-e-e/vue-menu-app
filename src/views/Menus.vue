<template>
  <div id="#menus" class="menus page-wrapper">
    <ul ref="menuList">
      <li v-for="item in menus" v-bind:key="item.email">
        <router-link :to="`/menu/${item.storeName}`">{{item.storeName}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default {
  name: 'menus',
  data() {
    return {
      menus: [],
    };
  },
  props: ['isConnected', 'currentUser', 'currentUserID', 'userData'],
  created() {
    firebase.firestore().collection('menus')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const menuData = doc.data();
          this.menus.push(menuData);
        });
      });
  },
  methods: {
  },
};
</script>
