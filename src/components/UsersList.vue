<template>
  <b-table outlined :items="items" :fields="fields">
    <template slot="actions" slot-scope="data">
      <b-button size="sm" class="mr-2" variant="primary" @click="changeUser(data.item.login)">
        {{ $t("chart.weekly") }}
      </b-button>
      <b-button size="sm" class="mr-2" variant="outline-danger" @click="changeUser(data.item.login)">
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
      fields: {
        login: {
          label: this.$tc('word.user', 2),
          sortable: true,
          class: 'w-50',
        },
        actions: {
          label: this.$tc('word.action', 2),
        },
      },
      // currentUser: this.$store.state.currentUser,
    };
  },
  computed: {
    ...mapGetters({
      items: 'getUsers',
      currentUser: 'getDefaultUserName',
    }),
  },
  methods: {
    changeUser(login) {
      this.$store.dispatch('setCurrentUser', login);
      this.$router.push({ name: 'weekly' });
    },
    removeUser(login) {
      this.$store.dispatch('removeUser', login);
    },
  },
});
</script>