<template>
  <div class="portfolio-layout">
    <portfolio-header></portfolio-header>
    <router-view></router-view>
    <portfolio-footer></portfolio-footer>
  </div>
</template>

<script>
  import PortfolioFooter from '@/components/layout/PortfolioFooter';
  import PortfolioHeader from '@/components/layout/PortfolioHeader';

  export default {
    name: 'portfolio-layout',
    components: {
      PortfolioFooter,
      PortfolioHeader,
    },
  };
</script>