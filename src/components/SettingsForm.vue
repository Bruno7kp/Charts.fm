<template>
<b-form v-on:submit.prevent="onSubmit">
  <b-row>
    <b-col>
      <b-form-group :label="$t('word.timezone')" label-for="timezone">
		    <b-select id="timezone" v-model="tz" :options="timezones"></b-select>
	    </b-form-group>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <b-form-group :label="$t('word.language')" label-for="language">
		    <b-select id="language" v-model="lang" :options="languages"></b-select>
	    </b-form-group>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <b-form-group :label="$t('word.theme')" label-for="theme">
		    <b-select id="theme" v-model="th" :options="themes"></b-select>
	    </b-form-group>
    </b-col>
  </b-row>
	<b-row>
    <b-col>
      <b-btn type="submit" variant="outline-success"><font-awesome-icon :icon="['far', 'save']" /> {{ $t('word.save') }}</b-btn>
    </b-col>
  </b-row>
  <!--
  <hr/>
  <b-row>
    <b-col>
      <b-btn type="button" variant="danger" @click="clean">{{ $t('messages.remove_images') }}</b-btn>
    </b-col>
  </b-row>
  -->
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
    language: String,
    languages: Array,
    theme: String,
    themes: Array,
  },
  data() {
    return {
      tz: this.$props.timezone,
      lang: this.$props.language,
      th: this.$props.theme,
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('setTimezone', this.$data.tz);
      this.$store.dispatch('setLang', this.$data.lang);
      this.$i18n.locale = this.$data.lang;
      this.$store.dispatch('setTheme', this.$data.th);
      this.$notify({
        group: 'app',
        type: 'success',
        text: this.$t('messages.settings_updated') + '',
      });
    },
    clean() {
      this.$store.dispatch('cleanImages');
      this.$notify({
        group: 'app',
        type: 'success',
        text: this.$t('messages.images_removed') + '',
      });
    },
  },
});
</script>
