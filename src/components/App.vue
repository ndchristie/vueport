<template>
  <div id="app">
    <h3>{{ message }}</h3>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        message: 'Hello Vue!',
      };
    },
  };
</script>