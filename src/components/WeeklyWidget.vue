<template>
  <b-row>
    <b-col>
      <div class="display-4 text-center">
        {{ user.weeklyCharts.weeks.length + '/' + weeklyList.length }}
      </div>
      <div class="text-muted text-center">weeks loaded</div>
      <b-progress :value="user.weeklyCharts.weeks.length / weeklyList.length * 100"
                  variant="danger"
                  :striped="loading"
                  :animated="loading"
                  class="mb-2"></b-progress>
      <b-btn type="button" variant="outline-dark" :disabled="loading" v-on:click="load">
        <div v-if="loading">
          <font-awesome-icon :icon="['fa', 'sync-alt']" spin /> Loading
        </div>
        <div v-else>
          <font-awesome-icon :icon="['fa', 'sync-alt']" /> Load charts
        </div>
      </b-btn>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import * as _ from 'lodash';
import LastFm from '@/lastfm';
import { User, fixedStartDate, getWeeklyList, Week } from '@/charts';
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';

export default Vue.extend({
  name: 'WeeklyWidget',
  props: {
    user: Object,
    loading: Boolean,
  },
  computed: {
    ...mapGetters({
      weekDays: 'getWeekDays',
      users: 'getUsersAsOptions',
    }),
    weeklyList(): Week[] {
      const limit = this.user.weeklyCharts.limit;
      const realStart = fixedStartDate(this.user.weeklyCharts.startDate, this.user.weeklyCharts.startDay);
      return getWeeklyList(realStart, new Date(), limit);
    },
  },
  data() {
    return {
      fields: [ 'rank', 'name', 'playcount' ],
    };
  },
  methods: {
    load() {
      const startIndex = this.user.weeklyCharts.weeks.length;
      if (startIndex < this.weeklyList.length) {
        this.$emit('updateLoading', true);
        for (let i = startIndex, p = Promise.resolve(); i < this.weeklyList.length; i++) {
          const week = this.weeklyList[i];
          const last = this.weeklyList.length === (i + 1);
          // @ts-ignore
          p = p.then(() => new Promise((resolve) => {
            week.load(this.user.login)
              .then((response) => {
                this.user.weeklyCharts.weeks.push(week);
                if (last) {
                  this.$emit('updateLoading', false);
                }
                this.$store.dispatch('updateUser', this.user);
                resolve();
              })
              .catch((e) => {
                this.$emit('updateLoading', false);
                this.$notify({
                  group: 'app',
                  type: 'error',
                  title: 'Oops, something went wrong.',
                  text: 'Make sure you are connected to the internet and try again.',
                });
              });
          }));
        }
      }
    },
  },
});
</script>
