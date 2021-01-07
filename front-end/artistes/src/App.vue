<template>
  <div id="app">
    <!-- <div>
      <router-link to="/"></router-link>
      <router-link to="/sign-up"></router-link>
      <router-link to="/sign-up-pro"></router-link>
      <router-link to="/sign-in"></router-link>
      <router-link to="/sign-in-pro"></router-link>
      <router-link to="/profil"></router-link>
      <router-link to="/profil-pro"></router-link>
      <router-link to="/creations"></router-link>
      <router-link to="/add-contents"></router-link>
      <router-link to="/mesposts"></router-link>
       <router-link to="/contact"></router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
