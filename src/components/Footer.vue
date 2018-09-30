<template>
    <footer class="footer py-4 mt-4">
        <b-container>
            <b-row>
                <b-col>
                    Charts.fm
                </b-col>
                <b-col class="text-right">
                    2018 @ <a href="https://b7kp.com">b7kp.com</a>
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
    footer.footer {
        background-color: rgb(241, 241, 241);
        color: #444;
    }
</style>

