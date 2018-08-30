<template>
  <div id="app">
    <Menu />
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

