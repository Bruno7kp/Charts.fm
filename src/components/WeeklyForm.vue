<template>
<b-form v-on:submit.prevent="onSubmit">
  <b-row>
    <b-col>
      <b-form-group label="User" label-for="user">
		    <b-select id="user" name="user" v-model="mUserName" :options="users" required></b-select>
	    </b-form-group>
    </b-col>
    <b-col>
      <b-form-group label="Week Day">
        <b-select v-model="mUser.weeklyCharts.startDay" name="weekDay" :options="weekDays" required></b-select>
      </b-form-group>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <b-form-group label="Start date">
        <b-input v-model="mUser.weeklyCharts.startDate" name="startDate" type="date" :formatter="dateFormat" required></b-input>
      </b-form-group>
    </b-col>
    <b-col>
      <b-form-group label="Limit">
        <b-input v-model="mUser.weeklyCharts.limit" name="limit" type="number" min="5" max="100" lazy-formatter :formatter="numberFormat" required></b-input>
      </b-form-group>
    </b-col>
  </b-row>
	<b-row>
    <b-col>
      <b-btn type="submit" size="sm" variant="success">Save settings</b-btn>
    </b-col>
    <b-col>
      <b-btn type="button" size="sm" variant="success" v-on:click="load">Load charts</b-btn>
      {{ mUser.weeklyCharts.weeks.length + '/' + weeklyList.length + ' weeks' }}
    </b-col>
  </b-row>
</b-form>
</template>

<script lang="ts">
import * as _ from 'lodash';
import moment from 'moment';
import 'moment-timezone';
import LastFm from '@/lastfm';
import { User, fixedStartDate, getWeeklyList, Week } from '@/charts';
import WeeklyForm from '@/components/WeeklyForm.vue';
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';

export default Vue.extend({
  name: 'WeeklyForm',
  props: {
    user: Object,
  },
  computed: {
    ...mapGetters({
      weekDays: 'getWeekDays',
      users: 'getUsersAsOptions',
    }),
    weeklyList(): Week[] {
      const limit = this.mUser.weeklyCharts.limit;
      const realStart = fixedStartDate(this.mUser.weeklyCharts.startDate, this.mUser.weeklyCharts.startDay);
      return getWeeklyList(realStart, new Date(), limit);
    },
  },
  data() {
    return {
      mUser: this.user,
      mUserName: this.user.login,
    };
  },
  watch: {
    mUserName(newUser, oldUser) {
      this.mUser = this.$store.getters.getUser(newUser);
    },
  },
  methods: {
    load() {
      this.mUser.weeklyCharts.weeks = [];
      const startIndex = this.mUser.weeklyCharts.weeks.length;
      const artistChart = [];
      for (let i = startIndex; i < this.weeklyList.length; i++) {
        const week = this.weeklyList[i];
        const last = this.weeklyList.length === (i + 1);
        week.load(this.mUser.login).then((response) => {
          this.mUser.weeklyCharts.weeks.push(week);
          if (last) {
            this.mUser.weeklyCharts.weeks.sort((a: Week, b: Week) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0));
          }
          this.$store.dispatch('updateUser', this.mUser);
        });
      }
    },
    onSubmit(event: any) {
      this.$store.dispatch('updateUser', this.mUser);
    },
    dateFormat(value: string, event: any) {
      const date = moment(value);
      return date.format('YYYY-MM-DD');
    },
    numberFormat(value: string, event: any) {
      const limit = parseInt(value, 10);
      if (limit < 5) {
        return 5;
      } else if (limit > 100) {
        return 100;
      } else {
        return limit;
      }
    },
  },
});
</script>
