<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html{
  box-sizing: border-box;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding:32px;
}

#app {
 font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #091f43;
}

a {
  color: inherit;
  text-decoration: none;
}

a.router-link-exact-active {
  color: inherit;
}
</style>
