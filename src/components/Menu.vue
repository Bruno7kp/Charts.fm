<template>
<b-navbar toggleable="md" type="light" variant="white" class="py-3 shadow-sm">
    <b-container>
        <b-navbar-brand to="/">Charts.fm</b-navbar-brand>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
            <b-nav-item v-if="users.length" to="/weekly">Weekly.fm</b-nav-item>
            <!--<b-nav-item v-if="users.length">Monthly.fm</b-nav-item>-->
            <!--<b-nav-item v-if="users.length">Yearly.fm</b-nav-item>-->
            <!--<b-nav-item to="/about">About</b-nav-item>-->
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        
        <b-navbar-nav class="ml-auto">
            <b-nav-item target="_blank" href="https://github.com/Bruno7kp/Charts.fm">
                <i class="fab fa-github fa-fw"></i><span class="d-md-none pl-2">GitHub</span>
            </b-nav-item>
            <b-nav-item target="_blank" href="https://forum.zero.b7kp.com">
                <i class="far fa-comment-alt fa-fw"></i><span class="d-md-none pl-2">Forum</span>
            </b-nav-item>
            <b-nav-item to="/settings"><i class="fa fa-cog fa-fw"></i><span class="d-md-none pl-2">Settings</span></b-nav-item>
            
            <!--
            <b-nav-item-dropdown text="Lang" right>
                <b-dropdown-item href="#">PT</b-dropdown-item>
                <b-dropdown-item href="#">EN</b-dropdown-item>
                <b-dropdown-item href="#">ES</b-dropdown-item>
            </b-nav-item-dropdown>
            -->
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
        }),
    },
});
</script>
<style>
button.navbar-toggler:focus {
    outline: 1px none;
}
</style>
