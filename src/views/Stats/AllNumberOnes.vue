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
              {{ $tc('stats.number_xs', rank, { number: rank }) }}
            </b-card-title>
            <b-card-body>
              <b-row>
                <b-col sm="12" md="4" lg="3">
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-btn href="#" variant="danger">
                        {{ $t('chart.rank') }}:
                      </b-btn>
                    </b-input-group-prepend>
                    <b-select v-model="rank" name="rank" :options="rankings" required></b-select>
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-btn href="#" variant="danger">
                        {{ $tc('word.year', 1) }}:
                      </b-btn>
                    </b-input-group-prepend>
                    <b-select v-model="year" name="year" :options="years" required></b-select>
                  </b-input-group>
                </b-col>
                <b-col sm="12" md="8" lg="9" class="text-right">
                  <b-button-group>
                    <b-button variant="danger" :disabled="tp === 'artists'" :to="{ name: 'weekly.stats.number_ones', params: { type: 'artists' } }" @click="loadCharts"><font-awesome-icon data-html2canvas-ignore="true" icon="user" /> {{ $tc("word.artist", 2) }}</b-button>
                    <b-button variant="danger" :disabled="tp === 'albums'" :to="{ name: 'weekly.stats.number_ones', params: { type: 'albums' } }" @click="loadCharts"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'compact-disc']" /> {{ $tc("word.album", 2) }}</b-button>
                    <b-button variant="danger" :disabled="tp === 'tracks'" :to="{ name: 'weekly.stats.number_ones', params: { type: 'tracks' } }" @click="loadCharts"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'music']" /> {{ $tc("word.track", 2) }}</b-button>
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
                <template #cell(name_artist)="row">
                  <span class="d-block">{{ items[row.index].name }}</span>
                  <span class="d-block sub">{{ items[row.index].artist }}</span>
                </template>
                <template #cell(times)="row">
                  <span class="d-block small">{{ items[row.index].times }}x</span>
                </template>
                <template #cell(week)="row">
                  <span class="d-block">{{ items[row.index].week }}</span>
                  <span class="d-block sub smaller">{{ items[row.index].week_start }}</span>
                  <span class="d-block sub smaller">{{ items[row.index].week_end }}</span>
                </template>
                <template #cell(link)="row">
                  <b-button variant="dark" size="sm" :to="{ name: 'weekly.' + tp, params: { week: items[row.index].week } }">
                    {{ $t('word.view_week') }}
                  </b-button>
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
import {getListAtRankX, getUserChartList} from "@/charts/helpers";

export default Vue.extend({
  name: 'AllNumberOnes',
  data() {
    const year = moment().format('YYYY');
    return {
      limit: 1,
      rank: 1,
      year,
      startYear: year,
      endYear: year,
      items: [] as any[],
      rankings: [1],
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
        { key: 'week', label: this.$tc('word.week', 1), class: 'text-center w-5' },
        { key: 'times', label: 'X', class: 'text-center w-5' },
        { key: 'name_artist', label: this.$tc('word.title', 1), class: 'title' },
        { key: 'playcount', label: this.$t('chart.playcount'), class: 'text-center w-10' },
        { key: 'link', label: '', class: 'text-center w-10' },
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
    setRankings() {
      this.rankings = [1];
      for (let i = 2; i <= this.limit; i++) {
        this.rankings.push(i);
      }
    },
    loadCharts() {
      const weeks = getUserChartList(this.user, 'week');
      this.limit = weeks && weeks[0].limit ? weeks[0].limit : 1;
      this.startYear = weeks && weeks[0].start ? moment(weeks[0].start).format('YYYY') : this.endYear;
      this.setRankings();
      if (this.rank > this.limit) {
        this.rank = this.limit;
      }
      if (weeks.length > 0) {
        const type = this.$route.params.type || 'artists';
        this.tp = type;
        this.items = getListAtRankX(weeks, type, this.rank, this.year);
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
