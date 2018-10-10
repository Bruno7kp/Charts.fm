<template>
  <div>
    <b-container class="my-3">
      <b-row>
        <b-col sm="12" md="6">
          <b-card header="Users" 
                  header-bg-variant="danger"
                  header-tag="header"
                  header-text-variant="light"
                  :bg-variant="theme === 'light' ? 'white' : 'dark'"
                  :text-variant="theme === 'light' ? 'dark' : 'white'"
                  class="mt-3 shadow border-0"
          >
          <h6 slot="header" class="mb-0"><font-awesome-icon :icon="['fab', 'lastfm']" /> {{ $tc('word.user', 2) }}</h6>
          <AddUser />
          <hr/>
          <UsersList />
          </b-card>
        </b-col>
        <b-col sm="12" md="6">
          <b-card :header-bg-variant="theme === 'light' ? 'dark' : 'white'" 
                  :header-text-variant="theme === 'light' ? 'white' : 'dark'"
                  border-variant="dark" 
                  :bg-variant="theme === 'light' ? 'white' : 'dark'"
                  :text-variant="theme === 'light' ? 'dark' : 'white'"
                  class="mt-3 shadow border-0"
          >
            <h6 slot="header" class="mb-0"><font-awesome-icon :icon="['fa', 'cog']" /> {{ $t('word.settings') }}</h6>
            <SettingsForm v-bind:user-name="userName" 
              v-bind:timezone="timezone" 
              v-bind:timezones="timezones"
              v-bind:language="language"
              v-bind:languages="languages"
              v-bind:theme="theme"
              v-bind:themes="themes" />
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
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'Settings',
  components: {
    SettingsForm,
    UsersList,
    AddUser,
  },
  computed: {
    ...mapGetters({
      theme: 'getTheme',
    }),
  },
  data() {
    const userName = this.$store.state.currentUser;
    let timezone = this.$store.state.timezone;
    if (!timezone) {
      timezone = moment.tz.guess();
    }
    const language = this.$store.state.lang;
    return {
      userName,
      timezone,
      timezones: moment.tz.names(),
      language,
      languages: ['en', 'pt'],
      themes: ['light', 'dark'],
    };
  },

});
</script>
