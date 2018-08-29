<template>
<form v-on:submit.prevent="onSubmit">
    <div class="form-row">
        <label>Last.fm username</label>
        <input type="text" v-model="userName" v-on:keyup.prevent="onNameChange" placeholder="Last.fm username" required>
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
</form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as moment from 'moment';
import 'moment-timezone';
import LastFm from './../lastfm';
const lastfm = new LastFm('9e85a3a06e3a65add8a29f7cacefc67e', 'cbd096d7053a3bac648348c023db7a52');

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
    methods: {
        onSubmit() {
            if (this.validUserName) {
                alert('hello, ' + this.userName);
            }
        },
        onNameChange() {
            if (this.userName.length > 0) {
                if (this.timer) {
                    // @ts-ignore
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                // @ts-ignore
                this.timer = setTimeout(() => {
                    const $this = this;
                    lastfm.getUserInfo($this.userName)
                    .then((response) => {
                        $this.validUserName = true;
                        const date = new Date(response.data.user.registered.unixtime * 1000);
                        const year = date.getFullYear();
                        let month = (date.getMonth() + 1) + '';
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
                        $this.startDate =  year + '-' + month + '-' + day;
                        $this.startTime = hour + ':' + minute;
                    })
                    .catch((error) => {
                        $this.validUserName = false;
                    });
                }, 800);
            }
        },
    },
 });
</script>

<style lang="scss" scoped>
form {
    max-width: 30em;
    display: grid;
    grid-gap: .6em 0;
    margin: 0 auto;
}
form .form-row {
    display: flex;
    width: 100%;
}
form label {
  display: block;
  width: 50%;
}

input, select {
    font-size: 1em;
    border: 1px black solid;
    width: 100%;
}
</style>
