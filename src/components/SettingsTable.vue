<template>
<b-form v-on:submit.prevent="onSubmit">
  <b-row>
    <b-col cols="12" md="4" class="mb-3">
      <h6>{{ $t('chart.show_cols') }}:</h6>
      <b-row>
        <b-col>
          <b-form-checkbox v-model="table.opts" value="previousRank" class="d-block">{{ $t('chart.previous_rank') }}</b-form-checkbox>
          <b-form-checkbox v-model="table.opts" value="peak" class="d-block">{{ $t('chart.peak') }}</b-form-checkbox>
          <!--<b-form-checkbox v-model="table.opts" value="images" class="d-block">{{ $t('word.image') }}</b-form-checkbox>-->
          <b-form-checkbox v-model="table.opts" value="onChart" class="d-block">{{ $t('chart.total_' + chartType) }}</b-form-checkbox>
          <b-form-checkbox v-model="table.opts" value="previousPlaycount" class="d-block">{{ $t('chart.previous_playcount') }}</b-form-checkbox>
          <b-form-checkbox v-model="table.opts" value="separateArtist" class="d-block m-0">{{ $tc('word.artist', 1) }} ({{ $t('word.separate') }})</b-form-checkbox>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="12" md="4"  class="mb-3">
      <h6>{{ $t('chart.variation') }}:</h6>
      <b-form-group>
        <b-form-radio-group id="previous" v-model="table.previous" name="previous">
          <b-form-radio value="previous" class="d-block">{{ $t('chart.previous') }} <span class="text-secondary">(Ex: 20 {{ $t('chart.plays') }})</span></b-form-radio>
          <b-form-radio value="diff" class="d-block">{{ $t('chart.diff') }} <span class="text-secondary">(Ex: +10 {{ $t('chart.plays') }})</span></b-form-radio>
          <b-form-radio value="percent" class="d-block">{{ $t('chart.percent') }} <span class="text-secondary">(Ex: +50%)</span></b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </b-col>
    <b-col cols="12" md="4">
      <h6>{{ $t('chart.table_style') }}:</h6>
      <b-row>
        <b-col>
          <b-form-checkbox v-model="table.opts" value="small" class="d-block">{{ $t('chart.compact') }}</b-form-checkbox>
          <b-form-checkbox v-model="table.opts" value="striped" class="d-block">{{ $t('chart.striped') }}</b-form-checkbox>
          <b-form-checkbox v-model="table.opts" value="bordered" class="d-block">{{ $t('chart.border') }}</b-form-checkbox>
          <b-form-checkbox v-model="table.opts" value="separateLine" class="d-block">{{ $t('chart.line') }}</b-form-checkbox>
          <b-form-checkbox v-model="table.opts" value="colored" class="d-block">{{ $t('chart.color') }}</b-form-checkbox>
          <b-form-checkbox v-model="table.opts" value="times" class="d-block">{{ $t('chart.times') }}</b-form-checkbox>
          <!--<b-form-checkbox v-model="table.opts" value="hover" class="d-block">{{ $t('chart.hover') }}</b-form-checkbox>-->
        </b-col>
      </b-row>
    </b-col>
  </b-row>
	<b-row>
    <b-col>
      <b-btn type="submit" variant="outline-success" class="mt-2"><font-awesome-icon :icon="['far', 'save']" /> {{ $t('word.save') }}</b-btn>
    </b-col>
  </b-row>
</b-form>
</template>

<script lang="ts">
import * as _ from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import LastFm from '@/lastfm';
import { User } from '@/charts';

export default Vue.extend({
  name: 'SettingsTable',
  props: {
    chartType: String,
  },
  computed: {
    ...mapGetters({
      table: 'getTable',
    }),
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('setTable', this.table);
      this.$notify({
        group: 'app',
        type: 'success',
        text: this.$t('messages.settings_updated') + '',
      });
    },
  },
});
</script>
