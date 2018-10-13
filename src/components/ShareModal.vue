<template>
  <div>
    <b-btn size="sm"
      :variant="theme === 'light' ? 'outline-dark' : 'outline-light'"
      v-b-modal.share-modal>{{ $t('word.share') }}</b-btn>
    <!-- Modal Component -->
    <b-modal id="share-modal"
      centered
      :title="$t('word.share')"
      footer-bg-variant="white"
      size="lg"
      @shown="setUp"
      ok-only>
      <b-tabs>
        <b-tab :title="$t('word.image')" active>
          <div id="image-share"></div>
        </b-tab>
        <b-tab title="Text">
          test
        </b-tab>
      </b-tabs>
    </b-modal>
    </div>
</template>
<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import User from '@/charts/user';
import domtoimage from 'dom-to-image';

export default Vue.extend({
  name: 'ShareModal',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      items: 'getUsers',
      currentUser: 'getDefaultUserName',
      theme: 'getTheme',
    }),
  },
  methods: {
    setUp() {
      setTimeout(() => {
        this.shareImage();
      }, 500);
    },
    shareImage() {
      domtoimage.toPng(document.querySelector('#chart'))
      .then((base64) => {
        const shareImage = document.querySelector('#image-share');
        shareImage.innerHTML = '';
        const img = document.createElement('img');
        img.src = base64;
        img.classList.add('img-fluid');
        shareImage.appendChild(img);
      })
      .catch((error) => {
        // console.error('oops, something went wrong!', error);
    });
    },
  },
});
</script>