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
            <h6 slot="header" class="mb-0">
              <i class="fas fa-sync-alt"></i> Update Charts
              <i @click="toggleWidget" :class="cardOpen.updateWeek ? upClass : downClass"></i>
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
            <h6 slot="header" class="mb-0">
              <i class="fa fa-cog"></i> Settings
              <i @click="toggleSettings" :class="cardOpen.settingsWeek ? upClass : downClass"></i>
            </h6>
            <b-card-body :class="cardOpen.settingsWeek ? '' : 'd-none'">
              <WeeklyForm v-bind:user.sync="user" v-bind:loading.sync="loading" />
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card class="my-4 shadow border-0">
            <ChartTable v-bind:user.sync="user" />
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

@Component({
  components: {
    WeeklyForm,
    WeeklyWidget,
    ChartTable,
  },
  computed: {
    user: {
      get() {
        return this.$store.getters.getDefaultUser;
      },
      set(newValue) {
        this.$store.dispatch('setCurrentUser', newValue);
      },
    },
    startDate(): string {
      return moment(this.$store.getters.getDefaultUser.weeklyCharts.startDate).format('YYYY-MM-DD');
    },
    cardOpen(): object {
      return this.$store.getters.getCardOpen;
    },
  },
  data() {
    return {
      upClass: 'fa fa-chevron-up float-right pt-1 c-pointer',
      downClass: 'fa fa-chevron-down float-right pt-1 c-pointer',
      loading: false,
    };
  },
  methods: {
    toggleSettings() {
      // @ts-ignore
      this.cardOpen.settingsWeek = !this.cardOpen.settingsWeek;
      // @ts-ignore
      this.$store.dispatch('setCardOpen', this.cardOpen);
    },
    toggleWidget() {
      // @ts-ignore
      this.cardOpen.updateWeek = !this.cardOpen.updateWeek;
      // @ts-ignore
      this.$store.dispatch('setCardOpen', this.cardOpen);
    },
    setLoading(value: boolean) {
      // @ts-ignore
      this.loading = value;
    },
  },
  watch: {
    cardOpen() {
      // @ts-ignore
      if (this.cardOpen.settingsWeek) {
        // @ts-ignore
        this.settingsBodyClass = '';
        // @ts-ignore
        this.settingsIconClass = upClass;
      } else {
        // @ts-ignore
        this.settingsBodyClass = 'd-none';
        // @ts-ignore
        this.settingsIconClass = downClass;
      }
      // @ts-ignore
      if (this.cardOpen.updateWeek) {
        // @ts-ignore
        this.widgetBodyClass = '';
        // @ts-ignore
        this.widgetIconClass = upClass;
      } else {
        // @ts-ignore
        this.widgetBodyClass = 'd-none';
        // @ts-ignore
        this.widgetIconClass = downClass;
      }
    },
  },
})
export default class Week extends Vue {}
</script>
<style>
.c-pointer {
  cursor: pointer;
}
</style>
