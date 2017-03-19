<template>
  <div class="social-links">
    <h1>Social Links</h1>
    <div class="vp-card">
      <h2 class="vp-card-heading vp-card-heading--small">Active Links</h2>
      <div class="vp-card-body">
        <router-link
          class="vp-link"
          to="/admin/social-links/new"
        >New Social Link</router-link>
      </div>
      <ul class="vp-list">
        <li class="vp-list-item vp-tile vp-tile--small" v-for="socialLink in socialLinksList">
          <span :text-content.prop="socialLink.name"></span>
          <span style="float: right;">
            <router-link
              class="vp-link"
              :to="`/admin/social-links/${socialLink.name}`"
            >View</router-link>
            <router-link
              class="vp-link"
              :to="`/admin/social-links/${socialLink.name}/edit`"
            >Edit</router-link>
            <router-link
              class="vp-link vp-link--alarm"
              :to="`/admin/social-links/${socialLink.name}/delete`"
            >Delete</router-link>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'social-links-list',
    computed: {
      ...mapGetters(['socialLinksList']),
    },
    created() {
      this.$store.dispatch('fetchSocialLinksList');
    },
    methods: {
      ...mapActions(['deleteSocialLink']),
    },
  };
</script>
