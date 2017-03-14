<template>
  <div class="portfolio-header">
    <ul class="portfolio-header-links">
      <li class="portfolio-header-links__link" v-for="(link, name) in headerLinks">
        <a :href="link" :text-content.prop="name"></a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'portfolio-header',
    computed: {
      ...mapState({
        headerLinks: state => state.priorityRoutes,
      }),
    },
  };
</script>
