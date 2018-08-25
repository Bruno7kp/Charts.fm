<template>
<form v-on:submit.prevent="onSubmit">
    <div class="form-row">
        <label>Last.fm username</label>
        <input type="text" v-model="username" placeholder="Last.fm username" required>
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
            <input type="date" v-model="startdate" required>
            <input type="time" v-model="starttime" required>
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

export default Vue.extend({
    name: 'LastFmForm',
    data() {
      return {
        username: null,
        type: 'music',
        startdate: null,
        starttime: null,
        timezone: moment.tz.guess(),
        period: null,
        timezones: moment.tz.names(),
      };
    },
    methods: {
        onSubmit() {
            console.log(this.username, this.type);
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
