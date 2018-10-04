<template>
  <div>
    <b-container>
      <b-row>
        <b-col sm="12" md="6">
          <b-card 
            header-bg-variant="danger"
            header-text-variant="white"
            class="mt-3 border-0 shadow"
            no-body
          >
            <h6 slot="header" class="mb-0 c-pointer" @click="toggleWidget">
              <i class="fas fa-sync-alt"></i> Update Charts
              <i :class="cardOpen.updateWeek ? upClass : downClass"></i>
            </h6>
            <b-card-body :class="cardOpen.updateWeek ? '' : 'd-none'">
              <WeeklyWidget v-bind:user.sync="user" v-bind:loading.sync="loading" @updateLoading="setLoading" />
            </b-card-body>
          </b-card>
        </b-col>
        <b-col sm="12" md="6">
          <b-card 
            header-bg-variant="dark" 
            header-text-variant="white"
            class="mt-3 border-0 shadow"
            no-body
          >
            <h6 slot="header" class="mb-0 c-pointer" @click="toggleSettings">
              <i class="fa fa-cog"></i> Settings
              <i :class="cardOpen.settingsWeek ? upClass : downClass"></i>
            </h6>
            <b-card-body :class="cardOpen.settingsWeek ? '' : 'd-none'">
              <WeeklyForm v-bind:user.sync="user" v-bind:loading.sync="loading" />
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="px-0 px-sm-3">
          <b-card class="my-4 shadow border-0">
            <ChartTable v-bind:user.sync="user" v-bind:loading.sync="loading" />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import WeeklyForm from '@/components/WeeklyForm.vue';
import WeeklyWidget from '@/components/WeeklyWidget.vue';
import ChartTable from '@/components/ChartTable.vue';
import { User } from '@/charts';

export default Vue.extend({
  name: 'Week',
  components: {
    WeeklyForm,
    WeeklyWidget,
    ChartTable,
  },
  computed: {
    user: {
      get(): any {
        return this.$store.getters.getDefaultUser;
      },
      set(newValue: string) {
        this.$store.dispatch('setCurrentUser', newValue);
      },
    },
    startDate(): string {
      return moment(this.$store.getters.getDefaultUser.weeklyCharts.startDate).format('YYYY-MM-DD');
    },
    cardOpen(): { settingsWeek: boolean, updateWeek: boolean } {
      return this.$store.getters.getCardOpen;
    },
  },
  data() {
    return {
      upClass: 'fa fa-chevron-up float-right pt-1',
      downClass: 'fa fa-chevron-down float-right pt-1',
      loading: false,
    };
  },
  methods: {
    toggleSettings() {
      this.cardOpen.settingsWeek = !this.cardOpen.settingsWeek;
      this.$store.dispatch('setCardOpen', this.cardOpen);
    },
    toggleWidget() {
      this.cardOpen.updateWeek = !this.cardOpen.updateWeek;
      this.$store.dispatch('setCardOpen', this.cardOpen);
    },
    setLoading(value: boolean) {
      this.loading = value;
    },
  },
});
</script>
<style>
.c-pointer {
  cursor: pointer;
}
</style>
