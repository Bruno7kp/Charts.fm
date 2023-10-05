<template>
  <b-row>
    <b-col sm="12" md="6" lg="4">
      <b-nav pills fill class="nav-danger mb-2">
        <b-nav-item :active="selected == 'artists'" @click="selectType('artists')"><font-awesome-icon data-html2canvas-ignore="true" icon="user" /> {{ $tc("word.artist", 2) }}</b-nav-item>
        <b-nav-item :active="selected == 'albums'" @click="selectType('albums')"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'compact-disc']" /> {{ $tc("word.album", 2) }}</b-nav-item>
        <b-nav-item :active="selected == 'tracks'" @click="selectType('tracks')"><font-awesome-icon data-html2canvas-ignore="true" :icon="['fa', 'music']" /> {{ $tc("word.track", 2) }}</b-nav-item>
      </b-nav>
    </b-col>
    <b-col sm="12">
      <b-table
        :fields="fields"
        :items="items"
        :class="'bg-' + theme + ' chart-table '"
        responsive="lg"
        :dark="theme === 'dark'"
        :striped="true"
        :small="true"
      >
        <template #cell(name_artist)="row">
          <span class="d-block">{{ items[row.index].name }}</span>
          <span class="d-block sub" v-if="items[row.index].artist">{{ items[row.index].artist }}</span>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Week from "../charts/week";

export default Vue.extend({
  name: 'LiveTable',
  props: {
    week: Week,
    theme: String,
  },
  data() {
    return {
      selected: 'artists',
    };
  },
  computed: {
    fields() {
      return [
        { key: 'rank', label: '#', class: 'text-center w-5' },
        { key: 'name_artist', label: this.$tc('word.title', 1), class: 'title' },
        { key: 'playcount', label: this.$t('chart.playcount'), class: 'text-center w-10' },
      ];
    },
    items() {
      if (this.selected == 'artists') {
        return this.week.artists;
      } else if (this.selected == 'albums') {
        return this.week.albums;
      } else if (this.selected == 'tracks') {
        return this.week.tracks;
      }
      return [];
    },
  },
  methods: {
    selectType(type: string) {
      this.selected = type;
    },
  },
});
</script>
