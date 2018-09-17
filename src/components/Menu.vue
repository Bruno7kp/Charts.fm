<template>
<b-navbar toggleable="md" type="dark" variant="danger">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand to="/">Charts.fm</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
        <b-nav-item to="/weekly">Weekly.fm</b-nav-item>
        <b-nav-item>Monthly.fm</b-nav-item>
        <b-nav-item>Yearly.fm</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>      
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">PT</b-dropdown-item>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
        </b-nav-item-dropdown>
    </b-navbar-nav>

    </b-collapse>
</b-navbar>
<!-- navbar-1.vue -->
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
export default Vue.extend({
    name: 'Menu',
});
</script>
