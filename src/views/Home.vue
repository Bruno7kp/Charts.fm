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
      <b-row>
        <b-col>
          <h2>Settings</h2>
          <SettingsForm v-bind:user-name="userName" v-bind:timezone="timezone" v-bind:timezones="timezones" />
        </b-col>
        <b-col>
          <h2>Users</h2>
          <AddUser />
          <hr/>
          <UsersList />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SettingsForm from '@/components/SettingsForm.vue';
import UsersList from '@/components/UsersList.vue';
import AddUser from '@/components/AddUser.vue';
import * as moment from 'moment';
import 'moment-timezone';
import User from '@/charts/user';


@Component({
  components: {
    SettingsForm,
    UsersList,
    AddUser,
  },
  data() {
    const userName = this.$store.state.currentUser;
    let timezone = this.$store.state.timezone;
    if (!timezone) {
      timezone = moment.tz.guess();
    }
    return {
      userName,
      timezone,
      timezones: moment.tz.names(),
    };
  },
})
export default class Home extends Vue {}
</script>
