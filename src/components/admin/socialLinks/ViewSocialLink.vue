<template>
  <div class="view-social-link">
    <h1>Social Link: {{ activeSocialLink.name }}</h1>
    <div class="bui-card">
      <h2 class="bui-card__heading bui-card__heading--small">Details</h2>
      <div class="bui-card__body">
        <div class="bui-data-row">
          <label class="bui-data-label">Name</label>
          <strong class="bui-data-row-value" :text-content.prop="activeSocialLink.name"></strong>
        </div>
        <div class="bui-data-row">
          <label class="bui-data-label">HREF</label>
          <strong class="bui-data-row-value"><a
              class = 'bui-link'
              :href="activeSocialLink.href"
              :text-content.prop="activeSocialLink.href"
          ></a></strong>
        </div>
        <div class="action-row">
          <router-link
            class="bui-link"
            :to="`/admin/social-links/${activeSocialLink.name}/edit`"
          >
            <button class="bui-btn">Edit</button>
          </router-link>
          <button class="bui-btn bui-btn--no"
            v-on:click='requestDeletion()'>Delete</button>
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
      ...mapActions(['fetchSocialLink', 'deleteSocialLink']),
      fetchData() {
        return this.fetchSocialLink({ name: this.$route.params.name })
          .catch((err) => {
            console.error(err);
            this.$router.push('/admin/social-links/');
          });
      },
      requestDeletion() {
        return this.deleteSocialLink({ target: this.activeSocialLink })
          .then(() => {
            this.$router.push('/admin/social-links/');
          })
          .catch((err) => {
            console.error(err);
          });
      },
    },
    created() {
      return this.fetchData();
    },
  };
</script>
