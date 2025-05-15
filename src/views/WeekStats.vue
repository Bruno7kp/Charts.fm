<template>
  <div>
    <b-container>
      <b-row v-if="user.weeklyCharts?.weeks?.length">
        <b-col class="px-0 px-sm-3">
          <b-row>
            <b-col sm="12" md="6">
              <b-card class="mb-4 mt-3 shadow border-0 text-center"
                      :bg-variant="theme === 'light' ? 'white' : 'dark'"
                      :text-variant="theme === 'light' ? 'dark' : 'white'"
                      id="chart"
                      :title="$t('stats.number_ones.title')">
                <b-card-text class="text-left">{{ $t('stats.number_ones.content') }}</b-card-text>
                <template #footer>
                  <b-button-group>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.number_ones', params: { type: 'artists' } }"><font-awesome-icon data-html2canvas-ignore="true" icon="user" /> {{ $tc("word.artist", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.number_ones', params: { type: 'albums' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'compact-disc']" /> {{ $tc("word.album", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.number_ones', params: { type: 'tracks' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'music']" /> {{ $tc("word.track", 2) }}</b-button>
                  </b-button-group>
                </template>
              </b-card>
            </b-col>
            <b-col sm="12" md="6">
              <b-card class="mb-4 mt-3 shadow border-0 text-center"
                      :bg-variant="theme === 'light' ? 'white' : 'dark'"
                      :text-variant="theme === 'light' ? 'dark' : 'white'"
                      id="chart"
                      :title="$t('stats.allkill.title')">
                <b-card-text class="text-left">{{ $t('stats.allkill.content') }}</b-card-text>
                <template #footer>
                  <b-button-group>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.allkill' }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'user']" /> {{ $t("stats.allkill.title") }}</b-button>
                  </b-button-group>
                </template>
              </b-card>
            </b-col>
            <b-col sm="12" md="6">
              <b-card class="mb-4 mt-3 shadow border-0 text-center"
                      :bg-variant="theme === 'light' ? 'white' : 'dark'"
                      :text-variant="theme === 'light' ? 'dark' : 'white'"
                      id="chart"
                      :title="$t('stats.most_number_ones.title')">
                <b-card-text class="text-left">{{ $t('stats.most_number_ones.content') }}</b-card-text>
                <template #footer>
                  <b-button-group>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.most_number_ones', params: { type: 'artists' } }"><font-awesome-icon data-html2canvas-ignore="true" icon="user" /> {{ $tc("word.artist", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.most_number_ones', params: { type: 'albums' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'compact-disc']" /> {{ $tc("word.album", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.most_number_ones', params: { type: 'tracks' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'music']" /> {{ $tc("word.track", 2) }}</b-button>
                  </b-button-group>
                </template>
              </b-card>
            </b-col>
            <b-col sm="12" md="6">
              <b-card class="mb-4 mt-3 shadow border-0 text-center"
                      :bg-variant="theme === 'light' ? 'white' : 'dark'"
                      :text-variant="theme === 'light' ? 'dark' : 'white'"
                      id="chart"
                      :title="$t('stats.most_weeks.title')">
                <b-card-text class="text-left">{{ $t('stats.most_weeks.content') }}</b-card-text>
                <template #footer>
                  <b-button-group>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.most_top_xs', params: { type: 'artists' } }"><font-awesome-icon data-html2canvas-ignore="true" icon="user" /> {{ $tc("word.artist", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.most_top_xs', params: { type: 'albums' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'compact-disc']" /> {{ $tc("word.album", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.most_top_xs', params: { type: 'tracks' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'music']" /> {{ $tc("word.track", 2) }}</b-button>
                  </b-button-group>
                </template>
              </b-card>
            </b-col>
            <b-col sm="12" md="6">
              <b-card class="mb-4 mt-3 shadow border-0 text-center"
                      :bg-variant="theme === 'light' ? 'white' : 'dark'"
                      :text-variant="theme === 'light' ? 'dark' : 'white'"
                      id="chart"
                      :title="$t('stats.most_plays.title')">
                <b-card-text class="text-left">{{ $t('stats.most_plays.content') }}</b-card-text>
                <template #footer>
                  <b-button-group>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.most_plays', params: { type: 'artists' } }"><font-awesome-icon data-html2canvas-ignore="true" icon="user" /> {{ $tc("word.artist", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.most_plays', params: { type: 'albums' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'compact-disc']" /> {{ $tc("word.album", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.most_plays', params: { type: 'tracks' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'music']" /> {{ $tc("word.track", 2) }}</b-button>
                  </b-button-group>
                </template>
              </b-card>
            </b-col>
            <b-col sm="12" md="6">
              <b-card class="mb-4 mt-3 shadow border-0 text-center"
                      :bg-variant="theme === 'light' ? 'white' : 'dark'"
                      :text-variant="theme === 'light' ? 'dark' : 'white'"
                      id="chart"
                      :title="$t('stats.debut.title')">
                <b-card-text class="text-left">{{ $t('stats.debut.content') }}</b-card-text>
                <template #footer>
                  <b-button-group>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.debut', params: { type: 'artists' } }"><font-awesome-icon data-html2canvas-ignore="true" icon="user" /> {{ $tc("word.artist", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.debut', params: { type: 'albums' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'compact-disc']" /> {{ $tc("word.album", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.debut', params: { type: 'tracks' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'music']" /> {{ $tc("word.track", 2) }}</b-button>
                  </b-button-group>
                </template>
              </b-card>
            </b-col>
            <b-col sm="12" md="6">
              <b-card class="mb-4 mt-3 shadow border-0 text-center"
                      :bg-variant="theme === 'light' ? 'white' : 'dark'"
                      :text-variant="theme === 'light' ? 'dark' : 'white'"
                      id="chart"
                      :title="$t('stats.points.title')">
                <b-card-text class="text-left">{{ $t('stats.points.content') }}</b-card-text>
                <template #footer>
                  <b-button-group>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.points', params: { type: 'artists' } }"><font-awesome-icon data-html2canvas-ignore="true" icon="user" /> {{ $tc("word.artist", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.points', params: { type: 'albums' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'compact-disc']" /> {{ $tc("word.album", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.points', params: { type: 'tracks' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'music']" /> {{ $tc("word.track", 2) }}</b-button>
                  </b-button-group>
                </template>
              </b-card>
            </b-col>
            <b-col sm="12" md="6">
              <b-card class="mb-4 mt-3 shadow border-0 text-center"
                      :bg-variant="theme === 'light' ? 'white' : 'dark'"
                      :text-variant="theme === 'light' ? 'dark' : 'white'"
                      id="chart"
                      :title="$t('stats.artist_tracks.title')">
                <b-card-text class="text-left">{{ $t('stats.artist_tracks.content') }}</b-card-text>
                <template #footer>
                  <b-button-group>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.artist_tracks', params: { type: 'albums' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'compact-disc']" /> {{ $tc("word.album", 2) }}</b-button>
                    <b-button variant="danger" :to="{ name: 'weekly.stats.artist_tracks', params: { type: 'tracks' } }"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'music']" /> {{ $tc("word.track", 2) }}</b-button>
                  </b-button-group>
                </template>
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