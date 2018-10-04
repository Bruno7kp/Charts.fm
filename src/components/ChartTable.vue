<template>
  <b-row>
    <b-col>
      <b-row>
        <b-col sm="12" md="6" lg="7" class="mt-3 text-center text-md-left">
          <div class="h3">{{ user.login }}</div>
        </b-col>
        <b-col sm="12" md="6" lg="5" class="mt-3 text-center">
          <div class="h5 text-capitalize" v-if="totalCharts > 0">{{ chartType + ' ' + (index + 1) }}</div>
          <div class="h6" v-if="totalCharts > 0">{{ currentDate + ' - ' + currentEndDate }}</div>
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
            <b-form-input class="border-danger" type="date" @change="setChart" :min="minDate" :max="maxDate" :value="currentDate"></b-form-input>
            <b-input-group-append>
              <b-btn variant="danger" @click="increment"><i class="fa fa-angle-right"></i></b-btn>
              <b-btn variant="danger" @click="setIndex(totalCharts - 1)"><i class="fa fa-angle-double-right"></i></b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-table :items="items" :fields="fields" class="mt-3" responsive="md" small>
        <template slot="show_details" slot-scope="row">
          <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
          <b-button size="sm" variant="outline-dark" @click.stop="row.toggleDetails" class="p-0 px-1">
            <i class="fa fa-chevron-up" v-if="row.detailsShowing"></i>
            <i class="fa fa-chevron-down" v-if="!row.detailsShowing"></i>
          </b-button>
        </template>
        <template slot="row-details" slot-scope="row">
          <b-card>
            <b-row class="mb-2">
              <b-col>{{ stats(row.index).getCurrentResume() }}</b-col>
            </b-row>
          </b-card>
        </template>
        <template slot="previous" slot-scope="row">
          {{ stats(row.index).getVariantion(false).rank }}
        </template>
        <template slot="table-caption">
          <h6>Lengend</h6>
          <b-row>
            <b-col>
              <b-row>
                <b-col><strong>CR</strong> Current Rank</b-col>
              </b-row>
              <b-row>
                <b-col><strong>PR</strong> Previous Rank</b-col>
              </b-row>
              <b-row>
                <b-col><strong>PK</strong> Peak Position</b-col>
              </b-row>
              
            </b-col>
            <b-col>
              <b-row>
                <b-col><strong>CP</strong> Current Playcount</b-col>
              </b-row>
              <b-row>
                <b-col><strong>PP</strong> Previous Playcount</b-col>
              </b-row>
              <b-row>
                <b-col class="text-capitalize"><strong>OC</strong> {{ chartType }}s On Chart</b-col>
              </b-row>
            </b-col>
          </b-row>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import * as _ from 'lodash';
import LastFm from '@/lastfm';
import { User, fixedStartDate, Stats } from '@/charts';
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';
import 'moment-timezone';
import { getUserChart, getUserChartList, getUserChartLength } from '@/charts/helpers';

let chartStats: any = {};

export default Vue.extend({
  name: 'ChartTable',
  props: {
    user: Object,
    loading: Boolean,
    chartType: String,
  },
  computed: {
    items(): any[] {
      if (typeof getUserChartList(this.user, this.chartType)[this.index] !== 'undefined') {
        return getUserChartList(this.user, this.chartType)[this.index][this.selected];
      }
      return [];
    },
    fields(): object[] {
      const fields = [];
      let i = 0;
      fields[i] = { key: 'rank', label: 'tw', class: 'w-10 text-center' };
      i++;
      fields[i] = { key: 'previous', label: 'pv', class: 'w-10 text-center' };
      i++;
      if (this.selected === 'artists') {
        fields[i] = { key: 'name', label: 'Artist', class: 'w-65' };
      } else {
        fields[i] = { key: 'name', label: 'Title', class: 'w-40' };
        i++;
        fields[i] = { key: 'artist', class: 'w-25' };
      }
      i++;
      fields[i] = { key: 'playcount', label: 'Plays', class: 'w-25 text-center' };
      i++;
      fields[i] = { key: 'show_details', label: '+', class: 'text-center' };
      return fields;
    },
    currentDate(): string {
      if (typeof getUserChartList(this.user, this.chartType)[this.index] !== 'undefined') {
        return moment(getUserChartList(this.user, this.chartType)[this.index].start).format('YYYY-MM-DD');
      }
      return '';
    },
    currentEndDate(): string {
      if (typeof getUserChartList(this.user, this.chartType)[this.index] !== 'undefined') {
        return moment(getUserChartList(this.user, this.chartType)[this.index].end).subtract(1, 'days').format('YYYY-MM-DD');
      }
      return '';
    },
    maxDate(): string {
      const l = getUserChartLength(this.user, this.chartType) - 1;
      if (typeof getUserChartList(this.user, this.chartType)[l] !== 'undefined') {
        return moment(getUserChartList(this.user, this.chartType)[l].start).format('YYYY-MM-DD');
      }
      return '';
    },
    minDate(): string {
      if (typeof getUserChartList(this.user, this.chartType)[0] !== 'undefined') {
        return moment(getUserChartList(this.user, this.chartType)[0].start).format('YYYY-MM-DD');
      }
      return '';
    },
    totalCharts(): number {
      return getUserChartLength(this.user, this.chartType);
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
      if (index >= 0 && index < getUserChartLength(this.user, this.chartType)) {
        this.index = index;
      }
    },
    setChart(newValue: string) {
      const m = moment(newValue);
      m.tz(this.user.timezone);
      const date = fixedStartDate(m.toDate(), getUserChart(this.user, this.chartType).startDay);
      const found = getUserChartList(this.user, this.chartType).findIndex((chart: any) => date >= chart.start && date < chart.end);
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
    getStats(type: string, name: string, artist: string|null = null): Stats {
      if (this.loading) {
        chartStats = [];
        return this.$store.getters.getStats(this.chartType, type, name, artist);
      }
      if (typeof chartStats[this.user.login] === 'undefined') {
        chartStats[this.user.login] = { artists: {}, albums: {}, tracks: {} };
      }
      if (type === 'artists') {
        if (typeof chartStats[this.user.login][type][name] === 'undefined') {
          chartStats[this.user.login][type][name] = this.$store.getters.getStats(this.chartType, type, name, artist);
        }
        return chartStats[this.user.login][type][name];
      } else {
        if (typeof chartStats[this.user.login][type][(artist as string)] === 'undefined') {
          chartStats[this.user.login][type][(artist as string)] = {};
        }
        if (typeof chartStats[this.user.login][type][(artist as string)][name] === 'undefined') {
          chartStats[this.user.login][type][(artist as string)][name] =
            this.$store.getters.getStats(this.chartType, type, name, artist);
        }
        return chartStats[this.user.login][type][(artist as string)][name];
      }
    },
    stats(i: number): any {
      return this.getStats(this.selected, this.items[i].name, this.items[i].artist).until(this.index);
    },
  },
  data() {
    return {
      index: getUserChartLength(this.user, this.chartType) - 1,
      selected: 'artists',
    };
  },
  watch: {
    totalCharts() {
      if (this.totalCharts === 1) {
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

