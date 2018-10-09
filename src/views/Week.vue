<template>
  <div>
    <b-container>
      <b-row>
        <b-col sm="12" md="6">
          <b-card 
            header-bg-variant="dark" 
            header-text-variant="white"
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
            class="mt-3 border-0 shadow"
            no-body
          >
            <h6 slot="header" class="mb-0 c-pointer" @click="toggleWidget">
              <font-awesome-icon :icon="['fa', 'sync-alt']" /> {{ $t("chart.update") }}
              <b-badge variant="warning" v-if="chartsToUpdate() > 0">{{ $t("chart.update_now") }}</b-badge>
              <font-awesome-icon :icon="['fa', 'chevron-up']" v-if="cardOpen.updateWeek" class="float-right pt-1" />
              <font-awesome-icon :icon="['fa', 'chevron-down']" v-if="!cardOpen.updateWeek" class="float-right pt-1" />
            </h6>
            <b-card-body :class="cardOpen.updateWeek ? '' : 'd-none'">
              <WeeklyWidget v-bind:user.sync="user" v-bind:loading.sync="loading" @updateLoading="setLoading" />
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="px-0 px-sm-3">
          <b-card class="my-4 shadow border-0">
            <ChartTable id="chart" chart-type="week" v-bind:user.sync="user" v-bind:loading.sync="loading" />
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12">
          <b-card 
            header-bg-variant="dark" 
            header-text-variant="white"
            class="mb-4 border-0 shadow"
            no-body
          >
            <h6 slot="header" class="mb-0 c-pointer" @click="toggleTableSettings">
              <font-awesome-icon :icon="['fa', 'table']" /> {{ $t('chart.table') }}
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
import { mapGetters } from 'vuex';
import WeeklyForm from '@/components/WeeklyForm.vue';
import WeeklyWidget from '@/components/WeeklyWidget.vue';
import SettingsTable from '@/components/SettingsTable.vue';
import ChartTable from '@/components/ChartTable.vue';
import { User, fixedStartDate, getWeeklyList } from '@/charts';

export default Vue.extend({
  name: 'Week',
  components: {
    WeeklyForm,
    WeeklyWidget,
    ChartTable,
    SettingsTable,
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
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
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
