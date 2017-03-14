<template>
  <div class="edit-social-link">
    <form ref="form">
      <fieldset v-if="activeSocialLink">
        <div class="form-row">
          <label for="name">Name
          </label>
          <input
            type="text"
            name="name"
            v-model="activeSocialLink.name"
            required
          />
        </div>
        <div class="form-row">
          <label for="href">HREF
          </label>
          <input
            type="url"
            name="href"
            v-model="activeSocialLink.href"
            required
          />
        </div>
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
  import _ from 'lodash';

  export default {
    name: 'edit-social-link',
    computed: {
      ...mapGetters(['activeSocialLink']),
    },
    data() {
      return {
        previous: null,
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
      });
    },
  };
</script>
