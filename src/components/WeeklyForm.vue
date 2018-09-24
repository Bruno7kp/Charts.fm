<template>
<b-form v-on:submit.prevent="onSubmit">
  <b-row>
    <b-col>
      <b-form-group label="User" label-for="user">
		    <b-select id="user" :value="user" :options="users"></b-select>
	    </b-form-group>
    </b-col>
    <b-col>
      <b-form-group label="Week Day">
        <b-select :value="weekDay" :options="weekDays"></b-select>
      </b-form-group>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <b-form-group label="Start date">
        <b-input :value="startDate" type="date" :formatter="dateFormat"></b-input>
      </b-form-group>
    </b-col>
    <b-col>
      <b-form-group label="Limit">
        <b-input :value="limit" type="number" min="5" max="100"></b-input>
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
  },
});
</script>
