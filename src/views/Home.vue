<template>
  <div>
    <div class="jumbotron jumbotron-fluid jumbo m-0 pt-4">
      <b-container class="my-3">
        <b-row>
          <b-col sm="12" md="6" offset-md="3">
            <h1 class="intro">Charts.fm</h1>
            <p class="intro">{{ $t("messages.intro") }}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" md="6" offset-md="3">
            <b-card header-bg-variant="danger"
                  header-tag="header"
                  :bg-variant="theme === 'light' ? 'white' : 'dark'"
                  text-variant="white"
                  class="mt-3 shadow-lg border-0">
                <h6 slot="header" class="mb-0">{{ $t("lastfm.username") }}</h6>
              <AddUser redirect />
            </b-card>
          </b-col>
        </b-row>
        <b-row v-if="userName.length">
          <b-col sm="12" md="6" offset-md="3">
            <b-card header-tag="header"
                    :header-bg-variant="theme === 'light' ? 'dark' : 'white'"
                    :header-text-variant="theme === 'light' ? 'white' : 'dark'"
                    :bg-variant="theme === 'light' ? 'white' : 'dark'"
                    :text-variant="theme === 'light' ? 'dark' : 'white'"
                    class="mt-3 shadow-lg border-0">
              <h6 slot="header" class="mb-0">{{ userName }}: Charts</h6>
              <b-link to="/weekly" class="btn btn-outline-danger">
                {{ $t("chart.weekly") }} <font-awesome-icon :icon="['fa', 'chevron-right']" />
              </b-link>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SettingsForm from '@/components/SettingsForm.vue';
import UsersList from '@/components/UsersList.vue';
import AddUser from '@/components/AddUser.vue';
import Carousel from '@/components/Carousel.vue';
import * as moment from 'moment';
import 'moment-timezone';
import User from '@/charts/user';


@Component({
  components: {
    SettingsForm,
    UsersList,
    AddUser,
    Carousel,
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
  },
  data() {
    let userName = '';
    if (this.$store.state.users.length) {
      const user = this.$store.getters.getDefaultUser;
      userName = user.login;
    }

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
<style>
div.jumbotron {
  background-image: url('../assets/background-charts3.png') !important;
  background-color: #a52334;
}
.jumbo {
  min-height: 78vh;
}
.t-dark div.jumbotron {
  background: #343a40;
}
#app {
  min-height: 100vh;
}
h1.intro, p.intro {
  color: white !important;
  text-align: center;
}
</style>

