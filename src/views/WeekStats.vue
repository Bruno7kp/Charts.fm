<template>
  <div>
    <b-container>
      <b-row v-if="user.weeklyCharts?.weeks?.length">
        <b-col class="px-0 px-sm-3">
          <b-row>
            <b-col sm="12" md="6">
              <b-card class="mb-4 mt-3 shadow border-0"
                      :bg-variant="theme === 'light' ? 'white' : 'dark'"
                      :text-variant="theme === 'light' ? 'dark' : 'white'"
                      id="chart">
                <b-card-title class="text-center">{{ $t('stats.number_ones.title') }}</b-card-title>
                <b-card-body>{{ $t('stats.number_ones.content') }}</b-card-body>
                <b-card-footer class="text-center">
                  <b-button-group>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.number_ones', params: { type: 'artists' } }"><font-awesome-icon data-html2canvas-ignore="true" icon="user" /> {{ $tc("word.artist", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.number_ones', params: { type: 'albums' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'compact-disc']" /> {{ $tc("word.album", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.number_ones', params: { type: 'tracks' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'music']" /> {{ $tc("word.track", 2) }}</b-button>
                  </b-button-group>
                </b-card-footer>
              </b-card>
            </b-col>
            <b-col sm="12" md="6">
              <b-card class="mb-4 mt-3 shadow border-0"
                      :bg-variant="theme === 'light' ? 'white' : 'dark'"
                      :text-variant="theme === 'light' ? 'dark' : 'white'"
                      id="chart">
                <b-card-title class="text-center">{{ $t('stats.most_number_ones.title') }} <b-badge variant="danger">{{ $t("word.new") }}</b-badge></b-card-title>
                <b-card-body>{{ $t('stats.most_number_ones.content') }}</b-card-body>
                <b-card-footer class="text-center">
                  <b-button-group>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.most_number_ones', params: { type: 'artists' } }"><font-awesome-icon data-html2canvas-ignore="true" icon="user" /> {{ $tc("word.artist", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.most_number_ones', params: { type: 'albums' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'compact-disc']" /> {{ $tc("word.album", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.most_number_ones', params: { type: 'tracks' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'music']" /> {{ $tc("word.track", 2) }}</b-button>
                  </b-button-group>
                </b-card-footer>
              </b-card>
            </b-col>
            <b-col sm="12" md="6">
              <b-card class="mb-4 mt-3 shadow border-0"
                      :bg-variant="theme === 'light' ? 'white' : 'dark'"
                      :text-variant="theme === 'light' ? 'dark' : 'white'"
                      id="chart">
                <b-card-title class="text-center">{{ $t('stats.most_weeks.title') }} <b-badge variant="danger">{{ $t("word.new") }}</b-badge></b-card-title>
                <b-card-body>{{ $t('stats.most_weeks.content') }}</b-card-body>
                <b-card-footer class="text-center">
                  <b-button-group>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.most_top_xs', params: { type: 'artists' } }"><font-awesome-icon data-html2canvas-ignore="true" icon="user" /> {{ $tc("word.artist", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.most_top_xs', params: { type: 'albums' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'compact-disc']" /> {{ $tc("word.album", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.most_top_xs', params: { type: 'tracks' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'music']" /> {{ $tc("word.track", 2) }}</b-button>
                  </b-button-group>
                </b-card-footer>
              </b-card>
            </b-col>
            <b-col sm="12" md="6">
              <b-card class="mb-4 mt-3 shadow border-0"
                      :bg-variant="theme === 'light' ? 'white' : 'dark'"
                      :text-variant="theme === 'light' ? 'dark' : 'white'"
                      id="chart">
                <b-card-body>{{ $t('stats.more') }}</b-card-body>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col class="px-0 px-sm-3">
          <b-card class="mb-4 mt-3 shadow border-0"
                  :bg-variant="theme === 'light' ? 'white' : 'dark'"
                  :text-variant="theme === 'light' ? 'dark' : 'white'"
                  id="chart">
            <b-link to="/weekly" class="btn btn-outline-danger">{{ $t('chart.update') }}</b-link>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export default Vue.extend({
  name: 'WeekStats',
  computed: {
    user() {
      return this.$store.getters.getDefaultUser;
    },
    theme(): string {
      return this.$store.getters.getTheme;
    },
  },
});
</script>