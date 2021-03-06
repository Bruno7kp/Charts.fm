<template>
<b-form v-on:submit.prevent="onSubmit">
  <b-row>
    <b-col>
      <b-input-group>
        <b-input-group-prepend>
          <b-btn href="https://last.fm" target="_blank" variant="danger">
            <font-awesome-icon :icon="['fab', 'lastfm']" />
          </b-btn>
        </b-input-group-prepend>
        <b-form-input id="userName"
            class="border-danger"
            type="text"
            v-model.trim="multableUserName"
            :formatter="format"
            required
            aria-describedby="inputLiveFeedback"
            :placeholder="$t('lastfm.username')">
        </b-form-input>
        <b-input-group-append>
          <b-btn type="submit" variant="outline-danger">{{ $t("word.continue") }}</b-btn>
        </b-input-group-append>
      </b-input-group>
    </b-col>
  </b-row>
</b-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LastFm from '@/lastfm';
import { User } from '@/charts';

export default Vue.extend({
  name: 'AddUser',
  props: {
    userName: String,
    redirect: {
      type: Boolean,
      default: false,
    },
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
            if (this.redirect) {
              this.$router.push({ name: 'weekly' });
            }
          })
          .catch((error) => {
            this.$notify({
              group: 'app',
              type: 'error',
              duration: 10000,
              title: 'Oops, something went wrong. Possible problems:',
              text: '<ul>' +
              '<li>You are not connected to the internet.</li>' +
              '<li>Your Last.fm username is incorrect</li></ul>',
            });
          });
      }
    },
    format(value: string, event: any) {
      return value.toLowerCase();
    },
  },
});
</script>
