<template>
  <div class="social-links">
    <router-link to="new" append>New Social Link</router-link>
    <ul class="social-links-links">
      Social Links
      <li class="social-links-links__link" v-for="socialLink in socialLinksList">
        <span :href="socialLink.href" :text-content.prop="socialLink.name"></span>
        <router-link :to="socialLink.name" append>View</router-link>
        <router-link :to="`${socialLink.name}/edit`" append>Edit</router-link>
        <router-link :to="`${socialLink.name}/delete`" append>Delete</router-link>
      </li>
    </ul>
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
