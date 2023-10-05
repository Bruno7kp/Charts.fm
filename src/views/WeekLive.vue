<template>
  <div>
    <b-container>
      <b-row v-if="user.weeklyCharts?.weeks?.length">
        <b-col class="px-0 px-sm-3">
          <b-card class="mb-4 mt-3 shadow border-0"
                  :bg-variant="theme === 'light' ? 'white' : 'dark'"
                  :text-variant="theme === 'light' ? 'dark' : 'white'"
                  id="chart">
            <h4>Weekly.live</h4>
            <p>
              <b-button size="sm" class="mr-2" variant="outline-danger" @click="load">
                <font-awesome-icon :icon="['fas', 'sync']" />
              </b-button>
              {{ startDate }} - {{ endDate }}
            </p>
            <live-table :week="week" :theme="theme" v-if="week"></live-table>
          </b-card>
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
import {fixedStartDate, getWeeklyList} from '@/charts';
import moment from "moment/moment";
import LiveTable from "@/components/LiveTable.vue";

export default Vue.extend({
  name: 'WeekLive',
  components: {
    'live-table': LiveTable,
  },
  data() {
    return {
      week: null as any,
    }
  },
  computed: {
    user() {
      return this.$store.getters.getDefaultUser;
    },
    theme(): string {
      return this.$store.getters.getTheme;
    },
    start(): Date {
      return fixedStartDate(new Date(), this.user.weeklyCharts.startDay);
    },
    startDate(): string {
      return moment(this.start).format('YYYY-MM-DD HH:mm');
    },
    end(): Date {
      return moment(this.start).add(1, 'weeks').toDate();
    },
    endDate(): string {
      return moment(this.end).format('YYYY-MM-DD HH:mm');
    }
  },
  methods: {
    load() {
      let list = getWeeklyList(this.start, this.end, this.user.weeklyCharts.limit + 10);
      list[0].load(this.user.login)
          .then((response) => {
            this.week = response;
          });
    }
  },
  created() {
    this.load();
  },
});
</script>