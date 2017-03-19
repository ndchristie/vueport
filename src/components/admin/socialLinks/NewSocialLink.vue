<template>
  <div class="new-social-link">
    <h1>New Social Link</h1>
    <div class="vp-card">
      <h2 class="vp-card-heading vp-card-heading--small">Details</h2>
      <form class="vp-form vp-card-body" ref="form" v-if="activeSocialLink">
        <div class="vp-form-row">
          <label class="vp-form-label" for="name">Name
          </label>
          <input
            class="vp-input vp-input--fw"
            type="text"
            name="name"
            v-model="activeSocialLink.name"
            required
          />
        </div>
        <div class="vp-form-row">
          <label class="vp-form-label" for="href">HREF
          </label>
          <input
            class="vp-input vp-input--fw"
            type="url"
            name="href"
            v-model="activeSocialLink.href"
            required
          />
        </div>
        <div class="vp-form-row">
          <input
            class="vp-btn vp-btn--primary"
            type="submit"
            v-on:click="submitRequest"
          />
        </div>
      </form>
    </div>
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
        return new Promise(() => {
          if (this.$refs.form.checkValidity()) {
            e.preventDefault();
            this.$store.dispatch('createSocialLink', { socialLink: this.activeSocialLink })
              .then((data) => {
                this.$router.push(`/admin/social-links/${this.activeSocialLink.name}`);
                Promise.resolve(data);
              });
          }
        });
      },
    },
    created() {
      this.$store.dispatch('newSocialLink');
    },
  };
</script>
