<template>
  <div class="edit-social-link">
    <h1>Social Link: {{ activeSocialLink.name }}</h1>
    <div class="vp-card">
      <h2 class="vp-card-heading vp-card-heading--small">Edit Details</h2>
      <form class="vp-form vp-card-body" ref="form">
        <div class="vp-form-row">
          <label class="vp-form-label" for="name">Name
          </label>
          <input
            class="vp-input vp-input--fw"
            type="text"
            id="name"
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
            id="href"
            v-model="workingCopy.href"
            required
          />
        </div>
        <div class="vp-form-row">
          <router-link :to="`/admin/social-links/${activeSocialLink.name}`">
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
  import { mapActions, mapGetters } from 'vuex';
  import _ from 'lodash';

  export default {
    name: 'edit-social-link',
    data() {
      return {
        workingCopy: {
          name: '...',
          href: '...',
        },
      };
    },
    computed: {
      ...mapGetters(['activeSocialLink']),
    },
    methods: {
      ...mapActions(['fetchSocialLink', 'newSocialLink', 'updateSocialLink']),
      fetchData() {
        return this.fetchSocialLink({ name: this.$route.params.name })
        .then((data) => {
          this.workingCopy = _.cloneDeep(data);
        })
        .catch((err) => {
          console.error(err);
          this.$router.push('/admin/social-links/');
        });
      },
      submitRequest(e) {
        if (this.$refs.form.checkValidity()) {
          e.preventDefault();
          return this.updateSocialLink({
            source: this.workingCopy,
            target: this.activeSocialLink,
          })
          .then((data) => {
            this.$router.push(`/admin/social-links/${this.workingCopy.name}`);
            return data;
          });
        }
        return Promise.resolve();
      },
    },
    created() {
      this.fetchData();
    },
  };
</script>
