<template>
  <div id="app">
    <Menu />
    <router-view/>
    <Footer />
    <notifications group="app" position="bottom left" class="w-100 mb-2" />
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
.vue-notification {
  font-size: 18px;
}
.vue-notification.success {
  background-color: #28a745 !important;
  border-left-color: #196b30;
}
</style>


