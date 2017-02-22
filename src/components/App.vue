<template>
  <div class="app">
    <application-header></application-header>
    <application-footer></application-footer>
  </div>
</template>

<script>
  import ApplicationFooter from 'components/layout/ApplicationFooter';
  import ApplicationHeader from 'components/layout/ApplicationHeader';

  export default {
    name: 'app',
    components: {
      ApplicationFooter,
      ApplicationHeader,
    },
  };
</script>
