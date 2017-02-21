<template>
  <div id="app">
    <h3 v-bind:text-content.prop="message"></h3>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: 'Hello Vue!',
      };
    },
  };
</script>
