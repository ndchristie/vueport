<template>
  <div class="view-social-link">
    <h1>Social Link: {{ activeSocialLink.name }}</h1>
    <div class="vp-card">
      <h2 class="vp-card-heading vp-card-heading--small">Details</h2>
      <div class="vp-card-body">
        <div class="vp-data-row">
          <label class="vp-data-label">Name</label>
          <strong class="vp-data-row-value" :text-content.prop="activeSocialLink.name"></strong>
        </div>
        <div class="vp-data-row">
          <label class="vp-data-label">HREF</label>
          <strong class="vp-data-row-value" :text-content.prop="activeSocialLink.href"></strong>
        </div>
        <div class="action-row">
          <router-link
            class="vp-link"
            :to="`/admin/social-links/${activeSocialLink.name}/edit`"
          >
            <button class="vp-btn vp-btn--primary">Edit</button>
          </router-link>
          <router-link
            class="vp-link vp-link--alarm"
            :to="`/admin/social-links/${activeSocialLink.name}/delete`"
          >
            <button class="vp-btn vp-btn--alarm">Delete</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'view-social-link',
    computed: {
      ...mapGetters(['activeSocialLink']),
    },
    methods: {
      ...mapActions(['fetchSocialLink']),
      fetchData() {
        return this.fetchSocialLink({ name: this.$route.params.name })
        .catch((err) => {
          console.error(err);
          this.$router.push('/admin/social-links/');
        });
      },
    },
    created() {
      return this.fetchData();
    },
  };
</script>
