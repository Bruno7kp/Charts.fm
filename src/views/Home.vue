<template>
  <div class="home">
    <h1>Light Zero</h1>
    <LastFmForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LastFmForm from '@/components/LastFmForm.vue';
@Component({
  components: {
    LastFmForm,
  },
})
export default class Home extends Vue {}
</script>
