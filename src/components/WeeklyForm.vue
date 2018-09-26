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
      {{ mUser.weeklyCharts.weeks.length + '/' + weeklyList.length + ' weeks' }}
      <b-btn type="button" size="sm" variant="success" v-on:click="load">Load charts</b-btn>
    </b-col>
  </b-row>
</b-form>
</template>

<script lang="ts">
import * as _ from 'lodash';
import moment from 'moment';
import 'moment-timezone';
import LastFm from '@/lastfm';
import { User, fixedStartDate, weeklyList } from '@/charts';
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
    weeklyList() {
      const realStart = fixedStartDate(this.mUser.weeklyCharts.startDate, this.mUser.weeklyCharts.startDay);
      return weeklyList(realStart, new Date());
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
