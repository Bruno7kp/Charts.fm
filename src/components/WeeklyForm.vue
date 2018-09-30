<template>
<b-form v-on:submit.prevent="onSubmit">
  <b-row>
    <b-col>
      <b-form-group label="User" label-for="user">
		    <b-select id="user" name="user" v-model="mUserName" :options="users" :disabled="loading" required></b-select>
	    </b-form-group>
    </b-col>
    <b-col>
      <b-form-group label="Week Day">
        <b-select v-model="mStartDay" name="weekDay" :options="weekDays" required></b-select>
      </b-form-group>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <b-form-group label="Start date">
        <b-input v-model="mStartDate" name="startDate" type="date" :formatter="dateFormat" required></b-input>
      </b-form-group>
    </b-col>
    <b-col>
      <b-form-group label="Limit">
        <b-input v-model="mLimit" name="limit" type="number" min="5" max="100" lazy-formatter :formatter="numberFormat" required></b-input>
      </b-form-group>
    </b-col>
  </b-row>
	<b-row>
    <b-col>
      <b-btn type="submit" variant="outline-success" :disabled="loading">
        <i class="far fa-save"></i>
      </b-btn>
      <p v-if="user.weeklyCharts.weeks.length" class="text-danger m-0">If you change your settings, your data will be reset.
      </p>
    </b-col>
  </b-row>
</b-form>
</template>

<script lang="ts">
import * as _ from 'lodash';
import moment from 'moment';
import 'moment-timezone';
import LastFm from '@/lastfm';
import { User, fixedStartDate, Week } from '@/charts';
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';

export default Vue.extend({
  name: 'WeeklyForm',
  props: {
    user: Object,
    loading: Boolean,
  },
  computed: {
    ...mapGetters({
      weekDays: 'getWeekDays',
      users: 'getUsersAsOptions',
    }),
  },
  data() {
    return {
      mUserName: this.user.login,
      mStartDate: this.user.weeklyCharts.startDate,
      mStartDay: this.user.weeklyCharts.startDay,
      mLimit: this.user.weeklyCharts.limit,
    };
  },
  watch: {
    mUserName(newUser, oldUser) {
      this.$emit('update:user', newUser);
    },
    user(newUser, oldUser) {
      this.mStartDate = this.user.weeklyCharts.startDate;
      this.mStartDay = this.user.weeklyCharts.startDay;
      this.mLimit = this.user.weeklyCharts.limit;
    },
  },
  methods: {
    onSubmit(event: any) {
      this.user.weeklyCharts.weeks = [];
      this.user.weeklyCharts.startDate = this.mStartDate;
      this.user.weeklyCharts.startDay = this.mStartDay;
      this.user.weeklyCharts.limit = this.mLimit;
      this.$store.dispatch('updateUser', this.user);
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
