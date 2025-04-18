<template>
  <div>
    <b-container class="my-3">
      <b-row>
        <b-col>
          <h1 class="post-title">{{ $t(`blog.${slug}.title`) }}</h1>
          <span class="small text-danger">
          <font-awesome-icon :icon="['fas', 'calendar']" fixed-width/><time pubdate>{{ $t(`blog.${slug}.date`) }}</time>
          </span>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12">
          <b-card :header-bg-variant="theme === 'light' ? 'dark' : 'white'"
                  :header-text-variant="theme === 'light' ? 'white' : 'dark'"
                  border-variant="dark"
                  :bg-variant="theme === 'light' ? 'white' : 'dark'"
                  :text-variant="theme === 'light' ? 'dark' : 'white'"
                  class="mt-3 shadow border-0"
          >
            <p v-html="$t(`blog.${slug}.content`)"></p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import 'moment-timezone';
import { mapGetters } from "vuex";

export default Vue.extend({
  name: 'Blog',
  props: ['slug'],
  data() {
    return {
      themes: ['light', 'dark'],
    };
  },
  computed: {
    ...mapGetters({
      theme: 'getTheme',
    }),
  },
});
</script>
