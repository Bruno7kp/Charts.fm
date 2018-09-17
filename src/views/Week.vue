<template>
  <div>
    <b-jumbotron fluid>
      <template slot="header">
        Weekly.fm
      </template>
      <template slot="lead">
        Create charts based on your <a href="https://last.fm" target="_blank">Last.fm</a> profile.
      </template>
    </b-jumbotron>
    <b-container>
      <WeeklyForm />
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WeeklyForm from '@/components/WeeklyForm.vue';
@Component({
  components: {
    WeeklyForm,
  },
})
export default class Week extends Vue {}
</script>
