<template>
  <b-row>
    <b-col>
      <b-row>
        <b-col sm="12" md="6" lg="4">
          <b-nav pills fill class="nav-danger mb-2">
            <b-nav-item :active="selected == 'artists'" :to="{ name: 'weekly.artists', params: { week: index + 1 } }" @click="selectArtists"><font-awesome-icon data-html2canvas-ignore="true" icon="user" /> {{ $tc("word.artist", 2) }}</b-nav-item>
            <b-nav-item :active="selected == 'albums'" :to="{ name: 'weekly.albums', params: { week: index + 1 } }" @click="selectAlbums"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'compact-disc']" /> {{ $tc("word.album", 2) }}</b-nav-item>
            <b-nav-item :active="selected == 'tracks'" :to="{ name: 'weekly.tracks', params: { week: index + 1 } }" @click="selectTracks"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'music']" /> {{ $tc("word.track", 2) }}</b-nav-item>
          </b-nav>
        </b-col>
        <b-col sm="12" lg="5" offset-lg="3" md="6">
          <b-input-group>
            <b-input-group-prepend>
              <b-button variant="danger" :disabled="index === 0" @click="setIndex(0)" :to="{ name: 'weekly.' + type, params: { week: 1 } }">
                <font-awesome-icon :icon="['fa', 'angle-double-left']"/>
              </b-button>
              <b-button variant="danger" :disabled="index === 0" @click="decrement" :to="{ name: 'weekly.' + type, params: { week: index } }">
                <font-awesome-icon :icon="['fa', 'angle-left']"/>
              </b-button>
            </b-input-group-prepend>
            <b-form-input class="border-danger" type="date" @change="setChart" :min="minDate" :max="maxDate" :value="currentDate"></b-form-input>
            <b-input-group-append>
              <b-btn variant="danger" :disabled="index === totalCharts - 1" @click="increment" :to="{ name: 'weekly.' + type, params: { week: index + 2 } }">
                <font-awesome-icon :icon="['fa', 'angle-right']"/>
              </b-btn>
              <b-btn variant="danger" :disabled="index === totalCharts - 1" @click="setIndex(totalCharts - 1)" :to="{ name: 'weekly.' + type, params: { week: totalCharts } }">
                <font-awesome-icon :icon="['fa', 'angle-double-right']"/>
              </b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" class="text-center mb-2">
          <span class="h5">{{ user.login }}</span>
          <span v-if="totalCharts > 0"> | {{ $tc('word.' + chartType, 1) + ' ' + (index + 1) }}</span>
          <span v-if="totalCharts > 0"> ({{ currentDate + ' - ' + currentEndDate }})</span>
        </b-col>
      </b-row>
      <b-table 
        :items="items"
        :fields="fields"
        :class="'bg-' + theme + ' chart-table ' + (table.opts.indexOf('separateLine') >= 0 ? '': 'no-line')"
        responsive="lg"
        :dark="theme === 'dark'"
        :small="table.opts.indexOf('small') >= 0"
        :bordered="table.opts.indexOf('bordered') >= 0"
        :hover="true"
        :striped="table.opts.indexOf('striped') >= 0">
        <template #cell(show_details)="row">
          <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
          <b-button size="sm" :variant="theme === 'dark' ? 'outline-light border-0': 'outline-dark border-0'" @click.stop="row.toggleDetails" class="p-0 px-1">
            <font-awesome-icon :icon="['fa', 'chevron-up']" v-if="row.detailsShowing"/>
            <font-awesome-icon :icon="['fa', 'chevron-down']" v-if="!row.detailsShowing"/>
          </b-button>
        </template>
        <template #cell(name_artist)="row">
          <span class="d-block">{{ items[row.index].name }}</span>
          <span class="d-block sub">{{ items[row.index].artist }}</span>
        </template>
        <template v-slot:row-details="row">
          <b-card :bg-variant="theme === 'light' ? 'white' : 'dark'"
                  :text-variant="theme === 'light' ? 'dark' : 'white'">
            <b-row class="border rounded">
              <b-col cols="12" md="3" class="text-center border-right">
                <b-row>
                  <b-col cols="4" md="12" class="border-bottom py-2">
                    <h5 class="font-weight-bold">{{ resumes[row.index].current.rank }}</h5>
                    <small class="text-secondary text-uppercase">{{ $t("chart.current_rank") }}</small>
                  </b-col>
                  <b-col cols="4" md="12" class="border-bottom py-2">
                    <h5 class="font-weight-bold">{{ resumes[row.index].variation.previous.rank }}</h5>
                    <small class="text-secondary text-uppercase">{{ $t("chart.previous_rank") }}</small>
                  </b-col>
                  <b-col cols="4" md="12" class="border-bottom py-2">
                    <h5 class="font-weight-bold">{{ resumes[row.index].total }}</h5>
                    <small class="text-secondary text-uppercase">{{ $tc("word." + chartType, 2) }}</small>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="9" class="border-left border-on-info">
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
                    {{ $t("chart.peak") }}
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="4" md="3" lg="2" class="my-auto py-2 text-center font-weight-bold">
                    {{ resumes[row.index].debut.rank }}
                  </b-col>
                  <b-col class="my-auto">
                    {{ $t("chart.debut") }}
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="4" md="3" lg="2" class="my-auto py-2 text-center font-weight-bold">
                    {{ resumes[row.index].stats.points }}
                  </b-col>
                  <b-col class="my-auto">
                    {{ $t("chart.chart_points") }}
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="4" md="3" lg="2" class="my-auto py-2 text-center font-weight-bold">
                    {{ resumes[row.index].stats.playcount_sum }}
                  </b-col>
                  <b-col class="my-auto">
                    {{ $t("chart.total_playcount") }}
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
                      Chart-run: {{ runs.length }} {{ $tc('word.' + chartType, runs.length) }}
                      <small>({{ dateFormatter(runs[0].chart.start) + ' / ' + dateFormatter(runs[runs.length - 1].chart.end) }})</small>
                    </h6>
                    <hr class="m-1"/>
                    <b-button
                      v-for="(entry, key) in runs"
                      :key="k + 'b' + key + row.index"
                      :variant="entry.rank === resumes[row.index].stats.peak ? 'outline-primary' : (theme === 'dark' ? 'outline-secondary' : 'outline-dark')"
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
                      <template slot="title">{{ $tc('word.' + chartType, 1) + ' ' + entry.chart.index }}</template>
                      <b-row>
                        <b-col cols="12" class="border-bottom py-0">
                          <strong>#{{ entry.rank }}</strong> {{ $t("chart.rank") }}
                        </b-col>
                        <b-col cols="12" class="border-bottom py-0">
                          <strong>{{ entry.playcount }}</strong> {{ $t("chart.plays") }}
                        </b-col>
                        <b-col cols="12" class="pt-2">
                          <b-button variant="primary" size="sm" @click="setIndex(entry.chart.index, true)">{{ $t("chart.goto") }}</b-button>
                        </b-col>
                      </b-row>
                    </b-popover>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
        </template>
        <template #cell(on_chart)="row">
          {{ resumes[row.index].total }}
        </template>
        <template #cell(peak)="row">
          <span v-html="peakFormatter(resumes[row.index].stats.peak, resumes[row.index].stats.peak_times)"></span>
        </template>
        <template #cell(previous_rank)="row">
          <span v-if="resumes[row.index].variation[table.previous]" v-html="formatter(resumes[row.index].variation[table.previous].rank)"></span>
        </template>
        <template #cell(previous_playcount)="row">
          <span v-if="resumes[row.index].variation[table.previous]" v-html="formatter(resumes[row.index].variation[table.previous].playcount, '%')"></span>
        </template>
      </b-table>
      <!-- DROPOUTS TABLE -->
      <b-row v-if="table.opts.indexOf('dropouts') >= 0 && dropouts.length > 0">
        <b-col sm="12" class="text-center mb-2">
          <span class="h5">{{ $t('chart.dropout') }}</span>
        </b-col>
      </b-row>
      <b-table v-if="table.opts.indexOf('dropouts') >= 0 && dropouts.length > 0"
        :items="dropouts"
        :fields="dropoutsFields"
        :class="'bg-' + theme + ' chart-table ' + (table.opts.indexOf('separateLine') >= 0 ? '': 'no-line')"
        responsive="lg"
        :dark="theme === 'dark'"
        :small="table.opts.indexOf('small') >= 0"
        :bordered="table.opts.indexOf('bordered') >= 0"
        :hover="true"
        :striped="table.opts.indexOf('striped') >= 0">
        <template #cell(show_details)="row">
          <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
          <b-button size="sm" :variant="theme === 'dark' ? 'outline-light border-0': 'outline-dark border-0'" @click.stop="row.toggleDetails" class="p-0 px-1">
            <font-awesome-icon :icon="['fa', 'chevron-up']" v-if="row.detailsShowing"/>
            <font-awesome-icon :icon="['fa', 'chevron-down']" v-if="!row.detailsShowing"/>
          </b-button>
        </template>
        <template #cell(name_artist)="row">
          <span class="d-block">{{ dropouts[row.index].name }}</span>
          <span class="d-block sub">{{ dropouts[row.index].artist }}</span>
        </template>
        <template v-slot:row-details="row">
          <b-card :bg-variant="theme === 'light' ? 'white' : 'dark'"
                  :text-variant="theme === 'light' ? 'dark' : 'white'">
            <b-row class="border rounded">
              <b-col cols="12" md="3" class="text-center border-right">
                <b-row class="border-bottom py-2">
                  <b-col>
                    <small class="text-secondary text-uppercase">{{ $t("chart.current_rank") }}</small>
                    <h4 class="font-weight-bold pt-2">{{ $t("chart.out") }}</h4>
                  </b-col>
                </b-row>
                <b-row class="border-bottom py-2">
                  <b-col>
                    <small class="text-secondary text-uppercase">{{ $t("chart.previous_rank") }}</small>
                    <h5 class="font-weight-bold pt-2">{{ dropouts[row.index].rank }}</h5>
                  </b-col>
                </b-row>
                <b-row class="py-2">
                  <b-col>
                    <small class="text-secondary text-uppercase">{{ $tc("word." + chartType, 2) }}</small>
                    <h5 class="font-weight-bold pt-2">{{ dropoutsResumes[row.index].total }}</h5>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="9" class="border-left border-on-info">
                <b-row class="border-bottom">
                  <b-col>
                    <h4 class="font-weight-bold pt-1 text-center text-md-left">{{ dropouts[row.index].name }}</h4>
                  </b-col>
                </b-row>
                <b-row class="border-bottom" v-if="dropouts[row.index].artist">
                  <b-col>
                    <h4 class="font-weight-bold pt-1 text-center text-md-left">{{ dropouts[row.index].artist }}</h4>
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="4" md="3" lg="2" class="my-auto py-2 text-center font-weight-bold">
                    {{ dropoutsResumes[row.index].stats.peak }}
                  </b-col>
                  <b-col class="my-auto">
                    {{ $t("chart.peak") }}
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="4" md="3" lg="2" class="my-auto py-2 text-center font-weight-bold">
                    {{ dropoutsResumes[row.index].debut.rank }}
                  </b-col>
                  <b-col class="my-auto">
                    {{ $t("chart.debut") }}
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="4" md="3" lg="2" class="my-auto py-2 text-center font-weight-bold">
                    {{ dropoutsResumes[row.index].stats.points }}
                  </b-col>
                  <b-col class="my-auto">
                    {{ $t("chart.chart_points") }}
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="4" md="3" lg="2" class="my-auto py-2 text-center font-weight-bold">
                    {{ dropoutsResumes[row.index].stats.playcount_sum }}
                  </b-col>
                  <b-col class="my-auto">
                    {{ $t("chart.total_playcount") }}
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="border rounded mt-3">
              <b-col>
                <b-row>
                  <b-col cols="12" class="border-bottom pb-2"
                         v-for="(runs, k) in dropoutsResumes[row.index].stats.run" :key="k">
                    <h6 class="mt-2">
                      Chart-run: {{ runs.length }} {{ $tc('word.' + chartType, runs.length) }}
                      <small>({{ dateFormatter(runs[0].chart.start) + ' / ' + dateFormatter(runs[runs.length - 1].chart.end) }})</small>
                    </h6>
                    <hr class="m-1"/>
                    <b-button
                        v-for="(entry, key) in runs"
                        :key="k + 'b' + key + row.index"
                        :variant="entry.rank === dropoutsResumes[row.index].stats.peak ? 'outline-primary' : (theme === 'dark' ? 'outline-secondary' : 'outline-dark')"
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
                      <template slot="title">{{ $tc('word.' + chartType, 1) + ' ' + entry.chart.index }}</template>
                      <b-row>
                        <b-col cols="12" class="border-bottom py-0">
                          <strong>#{{ entry.rank }}</strong> {{ $t("chart.rank") }}
                        </b-col>
                        <b-col cols="12" class="border-bottom py-0">
                          <strong>{{ entry.playcount }}</strong> {{ $t("chart.plays") }}
                        </b-col>
                        <b-col cols="12" class="pt-2">
                          <b-button variant="primary" size="sm" @click="setIndex(entry.chart.index, true)">{{ $t("chart.goto") }}</b-button>
                        </b-col>
                      </b-row>
                    </b-popover>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
        </template>
        <template #cell(on_chart)="row">
          {{ dropoutsResumes[row.index].total }}
        </template>
        <template #cell(peak)="row">
          <span v-html="peakFormatter(dropoutsResumes[row.index].stats.peak, dropoutsResumes[row.index].stats.peak_times)"></span>
        </template>
      </b-table>
      <b-row>
        <b-col class="small-legend text-md-right">
          <span><strong>{{ $t("chart.abbr.cr") }}</strong> {{ $t("chart.current_rank") }}</span>
          <span v-if="table.opts.indexOf('previousRank') >= 0"> | <strong>{{ $t("chart.abbr.pr") }}</strong> {{ $t("chart.previous_rank") }}</span>
          <span v-if="table.opts.indexOf('peak') >= 0"> | <strong>{{ $t("chart.abbr.pk") }}</strong> {{ $t("chart.peak") }}</span>
          <span> | <strong>{{ $t("chart.abbr.cp") }}</strong> {{ $t("chart.current_playcount") }}</span>
          <span v-if="table.opts.indexOf('previousPlaycount') >= 0"> | <strong>{{ $t("chart.abbr.pp") }}</strong> {{ $t("chart.previous_playcount") }}</span>
          <span v-if="table.opts.indexOf('onChart') >= 0"> | <strong>{{ $t("chart.abbr.to") }}</strong> {{ $t("chart.total_" + chartType) }}</span>
          <br/>
          <span><strong>{{ $t("chart.abbr.re") }}</strong> {{ $t("chart.re_entry") }} | </span>
          <span><strong>{{ $t("chart.abbr.ne") }}</strong> {{ $t("chart.new_entry") }} | </span>
          <span><strong>=</strong> {{ $t("chart.no_variation") }}</span>
          <br/>
          <UntieModal :user="user" :id="index" :chart="chartType" :type="selected"></UntieModal>
        </b-col>
      </b-row>
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
import {getUserChart, getUserChartList, getUserChartLength, getDropouts} from '@/charts/helpers';
import UntieModal from "@/components/UntieModal.vue";

let chartStats: any = {};

export default Vue.extend({
  name: 'ChartTable',
  props: {
    user: Object,
    loading: Boolean,
    chartType: String,
    theme: String,
    type: String,
  },
  components: {
    UntieModal,
  },
  computed: {
    items(): any[] {
      if (typeof getUserChartList(this.user, this.chartType)[this.index] !== 'undefined') {
        return getUserChartList(this.user, this.chartType)[this.index][this.selected];
      }
      return [];
    },
    dropouts(): any[] {
      if (this.table.opts.indexOf('dropouts') >= 0 && typeof getUserChartList(this.user, this.chartType)[this.index - 1] !== 'undefined') {
        let previous =  getUserChartList(this.user, this.chartType)[this.index - 1][this.selected];
        let current = getUserChartList(this.user, this.chartType)[this.index][this.selected];
        return getDropouts(this.chartType, this.selected, previous, current);
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
    dropoutsResumes(): any[] {
      const dropoutsResumes: any = [];
      if (this.table.opts.indexOf('dropouts') >= 0) {
        for (let i = 0; i < this.dropouts.length; i++) {
          dropoutsResumes[i] = this.dropoutsStats(i).getCurrentResume();
        }
      }
      return dropoutsResumes;
    },
    fields(): object[] {
      const fields = [];
      let i = 0;
      fields[i] = { key: 'rank', label: this.$t('chart.abbr.cr'), class: 'text-center' };
      i++;
      if (this.table.opts.indexOf('previousRank') >= 0) {
        fields[i] = { key: 'previous_rank', label: this.$t('chart.abbr.pr'), class: 'text-center' };
        i++;
      }
      if (this.table.opts.indexOf('peak') >= 0) {
        fields[i] = { key: 'peak', label: this.$t('chart.abbr.pk'), class: 'text-center px-0' };
        i++;
      }
      if (this.table.opts.indexOf('onChart') >= 0) {
        fields[i] = { key: 'on_chart', label: this.$t('chart.abbr.to'), class: 'text-center' };
        i++;
      }
      if (this.selected === 'artists') {
        fields[i] = { key: 'name', label: this.$tc('word.artist', 1), class: 'w-65 title' };
      } else {
        if (this.table.opts.indexOf('separateArtist') >= 0) {
          fields[i] = { key: 'name', label: this.$t('word.title'), class: 'w-40 title min-' + this.selected };
          i++;
          fields[i] = { key: 'artist', label: this.$tc('word.artist'), class: 'w-25 min-artists' };
        } else {
          fields[i] = { key: 'name_artist', label: this.$t('word.title_artist'),
          class: 'w-65 title title-both min-artists' };
        }
      }
      i++;
      fields[i] = { key: 'playcount', label: this.$t('chart.abbr.cp'), class: 'text-center' };
      i++;
      if (this.table.opts.indexOf('previousPlaycount') >= 0) {
        fields[i] = { key: 'previous_playcount', label: this.$t('chart.abbr.pp'), class: 'text-center' };
        i++;
      }
      fields[i] = { key: 'show_details', label: '', class: 'text-center' };
      return fields;
    },
    dropoutsFields(): object[] {
      const fields = [];
      let i = 0;
      fields[i] = { key: 'rank', label: this.$t('chart.abbr.pr'), class: 'text-center' };
      i++;
      if (this.table.opts.indexOf('peak') >= 0) {
        fields[i] = { key: 'peak', label: this.$t('chart.abbr.pk'), class: 'text-center px-0' };
        i++;
      }
      if (this.table.opts.indexOf('onChart') >= 0) {
        fields[i] = { key: 'on_chart', label: this.$t('chart.abbr.to'), class: 'text-center' };
        i++;
      }
      if (this.selected === 'artists') {
        fields[i] = { key: 'name', label: this.$tc('word.artist', 1), class: 'w-65 title' };
      } else {
        if (this.table.opts.indexOf('separateArtist') >= 0) {
          fields[i] = { key: 'name', label: this.$t('word.title'), class: 'w-40 title min-' + this.selected };
          i++;
          fields[i] = { key: 'artist', label: this.$tc('word.artist'), class: 'w-25 min-artists' };
        } else {
          fields[i] = { key: 'name_artist', label: this.$t('word.title_artist'),
            class: 'w-65 title title-both min-artists' };
        }
      }
      i++;
      fields[i] = { key: 'playcount', label: this.$t('chart.abbr.pp'), class: 'text-center' };
      i++;
      fields[i] = { key: 'show_details', label: '', class: 'text-center' };
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
  },
  methods: {
    increment() {
      this.setIndex(this.index + 1);
    },
    decrement() {
      this.setIndex(this.index - 1);
    },
    setIndex(index: number, scroll: boolean = false) {
      if (index >= 0 && index < getUserChartLength(this.user, this.chartType)) {
        this.index = index;
        if (scroll) {
          // @ts-ignore
          this.$scrollTo('#chart');
        }
      }
    },
    setChart(newValue: string) {
      const m = moment(newValue);
      m.tz(this.user.timezone);
      const date = fixedStartDate(m.toDate(), getUserChart(this.user, this.chartType).startDay);
      const found = getUserChartList(this.user, this.chartType)
          .findIndex((chart: any) => date >= chart.start && date < chart.end);
      this.setIndex(found);
      this.$router.push({ name: 'weekly.' + this.type, params: { week: found + 1 } });
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
    dropoutsStats(i: number): any {
      return this.getStats(this.selected, this.dropouts[i].name, this.dropouts[i].artist).until(this.index);
    },
    formatter(value: number|string, suffix: string = ''): any {
      const prefix = this.table.opts.indexOf('colored') >= 0 ? 'text-' : '';
      if (value === 0) {
        return '=';
      } else if (value === 'RE') {
        return '<span class="' + prefix + 'warning">' + this.$t('chart.abbr.re') + '</span>';
      } else if (value === 'NEW') {
        return '<span class="' + prefix + 'primary">' + this.$t('chart.abbr.ne') + '</span>';
      } else {
        if (this.table.previous !== 'previous') {
          suffix = this.table.previous === 'percent' ? suffix : '';
          if (Number(value) > 0) {
            return '<span class="' + prefix + 'success">+' + value + suffix + '</span>';
          } else {
            return '<span class="' + prefix + 'danger">' + value + suffix + '</span>';
          }
        }
      }
      return value;
    },
    peakFormatter(value: number, times: number): any {
      const prefix = this.table.opts.indexOf('colored') >= 0 ? 'text-' : '';
      const suffix = this.table.opts.indexOf('times') >= 0 ? ' <small class="text-secondary">' + times +
        'x</small>' : '';
      if (value === 1) {
        return '<span class="' + prefix + 'primary">' + value + suffix + '</span>';
      }
      return value;
    },
    dateFormatter(value: string): string {
      return moment(value).format('YYYY-MM-DD');
    },
  },
  data() {
    const week = this.$route.params.week ? parseInt(this.$route.params.week, 10) : 0;
    const di = getUserChartLength(this.user, this.chartType) - 1;
    return {
      index: week > 0 && week <= di ? week - 1 : di,
      selected: this.type,
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
          duration: 20000,
          title: this.$t('messages.first_week') + '',
          text: this.$t('messages.first_week_sub') + '',
        });
      }
    },
    user() {
      const week = this.$route.params.week ? parseInt(this.$route.params.week, 10) : 0;
      const di = getUserChartLength(this.user, this.chartType) - 1;
      this.index = week > 0 && week <= di ? week - 1 : di;
    },
  },
});
</script>
