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
              <i @click="toggleWidget" :class="widgetIconClass"></i>
            </h6>
            <b-card-body :class="widgetBodyClass">
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
              <i @click="toggleSettings" :class="settingsIconClass"></i>
            </h6>
            <b-card-body :class="settingsBodyClass">
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

const upClass = 'fa fa-chevron-up float-right pt-1 c-pointer';
const downClass = 'fa fa-chevron-down float-right pt-1 c-pointer';

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
  },
  data() {
    return {
      settingsVisible: true,
      settingsBodyClass: '',
      settingsIconClass: upClass,
      widgetVisible: true,
      widgetBodyClass: '',
      widgetIconClass: upClass,
      loading: false,
    };
  },
  methods: {
    toggleSettings() {
      // @ts-ignore
      this.settingsVisible = !this.settingsVisible;
    },
    toggleWidget() {
      // @ts-ignore
      this.widgetVisible = !this.widgetVisible;
    },
    setLoading(value: boolean) {
      // @ts-ignore
      this.loading = value;
    },
  },
  watch: {
    settingsVisible() {
      // @ts-ignore
      if (this.settingsVisible) {
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
    },
    widgetVisible() {
      // @ts-ignore
      if (this.widgetVisible) {
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
