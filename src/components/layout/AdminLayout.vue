<template>
  <div class="admin-layout">
    <admin-header></admin-header>
    <div class="bui-container">
      <router-view></router-view>
      <router-link
        class="bui-link"
        :to="'/admin/social-links'"
      >Social Links
      </router-link>
    </div>
  </div>
</template>

<script>
  import AdminHeader from '@/components/layout/AdminHeader';

  export default {
    name: 'admin-layout',
    components: {
      AdminHeader,
    },
  };
</script>
