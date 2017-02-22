<template>
  <div class="application-header">
    <ul class="application-header-links">
      <li class="application-header-links__link" v-for="(link, name) in headerLinks">
        <a :href="link" :text-content.prop="name">
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'application-header',
    computed: {
      ...mapState({
        headerLinks: state => state.priorityRoutes,
      }),
    },
  };
</script>
