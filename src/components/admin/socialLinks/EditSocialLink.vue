<template>
  <div class="edit-social-link">
    <h1>Social Link: {{ previous.name }}</h1>
    <div class="vp-card">
      <h2 class="vp-card-heading vp-card-heading--small">Edit Details</h2>
      <form class="vp-form vp-card-body" ref="form">
        <div class="vp-form-row">
          <label class="vp-form-label" for="name">Name
          </label>
          <input
            class="vp-input vp-input--fw"
            type="text"
            name="name"
            v-model="activeSocialLink.name"
            v-if="loaded"
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
            v-if="loaded"
            required
          />
        </div>
        <div class="vp-form-row">
          <router-link :to="`/admin/social-links/${previous.name}`">
            <button class="vp-btn" type="button">
              Cancel
            </button>
          </router-link>
          <input
            class="vp-btn vp-btn--primary"
            type="submit"
            value="Update"
            v-on:click="submitRequest"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import _ from 'lodash';

  export default {
    name: 'edit-social-link',
    computed: {
      ...mapGetters(['activeSocialLink']),
    },
    data() {
      return {
        loaded: false,
        previous: { name: '...', href: '...' },
      };
    },
    methods: {
      submitRequest(e) {
        if (this.$refs.form.checkValidity()) {
          e.preventDefault();
          this.$store.dispatch('updateSocialLink', {
            previous: this.previous,
            socialLink: this.activeSocialLink,
          }).then(() => {
            this.$router.push(`/admin/social-links/${this.activeSocialLink.name}`);
          });
        }
      },
    },
    created() {
      this.$store.dispatch('fetchSocialLink', { name: this.$route.params.name })
      .then((data) => {
        this.previous = _.cloneDeep(data);
        this.loaded = true;
      });
    },
  };
</script>
