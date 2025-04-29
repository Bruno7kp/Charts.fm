<template>
  <div>
    <b-container>
      <b-row v-if="user.weeklyCharts?.weeks?.length">
        <!--
        <b-col cols="12 mt-3" class="text-right">
          <ShareModal />
        </b-col>
        -->
        <b-col class="px-0 px-sm-3">
          <b-card class="mb-4 mt-3 shadow border-0"
            :bg-variant="theme === 'light' ? 'white' : 'dark'"
            :text-variant="theme === 'light' ? 'dark' : 'white'" 
            id="chart">
            <ChartTable chart-type="week" :type="type" v-bind:user.sync="user" v-bind:loading.sync="loading" :theme="theme" />
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="6">
          <b-card
              :header-bg-variant="theme === 'light' ? 'dark' : 'white'"
              :header-text-variant="theme === 'light' ? 'white' : 'dark'"
              :bg-variant="theme === 'light' ? 'white' : 'dark'"
              :text-variant="theme === 'light' ? 'dark' : 'white'"
              class="mt-3 border-0 shadow"
              no-body
          >
            <h6 slot="header" class="mb-0 c-pointer" @click="toggleSettings">
              <font-awesome-icon :icon="['fa', 'cog']" /> {{ $t("word.settings") }}
              <font-awesome-icon :icon="['fa', 'chevron-up']" v-if="cardOpen.settingsWeek" class="float-right pt-1" />
              <font-awesome-icon :icon="['fa', 'chevron-down']" v-if="!cardOpen.settingsWeek" class="float-right pt-1" />
            </h6>
            <b-card-body :class="cardOpen.settingsWeek ? '' : 'd-none'">
              <WeeklyForm v-bind:user.sync="user" v-bind:loading.sync="loading" />
            </b-card-body>
          </b-card>
        </b-col>
        <b-col sm="12" md="6">
          <b-card
              header-bg-variant="danger"
              header-text-variant="white"
              :bg-variant="theme === 'light' ? 'white' : 'dark'"
              :text-variant="theme === 'light' ? 'dark' : 'white'"
              class="mt-3 border-0 shadow"
              no-body
          >
            <h6 slot="header" class="mb-0 c-pointer" @click="toggleWidget">
              <b-badge :variant="chartsToUpdate() > 0 ? 'warning' : 'danger'" @click="updateWeeks">
              <font-awesome-icon :icon="['fa', 'sync-alt']" />
              </b-badge> {{ $t("chart.update") }}
              <b-badge variant="warning" v-if="chartsToUpdate() > 0">{{ $t("chart.update_now") }}</b-badge>
              <font-awesome-icon :icon="['fa', 'chevron-up']" v-if="cardOpen.updateWeek" class="float-right pt-1" />
              <font-awesome-icon :icon="['fa', 'chevron-down']" v-if="!cardOpen.updateWeek" class="float-right pt-1" />
            </h6>
            <b-card-body :class="cardOpen.updateWeek ? '' : 'd-none'">
              <WeeklyWidget v-bind:user.sync="user" v-bind:loading.sync="loading" @updateLoading="setLoading" :theme="theme" :update="cardUpdate" />
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12">
          <b-card 
            :header-bg-variant="theme === 'light' ? 'dark' : 'white'" 
            :header-text-variant="theme === 'light' ? 'white' : 'dark'"
            :bg-variant="theme === 'light' ? 'white' : 'dark'"
            :text-variant="theme === 'light' ? 'dark' : 'white'"
            class="mt-3 mb-4 border-0 shadow"
            no-body
          >
            <h6 slot="header" class="mb-0 c-pointer" @click="toggleTableSettings">
              <font-awesome-icon :icon="['fa', 'table']" /> {{ $t('chart.table') }} <span class="badge badge-danger">{{ $t('word.new') }}</span>
              <font-awesome-icon :icon="['fa', 'chevron-up']" v-if="cardOpen.settingsTable" class="float-right pt-1" />
              <font-awesome-icon :icon="['fa', 'chevron-down']" v-if="!cardOpen.settingsTable" class="float-right pt-1" />
            </h6>
            <b-card-body :class="cardOpen.settingsTable ? '' : 'd-none'">
              <SettingsTable chart-type="week" />
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import WeeklyForm from '@/components/WeeklyForm.vue';
import WeeklyWidget from '@/components/WeeklyWidget.vue';
import SettingsTable from '@/components/SettingsTable.vue';
import ChartTable from '@/components/ChartTable.vue';
import { fixedStartDate, getWeeklyList } from '@/charts';
import ShareModal from '@/components/ShareModal.vue';

export default Vue.extend({
  name: 'Week',
  props: {
    type: {
      type: String,
      default: 'artists',
    },
  },
  components: {
    WeeklyForm,
    WeeklyWidget,
    ChartTable,
    SettingsTable,
    ShareModal,
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
  },
  data() {
    return {
      loading: false,
      cardUpdate: 0,
    };
  },
  methods: {
    updateWeeks() {
      this.cardUpdate++;
    },
    toggleSettings() {
      this.cardOpen.settingsWeek = !this.cardOpen.settingsWeek;
      this.$store.dispatch('setCardOpen', this.cardOpen);
    },
    toggleWidget() {
      this.cardOpen.updateWeek = !this.cardOpen.updateWeek;
      this.$store.dispatch('setCardOpen', this.cardOpen);
    },
    toggleTableSettings() {
      this.cardOpen.settingsTable = !this.cardOpen.settingsTable;
      this.$store.dispatch('setCardOpen', this.cardOpen);
    },
    setLoading(value: boolean) {
      this.loading = value;
    },
    chartsToUpdate() {
      const limit = this.user.weeklyCharts.limit;
      const realStart = fixedStartDate(this.user.weeklyCharts.startDate, this.user.weeklyCharts.startDay);
      const list = getWeeklyList(realStart, new Date(), limit);
      return list.length - this.user.weeklyCharts.weeks.length;
    },
  },
});

</script>
<style>
.c-pointer {
  cursor: pointer;
}
</style>
