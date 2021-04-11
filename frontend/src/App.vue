<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #091f43;
}

body {
  background-image: linear-gradient(62deg, #7EBBFB 0%, #9C8BC9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding:32px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
