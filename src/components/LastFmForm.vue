<template>
<b-form v-on:submit.prevent="onSubmit">
    <div class="form-row">
        <b-form-group id="userNameInputGroup1"
            label="Last.fm username:"
            label-for="userNameInput1"
            description="We'll never share your email with anyone else.">
            <b-form-input id="userNameInput1"
                type="text"
                v-model.trim="userName"
                required
                :state="validUserName"
                aria-describedby="inputLiveFeedback"
                placeholder="Enter username">
            </b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">
                Username not found
            </b-form-invalid-feedback>
        </b-form-group>
    </div>
    <div class="form-row">
        <label>Chart type</label>
        <select v-model="type" required>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
            <option value="music">Music</option>
        </select>
    </div>
    <div class="form-row">
        <label>Initial date</label>
        <div class="form-row">
            <input type="date" v-model="startDate" required>
            <input type="time" v-model="startTime" required>
        </div>
    </div>
    <div class="form-row">
        <label>Timezone</label>
        <select v-model="timezone">
            <option v-for="zone in timezones" v-bind:value="zone" v-bind:key="zone">
                {{ zone }}
            </option>
        </select>
    </div>
    
    <input type="submit" value="Go!">
</b-form>
</template>

<script lang="ts">
import * as _ from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as moment from 'moment';
import 'moment-timezone';
import LastFm from './../lastfm/lastfm';
const lastfm = new LastFm(
  '9e85a3a06e3a65add8a29f7cacefc67e',
  'cbd096d7053a3bac648348c023db7a52',
);

export default Vue.extend({
  name: 'LastFmForm',
  data() {
    return {
      userName: '',
      type: 'music',
      startDate: '',
      startTime: '00:00',
      timezone: moment.tz.guess(),
      period: '',
      timezones: moment.tz.names(),
      timer: null,
      validUserName: false,
    };
  },
  watch: {
    userName(newUserName, oldUserName) {
      this.getUserName();
    },
  },
  methods: {
    getUserName() {
      const $this = this;
      /* console.log($this.userName); */
      _.delay(() => {
        if ($this.userName.length > 0) {
          lastfm.user()
            .getInfo($this.userName)
            .then((response) => {
              $this.validUserName = true;
              const date = new Date(
                response.data.user.registered.unixtime * 1000,
              );
              const year = date.getFullYear();
              let month = date.getMonth() + 1 + '';
              let day = date.getDate() + '';
              if (parseInt(month, 10) < 10) {
                month = '0' + month;
              }
              if (parseInt(day, 10) < 10) {
                day = '0' + day;
              }
              let hour = date.getHours() + '';
              let minute = date.getMinutes() + '';
              if (parseInt(hour, 10) < 10) {
                hour = '0' + hour;
              }
              if (parseInt(minute, 10) < 10) {
                minute = '0' + minute;
              }
              $this.startDate = year + '-' + month + '-' + day;
              /* $this.startTime = hour + ':' + minute; */
            })
            .catch((error) => {
              $this.validUserName = false;
            });
        } else {
          $this.validUserName = false;
        }
      }, 500);
    },
    onSubmit() {
      if (this.validUserName) {
        alert('hello, ' + this.userName);
      } else {
        alert('invalid username');
      }
    },
  },
});
</script>
