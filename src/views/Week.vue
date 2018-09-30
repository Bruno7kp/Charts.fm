<template>
  <div>
    <b-container>
      <b-row>
        <b-col sm="12" md="6">
          <b-card 
            header-bg-variant="danger" 
            header-text-variant="white"
            border-variant="danger" 
            class="mt-3"
            no-body
          >
            <h5 slot="header" class="mb-0">
              <i class="fa fa-list-ol"></i> Weekly Charts
              <i @click="toggleWidget" :class="widgetIconClass"></i>
            </h5>
            <b-card-body :class="widgetBodyClass">
              <WeeklyWidget v-bind:user.sync="user" v-bind:loading.sync="loading" @updateLoading="setLoading" />
            </b-card-body>
          </b-card>
        </b-col>
        <b-col sm="12" md="6">
          <b-card 
            header-bg-variant="dark" 
            header-text-variant="white"
            border-variant="dark" 
            class="mt-3"
            no-body
          >
            <h5 slot="header" class="mb-0">
              <i class="fa fa-cog"></i> Settings
              <i @click="toggleSettings" :class="settingsIconClass"></i>
            </h5>
            <b-card-body :class="settingsBodyClass">
              <WeeklyForm v-bind:user.sync="user" v-bind:loading.sync="loading" />
            </b-card-body>
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
@Component({
  components: {
    WeeklyForm,
    WeeklyWidget,
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
      settingsIconClass: 'fa fa-chevron-up float-right pt-1',
      widgetVisible: true,
      widgetBodyClass: '',
      widgetIconClass: 'fa fa-chevron-up float-right pt-1',
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
        this.settingsIconClass = 'fa fa-chevron-up float-right pt-1';
      } else {
        // @ts-ignore
        this.settingsBodyClass = 'd-none';
        // @ts-ignore
        this.settingsIconClass = 'fa fa-chevron-down float-right pt-1';
      }
    },
    widgetVisible() {
      // @ts-ignore
      if (this.widgetVisible) {
        // @ts-ignore
        this.widgetBodyClass = '';
        // @ts-ignore
        this.widgetIconClass = 'fa fa-chevron-up float-right pt-1';
      } else {
        // @ts-ignore
        this.widgetBodyClass = 'd-none';
        // @ts-ignore
        this.widgetIconClass = 'fa fa-chevron-down float-right pt-1';
      }
    },
  },
})
export default class Week extends Vue {}
</script>
