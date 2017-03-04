<template>
  <div class="application-layout">
    <application-header></application-header>
    <router-view></router-view>
    <application-footer></application-footer>
  </div>
</template>

<script>
  import ApplicationFooter from 'components/layout/ApplicationFooter';
  import ApplicationHeader from 'components/layout/ApplicationHeader';

  export default {
    name: 'application-layout',
    components: {
      ApplicationFooter,
      ApplicationHeader,
    },
  };
</script>
