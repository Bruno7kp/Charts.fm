<template>
    <footer class="footer py-4 bg-dark text-white">
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
