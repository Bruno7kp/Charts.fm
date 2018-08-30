<template>
<b-navbar toggleable="md" type="dark" variant="danger">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand to="/">Charts.fm</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
        <b-nav-item to="/about">About</b-nav-item>      
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
            <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
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
