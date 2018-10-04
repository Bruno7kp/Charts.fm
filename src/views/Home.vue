<template>
  <div>
    <Carousel />
    <div class="jumbotron jumbotron-fluid m-0 pt-4">
      <b-container class="my-3">
        <b-row v-if="userName.length">
          <b-col sm="12" md="6" offset-md="3">
            <b-card header-bg-variant="dark"
                  header-tag="header"
                  header-text-variant="light"
                  class="mt-3 shadow-lg border-0">
                <h6 slot="header" class="mb-0">{{ userName }}'s Charts</h6>
              <b-link to="/weekly" class="btn btn-outline-danger">
                Weekly Charts <i class="fa fa-chevron-right"></i>
              </b-link>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" md="6" offset-md="3">
            <b-card header-bg-variant="danger"
                  header-tag="header"
                  header-text-variant="light"
                  class="mt-3 shadow-lg border-0">
                <h6 slot="header" class="mb-0">Enter your last.fm username</h6>
              <AddUser redirect />
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
  data() {
    let userName = '';
    if (this.$store.state.users.length) {
      userName = this.$store.state.currentUser;
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
  background-image: linear-gradient(to left top, #711222, #8b1a2b, #a52334, #c02c3c, #dc3545);
  background-color: #a52334;
}
</style>

