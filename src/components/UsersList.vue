<template>
  <b-table outlined :items="items" :fields="fields" :dark="theme === 'dark'" :bordered="true">
    <template #cell(actions)="data">
      <b-button size="sm" class="mr-2" variant="primary" @click="changeUser(data.item.login)">
        {{ $t("chart.weekly") }}
      </b-button>
      <b-button size="sm" class="mr-2" variant="outline-danger" @click="removeUser(data.item.login)">
        <font-awesome-icon :icon="['fa', 'trash']" />
      </b-button>
    </template>
  </b-table>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import User from '@/charts/user';

export default Vue.extend({
  name: 'UsersList',
  data() {
    return {
      fields: [
        {
          key: 'login',
          label: this.$tc('word.user', 2),
          sortable: true,
          class: 'w-50',
        },
        {
          key: 'actions',
          label: this.$tc('word.action', 2),
        },
      ],
      // currentUser: this.$store.state.currentUser,
    };
  },
  computed: {
    ...mapGetters({
      items: 'getUsers',
      currentUser: 'getDefaultUserName',
    }),
    theme() {
      return this.$store.getters.getTheme;
    },
  },
  methods: {
    changeUser(login) {
      this.$store.dispatch('setCurrentUser', login);
      this.$router.push({ name: 'weekly' });
    },
    removeUser(login) {
      let ok = confirm(this.$tc('messages.confirm'));
      if (ok) {
        this.$store.dispatch('removeUser', login);
      }
    },
  },
});
</script>