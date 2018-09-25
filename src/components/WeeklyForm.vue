<template>
<b-form v-on:submit.prevent="onSubmit">
  <b-row>
    <b-col>
      <b-form-group label="User" label-for="user">
		    <b-select id="user" name="user" v-model="multableUser" :options="users" required></b-select>
	    </b-form-group>
    </b-col>
    <b-col>
      <b-form-group label="Week Day">
        <b-select :value="weekDay" name="weekDay" :options="weekDays" required></b-select>
      </b-form-group>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <b-form-group label="Start date">
        <b-input :value="startDate" name="startDate" type="date" :formatter="dateFormat" required></b-input>
      </b-form-group>
    </b-col>
    <b-col>
      <b-form-group label="Limit">
        <b-input :value="limit" name="limit" type="number" min="5" max="100" lazy-formatter :formatter="numberFormat" required></b-input>
      </b-form-group>
    </b-col>
  </b-row>
	<b-row>
    <b-col>
      <b-btn type="submit" variant="success">Save settings</b-btn>
      <b-btn type="button" variant="success" v-on:click="load">Load</b-btn>
    </b-col>
  </b-row>
</b-form>
</template>

<script lang="ts">
import * as _ from 'lodash';
import moment from 'moment';
import 'moment-timezone';
import LastFm from '@/lastfm';
import { User, fixedStartDate } from '@/charts';
import WeeklyForm from '@/components/WeeklyForm.vue';
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';

export default Vue.extend({
  name: 'WeeklyForm',
  props: {
    user: String,
    users: Array,
    weekDay: Number,
    startDate: String,
    limit: Number,
  },
  computed: {
    ...mapGetters({
      weekDays: 'getWeekDays',
    }),
  },
  data() {
    return {
      multableUser: this.user,
    };
  },
  methods: {
    load() {
      const user = this.$store.getters.getUser(this.multableUser);
      const realStart = fixedStartDate(user.weeklyCharts.startDate, user.weeklyCharts.startDay);
      console.log(realStart);
    },
    onSubmit(event: any) {
      const els = event.target.elements;
      const user = this.$store.getters.getUser(els.user.value);
      if (user !== null) {
        const d = moment(els.startDate.value).tz(this.$store.state.timezone).toDate();
        user.weeklyCharts.limit = parseInt(els.limit.value, 10);
        user.weeklyCharts.startDate = d;
        user.weeklyCharts.startDay = parseInt(els.weekDay.value, 10);
        this.$store.dispatch('updateUser', user);
      }
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
