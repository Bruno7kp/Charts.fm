<template>
<b-form v-on:submit.prevent="onSubmit">
  <b-row>
    <b-col>
      <b-form-group label="User" label-for="user">
		    <b-select id="user" :value="user" :options="users" required></b-select>
	    </b-form-group>
    </b-col>
    <b-col>
      <b-form-group label="Week Day">
        <b-select :value="weekDay" :options="weekDays" required></b-select>
      </b-form-group>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <b-form-group label="Start date">
        <b-input :value="startDate" type="date" :formatter="dateFormat" required></b-input>
      </b-form-group>
    </b-col>
    <b-col>
      <b-form-group label="Limit">
        <b-input :value="limit" type="number" min="5" max="100" lazy-formatter :formatter="numberFormat" required></b-input>
      </b-form-group>
    </b-col>
  </b-row>
	<b-row>
    <b-col>
      <b-btn type="submit" variant="success">Go!</b-btn>
    </b-col>
  </b-row>
</b-form>
</template>

<script lang="ts">
import * as _ from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';
import 'moment-timezone';
import LastFm from '@/lastfm';
import { User } from '@/charts';
import WeeklyForm from '@/components/WeeklyForm.vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'WeeklyForm',
  props: {
    user: String,
    users: Array,
    weekDay: Number,
    startDate: Date,
    limit: Number,
  },
  computed: {
    ...mapGetters({
      weekDays: 'getWeekDays',
    }),
  },
  methods: {
    onSubmit() {
      // if (this.validUserName) {} else {}
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
