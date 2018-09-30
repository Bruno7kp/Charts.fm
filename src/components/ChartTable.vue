<template>
  <b-row>
      
    <b-col>
      <b-btn type="button" variant="success" v-on:click="load">Load charts</b-btn>
      {{ mUser.weeklyCharts.weeks.length + '/' + weeklyList.length + ' weeks' }}
      <b-table :items="items" :fields="fields">
    <template slot="show_details" slot-scope="row">
      <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
      <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
       {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
      </b-button>
      <!-- In some circumstances you may need to use @click.native.stop instead -->
      <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
      <b-form-checkbox @click.native.stop @change="row.toggleDetails" v-model="row.detailsShowing">
        Details via check
      </b-form-checkbox>
    </template>
    <template slot="row-details" slot-scope="row">
      <b-card>
        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right"><b>Age:</b></b-col>
          <b-col>{{ row.item.age }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
          <b-col>{{ row.item.isActive }}</b-col>
        </b-row>
        <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
      </b-card>
    </template>
  </b-table>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import * as _ from 'lodash';
import LastFm from '@/lastfm';
import { User, fixedStartDate, getWeeklyList, Week } from '@/charts';
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';

export default Vue.extend({
  name: 'ChartTable',
  props: {
    user: Object,
  },
  computed: {
    ...mapGetters({
      weekDays: 'getWeekDays',
      users: 'getUsersAsOptions',
    }),
    weeklyList(): Week[] {
      const limit = this.mUser.weeklyCharts.limit;
      const realStart = fixedStartDate(this.mUser.weeklyCharts.startDate, this.mUser.weeklyCharts.startDay);
      return getWeeklyList(realStart, new Date(), limit);
    },
    items(): any[] {
      if (this.mUser.weeklyCharts.weeks.length > 0) {
        return this.mUser.weeklyCharts.weeks[0].artists;
      }
      return [];
    },
  },
  data() {
    return {
      mUser: this.user,
      mUserName: this.user.login,
      fields: [ 'rank', 'name', 'playcount' ],
    };
  },
  watch: {
    mUserName(newUser, oldUser) {
      this.mUser = this.$store.getters.getUser(newUser);
    },
  },
  methods: {
    load() {
      // this.mUser.weeklyCharts.weeks = [];
      const startIndex = 426; // this.mUser.weeklyCharts.weeks.length;
      const artistChart = [];
      for (let i = startIndex; i < this.weeklyList.length; i++) {
        const week = this.weeklyList[i];
        const last = this.weeklyList.length === (i + 1);
        week.load(this.mUser.login).then((response) => {
          this.mUser.weeklyCharts.weeks.push(week);
          if (last) {
            this.mUser.weeklyCharts.weeks.sort(
              (a: Week, b: Week) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0));
          }
          this.$store.dispatch('updateUser', this.mUser);
        });
      }
    },
  },
});
</script>
