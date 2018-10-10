<template>
  <div id="app" :class="'t-' + theme">
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
import Theme from './charts/theme';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'App',
  components: {
    Menu,
    Footer,
  },
  computed: {
    ...mapGetters({
      theme: 'getTheme',
    }),
  },
});
</script>
<style>
body {
  background-color: #f5f6f8;
}
.bg-dark {
  background-color: #0c1219 !important;
}
.t-dark {
  background-color: #343a40;
}
.t-dark .form-control {
  color: white;
}
.form-control, .form-control:focus {
  background-color: transparent;
}
.t-dark .form-control option {
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


