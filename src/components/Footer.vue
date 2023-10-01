<template>
    <footer class="footer py-4 border-top border-dark">
        <b-container>
            <b-row>
                <b-col>
                    <b-link to="/" active-class="" class="btn btn-outline-light border-0 m-1">Charts.fm</b-link>
                    <b-link to="/settings" class="btn btn-outline-light border-0 m-1">{{ $t("word.settings") }}</b-link>
                    <a target="_blank" href="https://last.fm/bruno7kp" class="btn btn-outline-danger border-0 m-1">Last.fm</a>
                    <a target="_blank" href="https://b7kp.com" class="btn btn-outline-danger border-0 m-1">b7kp.com</a>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="mt-3">
                    <span class="text-secondary ml-3">
                        @ 2023 Charts.fm
                    </span>
                </b-col>
            </b-row>
        </b-container>
    </footer>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
export default Vue.extend({
    name: 'Footer',
});
</script>
<style>
footer {
    background-color: #0c1219;
}
footer a {
    font-weight: bold;
}
</style>
