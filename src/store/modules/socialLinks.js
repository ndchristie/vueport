import SocialLink from 'models/SocialLink';

const UPDATE_SOCIAL_LINKS_LIST = 'UPDATE_SOCIAL_LINKS_LIST';
const UPDATE_CURRENT_SOCIAL_LINK = 'UPDATE_CURRENT_SOCIAL_LINK';

export default {
  state: {
    active: { name: '...', href: '...' },
    list: [],
  },
  mutations: {
    [UPDATE_SOCIAL_LINKS_LIST](state, socialLinks) {
      state.list = socialLinks;
    },
    [UPDATE_CURRENT_SOCIAL_LINK](state, socialLink) {
      state.active = socialLink;
    },
  },
  getters: {
    socialLinksList(state) {
      return state.list;
    },
    activeSocialLink(state) {
      return state.active;
    },
  },
  actions: {
    fetchSocialLink({ commit }, { name }) {
      return fetch(`/api/social-links/${name}`)
        .then(res => res.json())
        .then((doc) => {
          commit(UPDATE_CURRENT_SOCIAL_LINK, new SocialLink(doc));
          return doc;
        });
    },
    fetchSocialLinksList({ commit }) {
      return fetch('/api/social-links')
        .then(res => res.json())
        .then((docs) => {
          commit(UPDATE_SOCIAL_LINKS_LIST, docs.map(doc => new SocialLink(doc)));
          return docs;
        });
    },
    newSocialLink({ commit }) {
      return commit(UPDATE_CURRENT_SOCIAL_LINK, new SocialLink());
    },
    updateSocialLink({ commit }, { previous, socialLink }) {
      return fetch(`/api/social-links/${previous.name}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: socialLink.name,
          href: socialLink.href,
        }),
      });
    },
    createSocialLink({ commit }, { socialLink }) {
      return fetch('/api/social-links', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: socialLink.name,
          href: socialLink.href,
        }),
      });
    },
    deleteSocialLink({ dispatch }, { socialLink }) {
      return fetch(`/api/social-links/${socialLink.name}`, {
        method: 'DELETE',
      }).then(res => res.json())
        .then(() => {
          dispatch('fetchSocialLinksList');
        });
    },
  },
};
