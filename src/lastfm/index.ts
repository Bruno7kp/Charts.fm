import LastFmApiWrapper from './lastfm';
console.log(process.env);
const LastFm = new LastFmApiWrapper(process.env.VUE_APP_LAST_FM_KEY);
export default LastFm;
