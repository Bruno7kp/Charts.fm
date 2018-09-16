<template>
  <div>
    <b-jumbotron fluid>
      <template slot="header">
        Charts.fm
      </template>
      <template slot="lead">
        Create charts based on your <a href="https://last.fm">Last.fm</a> profile.
      </template>
    </b-jumbotron>
    <b-container>
      <LastFmForm />
    </b-container>
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
