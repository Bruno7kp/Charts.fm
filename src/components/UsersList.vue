<template>
  <b-table outlined :items="items" :fields="fields">
    <template slot="actions" slot-scope="data">
      <b-button size="sm" class="mr-2" variant="danger" @click="removeUser(data.item.login)">
        Remove
      </b-button>
    </template>
    <template slot="defaultUser" slot-scope="data">
      <b-form-radio name="currentUser" @change="changeUser(data.item.login)" v-model="currentUser" :value="data.item.login"></b-form-radio>
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
        defaultUser: {
          label: 'Default',
          class: 'w-25',
        },
        login: {
          label: 'User',
          sortable: true,
          class: 'w-50',
        },
        actions: {
          label: 'Actions',
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
    },
    removeUser(login) {
      this.$store.dispatch('removeUser', login);
    },
  },
});
</script>