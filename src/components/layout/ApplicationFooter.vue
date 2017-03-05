<template>
  <div class="application-footer">
    <ul class="application-footer-links">
      <li class="application-footer-links__link" v-for="(link, name) in footerLinks">
        <a :href="link" :text-content.prop="name"></a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'application-footer',
    computed: {
      ...mapState({
        footerLinks: state => state.socialLinks,
      }),
    },
  };
</script>
