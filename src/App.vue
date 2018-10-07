<template>
  <div id="app">
    <Menu />
    <router-view/>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Menu from '@/components/Menu.vue';
import Footer from '@/components/Footer.vue';
@Component({
  components: {
    Menu,
    Footer,
  },
})
export default class App extends Vue {}
</script>
<style>
body {
  background-color: #f5f6f8;
}
.t-dark {
  background-color: #0c1219;
}
</style>


