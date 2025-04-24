<template>
<b-navbar toggleable="md" :type="theme" :variant="theme === 'light' ? 'white' :  'dark'" class="py-3 shadow-sm">
    <b-container>
        <b-navbar-brand to="/">Charts.fm</b-navbar-brand>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
            <b-nav-item v-if="users.length" to="/weekly">Weekly.fm <b-badge variant="danger">update</b-badge></b-nav-item>
          <b-nav-item v-if="users.length" to="/weekly/stats">Weekly.stats <b-badge variant="danger">update</b-badge></b-nav-item>
            <b-nav-item v-if="users.length" to="/weekly/live">Weekly.live</b-nav-item>
            <b-nav-item to="/blog">Blog</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        
        <b-navbar-nav class="ml-auto">
            <b-nav-item target="_blank" href="https://github.com/Bruno7kp/Charts.fm">
                <font-awesome-icon :icon="['fab', 'github']" fixed-width /><span class="d-md-none pl-2">GitHub</span>
            </b-nav-item>
            <b-nav-item href="#" @click="setTheme">
                <font-awesome-icon :icon="['fas', theme === 'light' ? 'sun' : 'moon']" fixed-width />
            </b-nav-item>
            <b-nav-item to="/settings"><font-awesome-icon :icon="['fa', 'cog']" fixed-width /><span class="d-md-none pl-2">{{ $t('word.settings') }}</span></b-nav-item>
        </b-navbar-nav>
        
        </b-collapse>
    </b-container>
</b-navbar>
<!-- navbar-1.vue -->
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

export default Vue.extend({
    name: 'Menu',
    computed: {
        ...mapGetters({
            users: 'getUsers',
            theme: 'getTheme',
        }),
    },
  methods: {
    setTheme() {
      this.$store.dispatch('setTheme', this.theme === 'light' ? 'dark' : 'light');
    },
  },
});
</script>
<style>
button.navbar-toggler:focus {
    outline: 1px none;
}
</style>
