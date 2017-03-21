<template>
  <div class="new-social-link">
    <h1>New Social Link</h1>
    <div class="vp-card">
      <h2 class="vp-card-heading vp-card-heading--small">Details</h2>
      <form class="vp-form vp-card-body" ref="form">
        <div class="vp-form-row">
          <label class="vp-form-label" for="name">Name
          </label>
          <input
            class="vp-input vp-input--fw"
            type="text"
            name="name"
            v-model="workingCopy.name"
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
            v-model="workingCopy.href"
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
  import { mapActions } from 'vuex';

  export default {
    name: 'new-social-link',
    data() {
      return {
        workingCopy: {
          name: null,
          href: null,
        },
      };
    },
    methods: {
      ...mapActions(['createSocialLink']),
      submitRequest(e) {
        if (this.$refs.form.checkValidity()) {
          e.preventDefault();
          return this.createSocialLink({
            source: this.workingCopy,
          })
          .then((data) => {
            this.$router.push(`/admin/social-links/${this.workingCopy.name}`);
            return data;
          });
        }
        return Promise.resolve();
      },
    },
  };
</script>
