<template>
<b-form v-on:submit.prevent="onSubmit">
  <b-row>
    <b-col>
      <b-form-group :label="$tc('word.user', 1)" label-for="user">
		    <b-select id="user" name="user" v-model="mUserName" :options="users" :disabled="loading" required></b-select>
	    </b-form-group>
    </b-col>
    <b-col>
      <b-form-group :label="$t('chart.week_day')">
        <b-select v-model="mStartDay" name="weekDay" :options="weekDays" required></b-select>
      </b-form-group>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <b-form-group :label="$t('chart.start_date')">
        <b-input v-model="mStartDate" name="startDate" type="date" :formatter="dateFormat" required></b-input>
      </b-form-group>
    </b-col>
    <b-col>
      <b-form-group :label="$t('word.limit')">
        <b-input v-model="mLimit" name="limit" type="number" min="5" max="100" lazy-formatter :formatter="numberFormat" required></b-input>
      </b-form-group>
    </b-col>
  </b-row>
	<b-row>
    <b-col>
      <b-btn type="submit" variant="outline-success" :disabled="loading">
        <font-awesome-icon :icon="['far', 'save']" />
      </b-btn>
      <p v-if="user.weeklyCharts.weeks.length" class="text-danger m-0">
        {{ $t('messages.settings_warning') }}
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
      users: 'getUsersAsOptions',
    }),
  },
  data() {
    return {
      mUserName: this.user.login,
      mStartDate: this.user.weeklyCharts.startDate,
      mStartDay: this.user.weeklyCharts.startDay,
      mLimit: this.user.weeklyCharts.limit,
      weekDays: {
        0: this.$t('word.sunday'),
        1: this.$t('word.monday'),
        2: this.$t('word.tuesday'),
        3: this.$t('word.wednesday'),
        4: this.$t('word.thursday'),
        5: this.$t('word.friday'),
        6: this.$t('word.saturday'),
      },
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
      this.$notify({
        group: 'app',
        type: 'success',
        text: this.$t('messages.settings_updated') + '',
      });
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
