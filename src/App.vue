<template>
  <div id="app">
    <Menu />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Menu from '@/components/Menu.vue';
@Component({
  components: {
    Menu,
  },
})
export default class App extends Vue {}
</script>

