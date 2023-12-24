<template id="app">
  <div>
    <router-view/>
    <!-- <be-notifications/> -->
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

/* nav a.router-link-exact-active {
  color: #42b983;
} */

input:hover, select:hover{
  border: 1px solid rgb(16, 222, 16);
}


</style>
