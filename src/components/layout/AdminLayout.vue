<template>
  <div class="admin-layout">
    Admin
    <router-view></router-view>
    <router-link :to="'/admin/social-links'">Social Links</router-link>
  </div>
</template>

<script>
  export default {
    name: 'admin-layout',
  };
</script>
