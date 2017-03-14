<template>
  <div class="view-social-link card" v-if="activeSocialLink">
    <h3 class="card-header">Social Link: {{ activeSocialLink.name }}</h3>
    <div class="data-container">
      <div class="data-row">
        <label class="data-row__label">Name</label>
        <strong class="data-row__value" :text-content.prop="activeSocialLink.name"></strong>
      </div>
      <div class="data-row">
        <label class="data-row__label">HREF</label>
        <strong class="data-row__value" :text-content.prop="activeSocialLink.href"></strong>
      </div>
    </div>
    <div class="action-container">
      <div class="action-row">
        <router-link to="edit" append>Edit</router-link>
      </div>
      <div class="action-row">
        <router-link to="delete" append>Delete</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'view-social-link',
    computed: {
      ...mapGetters(['activeSocialLink']),
    },
    created() {
      const name = this.$route.params.name;
      this.$store.dispatch('fetchSocialLink', { name });
    },
  };
</script>
