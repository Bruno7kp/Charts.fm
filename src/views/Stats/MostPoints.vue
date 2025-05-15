<template>
  <div>
    <b-container>
      <b-row v-if="user.weeklyCharts?.weeks?.length">
        <b-col class="px-0 px-sm-3">
          <b-card class="mb-4 mt-3 shadow border-0"
                  :bg-variant="theme === 'light' ? 'white' : 'dark'"
                  :text-variant="theme === 'light' ? 'dark' : 'white'"
                  id="chart">
            <b-card-title>
              {{ $t('stats.points.title') }}
            </b-card-title>
            <b-card-body>
              <b-row>
                <b-col order-sm="1" order-md="1" sm="12" md="4" lg="3">
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-btn href="#" variant="danger">
                        {{ $tc('word.year', 1) }}:
                      </b-btn>
                    </b-input-group-prepend>
                    <b-select v-model="year" name="year" :options="years" required></b-select>
                  </b-input-group>
                </b-col>
                <b-col order-sm="3" order-md="2" sm="12" md="8" lg="9" class="text-right">
                  <b-button-group class="d-sm-flex d-md-block">
                    <b-button variant="danger" :disabled="tp === 'artists'" :to="{ name: 'weekly.stats.points', params: { type: 'artists' } }" @click="loadCharts"><font-awesome-icon data-html2canvas-ignore="true" icon="user" /> {{ $tc("word.artist", 2) }}</b-button>
                    <b-button variant="danger" :disabled="tp === 'albums'" :to="{ name: 'weekly.stats.points', params: { type: 'albums' } }" @click="loadCharts"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'compact-disc']" /> {{ $tc("word.album", 2) }}</b-button>
                    <b-button variant="danger" :disabled="tp === 'tracks'" :to="{ name: 'weekly.stats.points', params: { type: 'tracks' } }" @click="loadCharts"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'music']" /> {{ $tc("word.track", 2) }}</b-button>
                  </b-button-group>
                </b-col>
              </b-row>
              <b-table
                  :fields="fields"
                  :items="items"
                  :class="'bg-' + theme + ' chart-table mt-4'"
                  responsive="lg"
                  :dark="theme === 'dark'"
                  :striped="true"
                  :small="true">
                <template #cell(ranking)="row">
                  <span class="d-block">{{ row.index + 1 }}</span>
                </template>
                <template #cell(name_artist)="row">
                  <span class="d-block">{{ items[row.index].name }}</span>
                  <span class="d-block sub">{{ items[row.index].artist }}</span>
                </template>
              </b-table>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col>
          <b-card class="mb-4 mt-3 shadow border-0"
                  :bg-variant="theme === 'light' ? 'white' : 'dark'"
                  :text-variant="theme === 'light' ? 'dark' : 'white'"
                  id="chart">
            <b-card-body>{{ $t("messages.require_update") }}</b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import {Vue} from 'vue-property-decorator';
import { getTopByPoints, getUserChartList} from "@/charts/helpers";

export default Vue.extend({
  name: 'MostPlays',
  data() {
    const year = moment().format('YYYY');
    return {
      limit: 1,
      year: this.$t('word.all_time') + '',
      startYear: year,
      endYear: year,
      items: [] as any[],
      peaks: {} as Record<string, Record<string, any>>,
      tp: '',
    };
  },
  computed: {
    user: {
      get(): any {
        return this.$store.getters.getDefaultUser;
      },
      set(newValue: string) {
        this.$store.dispatch('setCurrentUser', newValue);
      },
    },
    startDate(): string {
      return moment(this.$store.getters.getDefaultUser.weeklyCharts.startDate).format('YYYY-MM-DD');
    },
    cardOpen(): { settingsWeek: boolean, updateWeek: boolean, settingsTable: boolean } {
      return this.$store.getters.getCardOpen;
    },
    theme(): string {
      return this.$store.getters.getTheme;
    },
    fields() {
      return [
        { key: 'ranking', label: '#', class: 'text-center w-5' },
        { key: 'name_artist', label: this.$tc('word.title', 1), class: 'title w-75' },
        { key: 'weeks', label: this.$tc('word.week', 2), class: 'text-center w-15' },
        { key: 'points', label: this.$t('chart.chart_points'), class: 'text-center w-25' },
      ];
    },
    years() {
      const years = [this.$t('word.all_time')];
      for (let i = parseInt(this.endYear, 10); i >= parseInt(this.startYear, 10); i--) {
        years.push(i.toString());
      }
      return years;
    },
  },
  watch: {
    rank(newValue: number) {
      this.loadCharts();
    },
    year(newValue: number) {
      this.loadCharts();
    },
  },
  methods: {
    loadCharts() {
      const weeks = getUserChartList(this.user, 'week');
      this.limit = weeks && weeks[0].limit ? weeks[0].limit : 1;
      this.startYear = weeks && weeks[0].start ? moment(weeks[0].start).format('YYYY') : this.endYear;

      if (weeks.length > 0) {
        const type = this.$route.params.type || 'artists';
        this.tp = type;
        this.items = getTopByPoints(weeks, type, this.year);
      }
    },
  },
  mounted() {
    this.loadCharts();
  },
});
</script>
<style>
.smaller {
  font-size: 0.8rem;
}
</style>
