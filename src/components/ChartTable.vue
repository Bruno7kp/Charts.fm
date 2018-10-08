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
            <b-nav-item :active="selected == 'artists'" @click="selectArtists"><font-awesome-icon icon="user" /> Artists</b-nav-item>
            <b-nav-item :active="selected == 'albums'" @click="selectAlbums"><font-awesome-icon :icon="['fa', 'compact-disc']" /> Albums</b-nav-item>
            <b-nav-item :active="selected == 'tracks'" @click="selectTracks"><font-awesome-icon :icon="['fa', 'music']" /> Tracks</b-nav-item>
          </b-nav>
        </b-col>
        <b-col sm="12" lg="5" offset-lg="3" md="6">
          <b-input-group>
            <b-input-group-prepend>
              <b-button variant="danger" @click="setIndex(0)"><font-awesome-icon :icon="['fa', 'angle-double-left']" /></b-button>
              <b-button variant="danger" @click="decrement"><font-awesome-icon :icon="['fa', 'angle-left']" /></b-button>
            </b-input-group-prepend>
            <b-form-input class="border-danger" type="date" @change="setChart" :min="minDate" :max="maxDate" :value="currentDate"></b-form-input>
            <b-input-group-append>
              <b-btn variant="danger" @click="increment"><font-awesome-icon :icon="['fa', 'angle-right']" /></b-btn>
              <b-btn variant="danger" @click="setIndex(totalCharts - 1)"><font-awesome-icon :icon="['fa', 'angle-double-right']" /></b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-table 
        :items="items"
        :fields="fields"
        class="mt-3"
        responsive="lg"
        :small="this.table.small.length > 0"
        :bordered="this.table.bordered.length > 0"
        :hover="this.table.hover.length > 0"
        :striped="this.table.striped.length > 0">
        <template slot="show_details" slot-scope="row">
          <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
          <b-button size="sm" variant="outline-dark" @click.stop="row.toggleDetails" class="p-0 px-1">
            <font-awesome-icon :icon="['fa', 'chevron-up']" v-if="row.detailsShowing"/>
            <font-awesome-icon :icon="['fa', 'chevron-down']" v-if="!row.detailsShowing"/>
          </b-button>
        </template>
        <template slot="image" slot-scope="row">
          <Promised :promise="getImage(row.index)">
            <b-img blank :width="35" :height="35" blank-color="#ddd" class="w-cover" />
            <span slot-scope="data">
              <b-img center class="w-cover" :src="data" />
            </span>
            <span slot="catch" slot-scope="error">
              <b-img blank :width="35" :height="35" blank-color="#ddd" class="w-cover" />
            </span>
          </Promised>
        </template>
        <template slot="name_artist" slot-scope="row">
          <span class="d-block">{{ items[row.index].name }}</span> 
          <span class="d-block sub">{{ items[row.index].artist }}</span>
        </template>
        <template slot="row-details" slot-scope="row">
          <b-card>
            <b-row class="border rounded">
              <b-col cols="6" md="3" class="text-center border-right">
                <b-row class="border-bottom py-2">
                  <b-col>
                    <small class="text-secondary">CURRENT RANK</small>
                    <h4 class="font-weight-bold pt-2">{{ resumes[row.index].current.rank }}</h4>
                  </b-col>
                </b-row>
                <b-row class="border-bottom py-2">
                  <b-col>
                    <small class="text-secondary">PREVIOUS RANK</small>
                    <h5 class="font-weight-bold pt-2">{{ resumes[row.index].variation.previous.rank }}</h5>
                  </b-col>
                </b-row>
                <b-row class="py-2">
                  <b-col>
                    <small class="text-secondary text-uppercase">{{ chartType }}s</small>
                    <h5 class="font-weight-bold pt-2">{{ resumes[row.index].total }}</h5>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="6" md="3" class="my-auto">
                <Promised :promise="getImage(row.index)">
                  <b-img blank :width="200" :height="200" blank-color="#ddd" class="w-cover" />
                  <span slot-scope="data">
                    <b-img center fluid :src="data" />
                  </span>
                  <span slot="catch" slot-scope="error">
                    <b-img blank :width="200" :height="200" blank-color="#ddd" class="w-cover" />
                  </span>
                </Promised>
              </b-col>
              <b-col cols="12" md="6" class="border-left border-on-info">
                <b-row class="border-bottom">
                  <b-col>
                    <h4 class="font-weight-bold pt-1 text-center text-md-left">{{ items[row.index].name }}</h4>
                  </b-col>
                </b-row>
                <b-row class="border-bottom" v-if="items[row.index].artist">
                  <b-col>
                    <h4 class="font-weight-bold pt-1 text-center text-md-left">{{ items[row.index].artist }}</h4>
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="4" md="3" lg="2" class="my-auto py-2 text-center font-weight-bold">
                    {{ resumes[row.index].stats.peak }}
                  </b-col>
                  <b-col class="my-auto">
                    Peak
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="4" md="3" lg="2" class="my-auto py-2 text-center font-weight-bold">
                    {{ resumes[row.index].debut.rank }}
                  </b-col>
                  <b-col class="my-auto">
                    Debut
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="4" md="3" lg="2" class="my-auto py-2 text-center font-weight-bold">
                    {{ resumes[row.index].stats.points }}
                  </b-col>
                  <b-col class="my-auto">
                    Chart Points
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="4" md="3" lg="2" class="my-auto py-2 text-center font-weight-bold">
                    {{ resumes[row.index].stats.playcount_sum }}
                  </b-col>
                  <b-col class="my-auto">
                    Total Playcount (while on the chart)
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="border rounded mt-3">
              <b-col>
                <b-row>
                  <b-col cols="12" class="border-bottom pb-2" 
                    v-for="(runs, k) in resumes[row.index].stats.run" :key="k">
                    <h6 class="mt-2">
                      Chart-run: {{ runs.length }} {{ chartType }}s
                      <small>({{ dateFormatter(runs[0].chart.start) + ' / ' + dateFormatter(runs[runs.length - 1].chart.end) }})</small>
                    </h6>
                    <hr class="m-1"/>
                    <b-button
                      v-for="(entry, key) in runs"
                      :key="k + 'b' + key + row.index" 
                      :variant="entry.rank === resumes[row.index].stats.peak ? 'outline-primary' : 'outline-dark'" 
                      class="rounded-0 m-1 p-0 b-run"
                      :id="k + 'i' + key + row.index">
                      {{ entry.rank }}
                    </b-button>
                    <b-popover
                      v-for="(entry, key) in runs"
                      :key="k + 'p' + key + row.index" 
                      :target="k + 'i' + key + row.index"
                      placement="top"
                      triggers="focus">
                      <template slot="title">{{ chartType + ' ' + entry.chart.index }}</template>
                      <b-row>
                        <b-col cols="12" class="border-bottom py-0">
                          <strong>#{{ entry.rank }}</strong> rank
                        </b-col>
                        <b-col cols="12" class="border-bottom py-0">
                          <strong>{{ entry.playcount }}</strong> plays
                        </b-col>
                        <b-col cols="12" class="pt-2">
                          <b-button variant="primary" size="sm" @click="setIndex(entry.chart.index)">Go to chart</b-button>
                        </b-col>
                      </b-row>
                    </b-popover>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
        </template>
        <template slot="on_chart" slot-scope="row">
          {{ resumes[row.index].total }}
        </template>
        <span slot="peak" 
              slot-scope="row" 
              v-html="peakFormatter(resumes[row.index].stats.peak, resumes[row.index].stats.peak_times)"></span>
        <span slot="previous_rank" 
              slot-scope="row" 
              v-html="formatter(resumes[row.index].variation[table.previous].rank)"></span>
        <span slot="previous_playcount" 
              slot-scope="row" 
              v-html="formatter(resumes[row.index].variation[table.previous].playcount, '%')"></span>
        <template slot="table-caption">
          <h6>Legend</h6>
          <b-row>
            <b-col sm="12" md="4">
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
            <b-col sm="12" md="4">
              <b-row>
                <b-col><strong>CP</strong> Current Playcount</b-col>
              </b-row>
              <b-row>
                <b-col><strong>PP</strong> Previous Playcount</b-col>
              </b-row>
              <b-row>
                <b-col class="text-capitalize"><strong>{{ 'T' + chartType.charAt(0).toUpperCase() }}</strong> Total {{ chartType }}s On Chart</b-col>
              </b-row>
            </b-col>
            <b-col sm="12" md="4">
              <b-row>
                <b-col><strong>RE</strong> Re-Entry</b-col>
              </b-row>
              <b-row>
                <b-col><strong>NE</strong> New Entry</b-col>
              </b-row>
              <b-row>
                <b-col><strong>=</strong> No Variation</b-col>
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
    resumes(): any[] {
      const resumes: any = [];
      for (let i = 0; i < this.items.length; i++) {
        resumes[i] = this.stats(i).getCurrentResume();
      }
      return resumes;
    },
    fields(): object[] {
      const fields = [];
      let i = 0;
      fields[i] = { key: 'rank', label: 'CR', class: 'text-center' };
      i++;
      if (this.table.previousRank.length > 0) {
        fields[i] = { key: 'previous_rank', label: 'PR', class: 'text-center' };
        i++;
      }
      if (this.table.peak.length > 0) {
        fields[i] = { key: 'peak', label: 'PK', class: 'text-center px-0' };
        i++;
      }
      if (this.table.onChart.length > 0) {
        fields[i] = { key: 'on_chart', label: 'T' + this.chartType.charAt(0).toUpperCase(), class: 'text-center' };
        i++;
      }
      if (this.table.images.length > 0) {
        fields[i] = { key: 'image', label: '', class: 'text-center p-0' };
        i++;
      }
      if (this.selected === 'artists') {
        fields[i] = { key: 'name', label: 'Artist', class: 'w-65 title' };
      } else {
        if (this.table.separateArtist.length > 0) {
          fields[i] = { key: 'name', label: 'Title', class: 'w-40 title min-' + this.selected };
          i++;
          fields[i] = { key: 'artist', class: 'w-25 min-artists' };
        } else {
          fields[i] = { key: 'name_artist', label: 'Title, Artist', class: 'w-65 title title-both min-artists' };
        }
      }
      i++;
      fields[i] = { key: 'playcount', label: 'CP', class: 'text-center' };
      i++;
      if (this.table.previousPlaycount.length > 0) {
        fields[i] = { key: 'previous_playcount', label: 'PP', class: 'text-center' };
        i++;
      }
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
        return moment(getUserChartList(this.user, this.chartType)[this.index].end)
          .subtract(1, 'days').format('YYYY-MM-DD');
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
    table(): any {
      return this.$store.getters.getTable;
    },
    images: {
      get(): any {
        return this.$store.getters.getImages;
      },
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
        // @ts-ignore
        this.$scrollTo('#chart');
      }
    },
    setChart(newValue: string) {
      const m = moment(newValue);
      m.tz(this.user.timezone);
      const date = fixedStartDate(m.toDate(), getUserChart(this.user, this.chartType).startDay);
      const found = getUserChartList(this.user, this.chartType)
        .findIndex((chart: any) => date >= chart.start && date < chart.end);
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
    formatter(value: number|string, suffix: string = ''): any {
      const prefix = this.table.colored.length > 0 ? 'text-' : '';
      if (value === 0) {
        return '=';
      } else if (value === 'RE') {
        return '<span class="' + prefix + 'warning">RE</span>';
      } else if (value === 'NEW') {
        return '<span class="' + prefix + 'primary">NE</span>';
      } else {
        if (this.table.previous !== 'previous') {
          suffix = this.table.previous === 'percent' ? suffix : '';
          if (value > 0) {
            return '<span class="' + prefix + 'success">+' + value + suffix + '</span>';
          } else {
            return '<span class="' + prefix + 'danger">' + value + suffix + '</span>';
          }
        }
      }
      return value;
    },
    peakFormatter(value: number, times: number): any {
      const prefix = this.table.colored.length > 0 ? 'text-' : '';
      const suffix = this.table.times.length > 0 ? ' <small class="text-secondary">' + times + 'x</small>' : '';
      if (value === 1) {
        return '<span class="' + prefix + 'primary">' + value + suffix + '</span>';
      }
      return value;
    },
    dateFormatter(value: string): string {
      return moment(value).format('YYYY-MM-DD');
    },
    loadImage(index: number) {
      return new Promise ((resolve) => {
        let name = this.items[index].name;
        const artist = this.items[index].artist;
        if (this.selected === 'artists' || this.selected === 'tracks') {
          name = this.selected === 'tracks' ? artist : name;
          if (!this.images.artists.hasOwnProperty(name)) {
            LastFm.artist().getImage(name).then((image: any) => {
              (this.images.artists as any)[name] = image;
              this.$store.dispatch('setImages', this.images);
              resolve(image);
            });
          } else {
            resolve((this.images.artists as any)[name]);
          }
        } else if (this.selected === 'albums') {
          const id = artist + name;
          if (!this.images.albums.hasOwnProperty(id)) {
            LastFm.album().getImage(name, artist).then((image: any) => {
              (this.images.albums as any)[id] = image;
              this.$store.dispatch('setImages', this.images); // save
              resolve(image);
            });
          } else {
            resolve((this.images.albums as any)[id]);
          }
        }
      });
    },
    getImage(index: number) {
      const a = this.items[index].artist;
      const n = this.items[index].name;
      const c = this.selected === 'albums' ? 'albums' : 'artists';
      const id = (c === 'albums') ? a + n : (this.selected === 'artists') ? n : a;
      return new Promise((solve) => {
        if (this.images[c].hasOwnProperty(id)) {
          solve((this.images as any)[c][id]);
        } else {
          setTimeout(() => {
            this.loadImage(index).then((image) => {
              solve(image);
            });
          }, 1000 + index * 100);
        }
      });
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
        // @ts-ignore
        this.$scrollTo('#chart');
        this.$notify({
          group: 'app',
          type: 'success',
          duration: 10000,
          title: 'First chart done!',
          text: 'Now you can browse your charts while the rest is loading.',
        });
      }
    },
    user() {
      this.index = getUserChartLength(this.user, this.chartType) - 1;
    },
  },
});
</script>

<style>
/* Selector */
.nav-danger.nav-pills .nav-link.active {
  background-color: #dc3545;
}
.nav-danger a {
  color: #212529;
}
/* Columns Helpers */
.w-10 {
  width: 10% !important;
}
.w-40 {
  width: 40% !important;
}
.w-65 {
  width: 65% !important;
}
/* Images */
td img.w-cover {
  width: 65px;
  height: 65px;
  background-color: #ddd;
}
.table-sm td img.w-cover {
  width: 35px;
  height: 35px;
}

small.text-secondary {
  font-size: 70%;
}
.table th, .table td {
  vertical-align: middle;
}
table td {
  line-height: 1;
  font-size: 1.25rem;
}
table td.title-both {
  line-height: 1.4;
  padding-top: 0px;
  padding-bottom: 0px;
}
.table-sm td.title-both {
  line-height: 1.1;
}
.table-sm td {
  font-size: 1rem;
}
@media (max-width: 767px) { 
  .border-on-info {
    border-left: 0 !important;
    border-top: 1px solid #dee2e6;
  }
}
.min-albums {
  min-width: 250px;
}
.min-tracks {
  min-width: 200px;
}
.min-artists {
  min-width: 200px;
}
td.title {
  font-weight: 500;
  font-size: 1.1rem;
}
.table-sm td.title {
  font-size: 1rem;
}
td.title .sub {
  font-weight: 400;
}
td:first-child {
  font-weight: 500;
}
.b-run {
  width: 2.2em;
  height: 2.2em;
  font-size: 0.9rem;
}
.popover-header {
  text-transform: capitalize;
}
.popover {
  max-width: 115px;
}
.popover-body {
  padding-top: 0;
}
</style>
