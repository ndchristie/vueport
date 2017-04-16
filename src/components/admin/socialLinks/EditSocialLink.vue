<template>
  <div class="edit-social-link">
    <h1>Social Link: {{ activeSocialLink.name }}</h1>
    <div class="bui-card">
      <h2 class="bui-card__heading bui-card__heading">Edit Details
      </h2>
      <form class="bui-form bui-card__body" ref="form">
        <div class="bui-form-row">
          <label class="bui-form-label" for="name">Name
          </label>
          <input
            class="bui-input bui-input--fw"
            type="text"
            id="name"
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
            id="href"
            v-model="workingCopy.href"
            required
          />
        </div>
        <div class="bui-form-row">
          <router-link
            class="bui-btn bui-btn--primary bui-btn--inverse"
            :to="`/admin/social-links/${activeSocialLink.name}`"
          >Cancel</router-link>
          <input
            class="bui-btn bui-btn--primary"
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
