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
      <b-row>
        <b-col>
          <h2>Settings</h2>
          <WeeklyForm 
            :user="userName" 
            :users="users" 
            :limit="user.weeklyCharts.limit" 
            :weekDay="user.weeklyCharts.startDay" 
            :startDate="user.weeklyCharts.startDate" />
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import WeeklyForm from '@/components/WeeklyForm.vue';
@Component({
  components: {
    WeeklyForm,
  },
  computed: {
    ...mapGetters({
      users: 'getUsersAsOptions',
      userName: 'getDefaultUserName',
      user: 'getDefaultUser',
    }),
  },
})
export default class Week extends Vue {}
</script>
