<template>
<b-form v-on:submit.prevent="onSubmit">
  <b-row>
    <b-col sm="6">
      <b-form-group label="Last.fm username:" label-for="userName">
        <b-form-input id="userName"
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
    </b-col>
    <b-col sm="6">
      <b-form-group label="Chart type" label-for="type">
        <b-select id="type" v-model="type" :options="types"></b-select>
      </b-form-group>
    </b-col>
  </b-row>
	<b-row>
    <b-col sm="6">
			<b-form-group label="Start date" label-for="startDate">
				<b-form-row>
					<b-col sm="6">
						<b-form-input id="startDate"
							type="date"
							v-model="startDate"
							required>
						</b-form-input>
					</b-col>
					<b-col sm="6">
						<b-form-input id="startTime"
							type="time"
							v-model="startTime"
							required>
						</b-form-input>
					</b-col>
				</b-form-row>
			</b-form-group>
		</b-col>
		<b-col sm="6">
			<b-form-group label="End date" label-for="endDate">
				<b-form-row>
					<b-col sm="6">
						<b-form-input id="endDate"
							type="date"
							v-model="endDate"
							required>
						</b-form-input>
					</b-col>
					<b-col sm="6">
						<b-form-input id="endTime"
							type="time"
							v-model="endTime"
							required>
						</b-form-input>
					</b-col>
				</b-form-row>
			</b-form-group>
		</b-col>
	</b-row>
  <b-row>
    <b-col sm="6">
      <b-form-group label="Timezone" label-for="timezone">
		    <b-select id="timezone" v-model="timezone" :options="timezones"></b-select>
	    </b-form-group>
    </b-col>
  </b-row>
	<b-row>
    <b-col>
      <b-btn type="submit" variant="success">Go!</b-btn>
    </b-col>
  </b-row>
</b-form>
</template>

<script lang="ts">
import * as _ from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as moment from 'moment';
import 'moment-timezone';
import LastFm from './../lastfm/lastfm';
import User from '@/charts/user';
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
      endDate: '2018-01-01',
      endTime: '00:00',
      timezone: moment.tz.guess(),
      period: '',
      types: { artist: 'Artist', album: 'Album', music: 'Music' },
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
          lastfm
            .user()
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
        const user = new User(this.userName);
        this.$store.dispatch('addUser', user);
      } else {
        alert('invalid username');
      }
    },
  },
});
</script>
