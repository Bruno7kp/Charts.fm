<template>
  <b-row>
    <b-col>
      <b-row>
        <b-col sm="12" md="6" lg="7" class="mt-3">
          <div class="h3">{{ user.login }}</div>
        </b-col>
        <b-col sm="12" md="6" lg="5" class="mt-3 text-center">
          <div class="h5" v-if="totalWeeks > 0">Week {{ index + 1 }}</div>
          <div class="h6" v-if="totalWeeks > 0">{{ currentDate + ' - ' + currentEndDate }}</div>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="6" lg="4">
          <b-nav pills fill class="nav-danger mb-2">
            <b-nav-item :active="selected == 'artists'" @click="selectArtists"><i class="fa fa-user"></i> Artists</b-nav-item>
            <b-nav-item :active="selected == 'albums'" @click="selectAlbums"><i class="fa fa-compact-disc"></i> Albums</b-nav-item>
            <b-nav-item :active="selected == 'tracks'" @click="selectTracks"><i class="fa fa-music"></i> Tracks</b-nav-item>
          </b-nav>
        </b-col>
        <b-col sm="12" lg="5" offset-lg="3" md="6">
          <b-input-group>
            <b-input-group-prepend>
              <b-button variant="danger" @click="setIndex(0)"><i class="fa fa-angle-double-left"></i></b-button>
              <b-button variant="danger" @click="decrement"><i class="fa fa-angle-left"></i></b-button>
            </b-input-group-prepend>
            <b-form-input class="border-danger" type="date" @change="setWeek" :min="minDate" :max="maxDate" :value="currentDate"></b-form-input>
            <b-input-group-append>
              <b-btn variant="danger" @click="increment"><i class="fa fa-angle-right"></i></b-btn>
              <b-btn variant="danger" @click="setIndex(user.weeklyCharts.weeks.length - 1)"><i class="fa fa-angle-double-right"></i></b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-table :items="items" :fields="fields" class="mt-3" responsive="md" bordered small>
        <template slot="show_details" slot-scope="row">
          <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
          <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
          </b-button>
        </template>
        <template slot="row-details" slot-scope="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Age:</b></b-col>
              <b-col>asdsd</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
              <b-col>test</b-col>
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
import { User, fixedStartDate, Week } from '@/charts';
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';
import 'moment-timezone';

export default Vue.extend({
  name: 'ChartTable',
  props: {
    user: Object,
  },
  computed: {
    items(): any[] {
      if (typeof this.user.weeklyCharts.weeks[this.index] !== 'undefined') {
        return this.user.weeklyCharts.weeks[this.index][this.selected];
      }
      return [];
    },
    fields(): object[] {
      if (this.selected === 'artists') {
        return [
            {
              key: 'rank',
              label: '#',
              class: 'w-10',
            },
            {
              key: 'name',
              label: 'Artist',
              class: 'w-65',
            },
            {
              key: 'playcount',
              label: 'Plays',
              class: 'w-25',
            },
          ];
      } else {
        return [
            {
              key: 'rank',
              label: '#',
              class: 'w-10',
            },
            {
              key: 'name',
              label: 'Title',
              class: 'w-40',
            },
            {
              key: 'artist',
              class: 'w-25',
            },
            {
              key: 'playcount',
              label: 'Plays',
              class: 'w-25',
            },
          ];
      }
    },
    currentDate(): string {
      if (typeof this.user.weeklyCharts.weeks[this.index] !== 'undefined') {
        return moment(this.user.weeklyCharts.weeks[this.index].start).format('YYYY-MM-DD');
      }
      return '';
    },
    currentEndDate(): string {
      if (typeof this.user.weeklyCharts.weeks[this.index] !== 'undefined') {
        return moment(this.user.weeklyCharts.weeks[this.index].end).subtract(1, 'days').format('YYYY-MM-DD');
      }
      return '';
    },
    maxDate(): string {
      const l = this.user.weeklyCharts.weeks.length - 1;
      if (typeof this.user.weeklyCharts.weeks[l] !== 'undefined') {
        return moment(this.user.weeklyCharts.weeks[l].start).format('YYYY-MM-DD');
      }
      return '';
    },
    minDate(): string {
      if (typeof this.user.weeklyCharts.weeks[0] !== 'undefined') {
        return moment(this.user.weeklyCharts.weeks[0].start).format('YYYY-MM-DD');
      }
      return '';
    },
    totalWeeks(): number {
      return this.user.weeklyCharts.weeks.length;
    },
  },
  methods: {
    increment() {
      this.setIndex(this.index + 1);
    },
    decrement() {
      this.setIndex(this.index - 1);
    },
    setIndex(index: number) {
      if (index >= 0 && index < this.user.weeklyCharts.weeks.length) {
        this.index = index;
      }
    },
    setWeek(newValue: string) {
      const m = moment(newValue);
      m.tz(this.user.timezone);
      const date = fixedStartDate(m.toDate(), this.user.weeklyCharts.startDay);
      const found = this.user.weeklyCharts.weeks.findIndex((week: Week) => date >= week.start && date < week.end);
      this.setIndex(found);
    },
    selectArtists() {
      this.selected = 'artists';
    },
    selectAlbums() {
      this.selected = 'albums';
    },
    selectTracks() {
      this.selected = 'tracks';
    },
  },
  data() {
    return {
      index: this.user.weeklyCharts.weeks.length - 1,
      selected: 'artists',
    };
  },
  watch: {
    totalWeeks() {
      if (this.totalWeeks === 1) {
        this.setIndex(0);
      }
    },
  },
});
</script>

<style>
.nav-danger.nav-pills .nav-link.active {
  background-color: #dc3545;
}
.nav-danger a {
  color: #212529;
}
.w-10 {
    width: 10% !important;
}
.w-40 {
    width: 40% !important;
}
.w-65 {
    width: 65% !important;
}
</style>

