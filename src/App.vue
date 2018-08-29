<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
form {
    max-width: 30em;
    display: grid;
    grid-gap: .6em 0;
    margin: 0 auto;
}
form .form-row {
    display: flex;
    width: 100%;
}
form label {
  display: block;
  width: 50%;
}

input, select {
    font-size: 1em;
    border: 1px black solid;
    width: 100%;
}
</style>
