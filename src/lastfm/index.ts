import LastFmApiWrapper from './lastfm';
const LastFm = new LastFmApiWrapper(process.env.VUE_APP_LAST_FM_KEY);
export default LastFm;
