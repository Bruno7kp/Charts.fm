<template>
<b-form v-on:submit.prevent="onSubmit">
  <b-row>
    <b-col>
      <b-form-group label="Timezone" label-for="timezone">
		    <b-select id="timezone" v-model="timezone" :options="timezones"></b-select>
	    </b-form-group>
    </b-col>
  </b-row>
	<b-row>
    <b-col>
      <b-btn type="submit" variant="outline-success"><font-awesome-icon :icon="['far', 'save']" /></b-btn>
    </b-col>
  </b-row>
  <hr/>
  <b-row>
    <b-col>
      <b-btn type="button" variant="danger" @click="clean">Remove cached images</b-btn>
    </b-col>
  </b-row>
</b-form>
</template>

<script lang="ts">
import * as _ from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as moment from 'moment';
import 'moment-timezone';
import LastFm from '@/lastfm';
import { User } from '@/charts';

export default Vue.extend({
  name: 'SettingsForm',
  props: {
    timezone: String,
    timezones: Array,
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('setTimezone', this.$props.timezone);
      this.$notify({
        group: 'app',
        type: 'success',
        text: 'Settings updated successfully.',
      });
    },
    clean() {
      this.$store.dispatch('cleanImages');
      this.$notify({
        group: 'app',
        type: 'success',
        text: 'Images removed from cache.',
      });
    },
  },
});
</script>
