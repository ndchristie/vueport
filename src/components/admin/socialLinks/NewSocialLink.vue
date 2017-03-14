<template>
  <div class="new-social-link">
    <form>
      <fieldset v-if="activeSocialLink">
        <input
          type="text"
          name="name"
          v-model="activeSocialLink.name"
          required
        />
        <input
          type="url"
          name="href"
          v-model="activeSocialLink.href"
          required
        />
      </fieldset>
      <input
        type="submit"
        v-on:click="submitRequest"
      />
    </form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'new-social-link',
    computed: {
      ...mapGetters(['activeSocialLink']),
    },
    methods: {
      submitRequest(e) {
        e.preventDefault();
        this.$store.dispatch('createSocialLink', { socialLink: this.activeSocialLink });
      },
    },
    created() {
      this.$store.dispatch('newSocialLink');
    },
  };
</script>
