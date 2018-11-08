<template>
  <ul id="nav">
    <li>
      <router-link to="/menu">Menu</router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
#nav {
  display: inline-block;
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    display: inline-block;
    padding: 2px;
    margin-right: 8px;
    &:last-of-type {
      margin-right: 0;
    }
  }
  a {
    color: #2c3e50;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
