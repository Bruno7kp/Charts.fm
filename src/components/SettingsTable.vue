<template>
<b-form v-on:submit.prevent="onSubmit">
  <b-row>
    <b-col>
      <h6>Show Columns:</h6>
      <b-row>
        <b-col>
          <b-form-checkbox v-model="table.previousRank" class="d-block">Previous Rank</b-form-checkbox>
          <b-form-checkbox v-model="table.peak" class="d-block">Peak</b-form-checkbox>
          <b-form-checkbox v-model="table.images" class="d-block">Image</b-form-checkbox>
        </b-col>
        <b-col>
          <b-form-checkbox v-model="table.onChart" class="d-block">On Chart</b-form-checkbox>
          <b-form-checkbox v-model="table.previousPlaycount" class="d-block">Previous Plays</b-form-checkbox>
        </b-col>
      </b-row>
      <hr/>
      <h6>Rank / Playcount Variation:</h6>
      <b-form-group>
        <b-form-radio-group id="previous" v-model="table.previous" name="previous">
          <b-form-radio value="previous" class="d-block">Value <span class="text-secondary">(Ex: 20 plays)</span></b-form-radio>
          <b-form-radio value="diff" class="d-block">Difference <span class="text-secondary">(Ex: +10 plays)</span></b-form-radio>
          <b-form-radio value="percent" class="d-block">Percent <span class="text-secondary">(Ex: +50%)</span></b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <hr/>
      <h6>Table Style:</h6>
      <b-row>
        <b-col>
          <b-form-checkbox v-model="table.small" class="d-block">Compact</b-form-checkbox>
          <b-form-checkbox v-model="table.striped" class="d-block">Striped</b-form-checkbox>
        </b-col>
        <b-col>
          <b-form-checkbox v-model="table.bordered" class="d-block">Border</b-form-checkbox>
          <b-form-checkbox v-model="table.hover" class="d-block">Hover</b-form-checkbox>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-checkbox v-model="table.colored" class="d-block">Color Variat.</b-form-checkbox>
        </b-col>
        <b-col>
          <b-form-checkbox v-model="table.times" class="d-block">Times at #1</b-form-checkbox>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
	<b-row>
    <b-col>
      <b-btn type="submit" variant="outline-success" class="mt-2"><font-awesome-icon :icon="['far', 'save']" /></b-btn>
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
  computed: {
    ...mapGetters({
      table: 'getTable',
    }),
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('setTable', this.table);
    },
  },
});
</script>
