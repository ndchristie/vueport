<template>
  <div class="social-links">
    <h1>Social Links</h1>
    <div class="bui-card">
      <h2 class="bui-card__heading bui-card__heading--small">Active Links</h2>
      <div class="bui-card__body">
        <router-link
          class="bui-link"
          to="/admin/social-links/new"
        >New Social Link</router-link>
        <ul class="bui-list">
          <li class="bui-list-item bui-tile bui-tile--small" v-for="socialLink in socialLinksList">
            <span :text-content.prop="socialLink.name"></span>
            <span>(<a
              class="bui-link"
              :href="socialLink.href"
              :text-content.prop="socialLink.href"
            ></a>)</span>
            <span>
              <router-link
                class="bui-link"
                :to="`/admin/social-links/${socialLink.name}`"
              >View</router-link>
              <router-link
                class="bui-link"
                :to="`/admin/social-links/${socialLink.name}/edit`"
              >Edit</router-link>
              <a
                href="" onclick="return false;"
                class="bui-link bui-link--alarm"
                v-on:click="requestDeletion(socialLink)"
              >Delete</a>
            </span>
          </li>
        </ul>
      </div>
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
    methods: {
      ...mapActions(['fetchSocialLinksList', 'deleteSocialLink']),
      requestDeletion(target) {
        return this.deleteSocialLink({ target })
          .catch((err) => {
            console.error(err);
          });
      },
    },
    created() {
      this.fetchSocialLinksList();
    },
  };
</script>
