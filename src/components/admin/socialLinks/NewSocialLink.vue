<template>
  <div class="new-social-link">
    <h1>New Social Link</h1>
    <div class="bui-card">
      <h2 class="bui-card__heading bui-card__heading--small">Details</h2>
      <form class="bui-form bui-card__body" ref="form">
        <div class="bui-form-row">
          <label class="bui-form-label" for="name">Name
          </label>
          <input
            class="bui-input bui-input--fw"
            type="text"
            name="name"
            v-model="workingCopy.name"
            required
          />
        </div>
        <div class="bui-form-row">
          <label class="bui-form-label" for="href">HREF
          </label>
          <input
            class="bui-input bui-input--fw"
            type="url"
            name="href"
            v-model="workingCopy.href"
            required
          />
        </div>
        <div class="bui-form-row">
          <input
            class="bui-btn bui-btn--primary"
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
