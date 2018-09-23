<template>
<b-form v-on:submit.prevent="onSubmit">
  <b-row>
    <b-col>
      <b-form-group label="Last.fm username:" label-for="userName">
        <b-form-input id="userName"
            type="text"
            v-model.trim="multableUserName"
            required
            aria-describedby="inputLiveFeedback"
            placeholder="Enter username">
        </b-form-input>
      </b-form-group>
    </b-col>
  </b-row>
	<b-row>
    <b-col>
      <b-btn type="submit" variant="success">Add user</b-btn>
    </b-col>
  </b-row>
</b-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LastFm from './../lastfm';
import User from '@/charts/user';

export default Vue.extend({
  name: 'AddUser',
  props: {
    userName: String,
  },
  data() {
    return {
      multableUserName: this.userName,
    };
  },
  methods: {
    onSubmit() {
      const $this = this;
      if ($this.multableUserName.length > 0) {
        LastFm.user()
          .getInfo($this.multableUserName)
          .then((response) => {
            const date = new Date(
              response.data.user.registered.unixtime * 1000,
            );
            const user = new User($this.multableUserName, date);
            $this.$store.dispatch('addUser', user);
          })
          .catch((error) => {
            //
          });
      }
    },
  },
});
</script>
