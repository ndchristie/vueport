<template>
  <div class="portfolio-footer">
    <ul class="portfolio-footer-links">
      <li class="portfolio-footer-links__link" v-for="socialLink in socialLinksList">
        <a :href="socialLink.href" :text-content.prop="socialLink.name"></a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'portfolio-footer',
    computed: {
      ...mapGetters(['socialLinksList']),
    },
    created() {
      this.$store.dispatch('fetchSocialLinksList');
    },
  };
</script>
