<template>
  <div>
    <b-container class="my-3">
      <b-row>
        <b-col>
          <h1 :class="['post-title', theme === 'light' ? 'text-dark' : 'text-light']">Blog</h1>
        </b-col>
      </b-row>
      <b-row v-for="post in posts" :key="post">
        <b-col sm="12">
          <b-card :header-bg-variant="theme === 'light' ? 'dark' : 'white'"
                  :header-text-variant="theme === 'light' ? 'white' : 'dark'"
                  border-variant="dark"
                  :bg-variant="theme === 'light' ? 'white' : 'dark'"
                  :text-variant="theme === 'light' ? 'dark' : 'white'"
                  class="mt-3 shadow border-0"
          >
            <h2 class="post-title"><router-link :to="{ name: 'post', params: { slug: post} }">{{ $t(`blog.${post}.title`) }}</router-link></h2>
            <span class="small text-danger">
            <font-awesome-icon :icon="['fas', 'calendar']" fixed-width/><time pubdate>{{ $t(`blog.${post}.date`) }}</time>
            </span>
            <p class="post-short" v-html="$t(`blog.${post}.content`)"></p>
            <b-button variant="outline-danger" :to="{ name: 'post', params: { slug: post} }">{{ $t('messages.read_more') }}</b-button>
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
  data() {
    return {
      posts: [
        'dropouts_and_rank_unties',
        'first_stats_update',
      ],
    };
  },
  computed: {
    ...mapGetters({
      theme: 'getTheme',
    }),
  }
});
</script>
<style>
.t-dark h1.post-title {
  color: white;
}
.t-dark .post-title a {
  color: white;
  text-decoration: underline;
}
.t-light .post-title a {
  color: black;
  text-decoration: underline;
}
.post-short {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>