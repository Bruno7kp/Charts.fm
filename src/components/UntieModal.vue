<template>
  <div>
    <b-btn :variant="theme === 'light' ? 'outline-dark' : 'outline-light'" size="sm" class="mt-2" v-b-modal.untie-modal>
      <font-awesome-icon :icon="['fa', 'edit']" /> {{ $t('chart.untie') }}
    </b-btn>
    <!-- Modal Component -->
    <b-modal id="untie-modal"
             centered
             :title="$t('chart.untie')"
             :footer-bg-variant="theme === 'light' ? 'white' : 'dark'"
             :body-bg-variant="theme === 'light' ? 'white' : 'dark'"
             :header-bg-variant="theme === 'light' ? 'white' : 'dark'"
             :header-text-variant="theme === 'light' ? 'dark' : 'white'"
             :body-text-variant="theme === 'light' ? 'dark' : 'white'"
             :footer-text-variant="theme === 'light' ? 'dark' : 'white'"
             size="lg"
             :cancel-title="$t('word.cancel')"
             :ok-title="$t('word.save')"
             @ok="onSave"
             @hidden="loading = true"
             @shown="setUp">
      <div v-if="loading">
        <font-awesome-icon :icon="['fa', 'sync-alt']" spin /> {{ $t('chart.loading') }}
      </div>
      <div class="modal-overflow" v-else>
        <p class="d-block text-center">{{ $t("chart.untie_description") }}</p>
        <b-table-simple
          responsive="lg"
          :small="true"
          :dark="theme === 'dark'">
          <b-thead>
            <b-tr>
              <b-th style="width: 60px">{{ $t("chart.rank") }}</b-th>
              <b-th>{{ $t("word.title")  }}</b-th>
              <b-th class="text-right">{{ $t("chart.plays") }}</b-th>
            </b-tr>
          </b-thead>
        </b-table-simple>
        <b-table-simple
            responsive="lg"
            :small="true"
            :striped="group.length === 1"
            :dark="theme === 'dark'"
            :class="{ 'm-0': true }"
            :style="{ 'border': group.length === 1 ? 'none' : '1px solid #dc3545' }"
            v-for="(group, key) in grouped"
            :key="key">
          <draggable
              :class="{ [`cursor-grabbing`]: drag === true }"
              v-model="grouped[key]"
              :group="key"
              @start="drag = true"
              @end="drag = false"
              @change="change($event, key)"
              tag="tbody"
              filter=".ignore"
          >
            <b-tr v-for="item in group" :key="item.name" :class="{ ['ignore']: group.length === 1}">
              <b-td class="text-center" style="width: 30px">
                <font-awesome-icon :icon="['fa', group.length > 1 ? 'arrows-alt-v' : 'ban']" />
              </b-td>
              <b-td class="text-center" style="width: 30px">
                {{ item.rank }}
              </b-td>
              <b-td>
                <span class="d-block">{{ item.name }}</span>
                <span class="d-block sub" v-if="type !== 'artists'">{{ item.artist }}</span>
              </b-td>
              <b-td class="text-right pr-3">{{ item.playcount }}</b-td>
            </b-tr>
          </draggable>
        </b-table-simple>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import User from '@/charts/user';
import {fixedStartDate, getWeeklyList, Week} from "@/charts";
import draggable from "vuedraggable";
import {moveItem} from "@/charts/helpers";

export default Vue.extend({
  name: 'UntieModal',
  components: {
    draggable,
  },
  props: {
    user: Object,
    id: Number,
    chart: String,
    type: String,
  },
  data() {
    return {
      items: null,
      loading: false,
      drag: false,
    };
  },
  computed: {
    ...mapGetters({
      theme: 'getTheme',
    }),
    weeklyList() {
      const limit = this.user.weeklyCharts.limit;
      const realStart = fixedStartDate(this.user.weeklyCharts.startDate, this.user.weeklyCharts.startDay);
      return getWeeklyList(realStart, new Date(), limit);
    },
    grouped() {
      let groups = [];
      let plays = 0, index = -1;
      if (this.items) {
        for (let i = 0; i < this.items.length; i++) {
          if (plays !== this.items[i].playcount) {
            plays = this.items[i].playcount;
            groups.push([]);
            index++;
          }
          groups[index].push(this.items[i]);
        }
      }
      return groups;
    },
  },
  methods: {
    setUp() {
      this.loading = true;
      const i = this.id;
      const week = this.weeklyList[i];
      week.setUntied(true);
      let p = Promise.resolve();
      // @ts-ignore
      p = p.then(() => new Promise((resolve) => {
        week.load(this.user.login)
            .then((response) => {
              this.items = this.sortByCurrentWeek(this.type, week[this.type], this.user.weeklyCharts.weeks[i][this.type]);
              this.loading = false;
              resolve();
            })
            .catch((e) => {
              this.$notify({
                group: 'app',
                type: 'error',
                title: this.$t('messages.error') + '',
                text: this.$t('messages.error_connection') + '',
              });
            });
      }));
    },
    sortByCurrentWeek(type, list, current) {
      let out = current.length;
      for (let i = 0; i < list.length; i++) {
        let index = 0;
        if (type === 'artists') {
          index = current.findIndex(obj => obj.name.toLowerCase() === list[i].name.toLowerCase());
        } else {
          index = current.findIndex(obj => obj.name.toLowerCase() === list[i].name.toLowerCase() && obj.artist.toLowerCase() === list[i].artist.toLowerCase());
        }
        if (index === -1) {
          index = out;
          out++;
        }
        const change = index - i;
        if (change === 0) {
          continue;
        }
        list[i].rank = list[i].rank + change;
      }
      return list.sort((a, b) => a.rank - b.rank);
    },
    change(item, key) {
      let index = 0;
      if (this.type === 'artists') {
        index = this.items.findIndex(obj => obj.name.toLowerCase() === item.moved.element.name.toLowerCase());
      } else {
        index = this.items.findIndex(obj => obj.name.toLowerCase() === item.moved.element.name.toLowerCase() && obj.artist.toLowerCase() === item.moved.element.artist.toLowerCase());
      }
      const change = item.moved.newIndex - item.moved.oldIndex;
      this.items[index].rank = this.items[index].rank + change;
      if (change > 0) {
        for (let i = index + 1; i < index + change + 1; i++) {
          this.items[i].rank = this.items[i].rank - 1;
        }
      } else {
        for (let i = index + change; i < index; i++) {
          this.items[i].rank = this.items[i].rank + 1;
        }
      }
      this.items.sort((a, b) => a.rank - b.rank);
    },
    onSave() {
      const limit = this.user.weeklyCharts.limit;
      this.user.weeklyCharts.weeks[this.id][this.type] = this.items.slice(0, limit);
      this.$notify({
        group: 'app',
        type: 'success',
        duration: 2500,
        title: this.$t('messages.untie_complete') + '',
        text: this.$t('messages.untie_complete_sub') + '',
      });
      this.$store.dispatch('updateUser', this.user);
      setTimeout(() => {
        window.location.reload();
      }, 2500)
    }
  },
});
</script>
<style>
.modal-overflow {
  overflow-y: auto;
  max-height: calc(100vh - 200px);
}
</style>