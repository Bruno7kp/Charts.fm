<template>
  <div>
    <b-container class="my-3">
      <b-row>
        <b-col sm="12" md="6">
          <b-card header="Users" 
                  header-bg-variant="danger"
                  header-tag="header"
                  header-text-variant="light"
                  class="mt-3 shadow border-0"
          >
          <h6 slot="header" class="mb-0"><font-awesome-icon :icon="['fab', 'lastfm']" /> Users</h6>
          <AddUser />
          <hr/>
          <UsersList />
          </b-card>
        </b-col>
        <b-col sm="12" md="6">
          <b-card header-bg-variant="dark" 
                  header-text-variant="white"
                  border-variant="dark" 
                  class="mt-3 shadow border-0"
          >
            <h6 slot="header" class="mb-0"><font-awesome-icon :icon="['fa', 'cog']" /> Settings</h6>
            <SettingsForm v-bind:user-name="userName" v-bind:timezone="timezone" v-bind:timezones="timezones" />
          </b-card>
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
export default class Settings extends Vue {}
</script>
