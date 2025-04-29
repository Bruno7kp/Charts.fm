<template>
  <div>
    <b-btn :variant="theme === 'light' ? 'danger' : 'danger'" size="sm" class="mt-2" v-b-modal="'removeu-modal-' + login">
      <font-awesome-icon :icon="['fa', 'trash']" /> {{ $t('word.remove') }}
    </b-btn>
    <!-- Modal Component -->
    <b-modal :id="'removeu-modal-' + login"
             centered
             :title="$t('word.remove')"
             :footer-bg-variant="theme === 'light' ? 'white' : 'dark'"
             :body-bg-variant="theme === 'light' ? 'white' : 'dark'"
             :header-bg-variant="theme === 'light' ? 'white' : 'dark'"
             :header-text-variant="theme === 'light' ? 'dark' : 'white'"
             :body-text-variant="theme === 'light' ? 'dark' : 'white'"
             :footer-text-variant="theme === 'light' ? 'dark' : 'white'"
             size="sm"
             :cancel-title="$t('word.cancel')"
             :ok-title="$t('word.remove')"
             @ok="onSave">
      <div class="modal-overflow">
        <p class="d-block text-center">{{ $tc("messages.confirm") }}</p>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'RemoveUserModal',
  props: {
    login: String,
  },
  computed: {
    ...mapGetters({
      theme: 'getTheme',
    }),
  },
  methods: {
    onSave() {
      this.$store.dispatch('removeUser', this.login);
      this.onClose();
    },
    onClose() {
      this.$emit('close');
    },
  },
});
</script>
<style>
.modal-overflow {
  overflow-y: auto;
  max-height: calc(100vh - 200px);
}
</style>