import SocialLink from 'models/SocialLink';

const UPDATE_SOCIAL_LINKS_LIST = 'UPDATE_SOCIAL_LINKS_LIST';
const UPDATE_CURRENT_SOCIAL_LINK = 'UPDATE_CURRENT_SOCIAL_LINK';

export default {
  state: {
    active: new SocialLink({ name: '...', href: '...' }),
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
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((doc) => {
          commit(UPDATE_CURRENT_SOCIAL_LINK, new SocialLink(doc));
          return doc;
        });
    },
    fetchSocialLinksList({ commit }) {
      return fetch('/api/social-links')
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((docs) => {
          commit(UPDATE_SOCIAL_LINKS_LIST, docs.map(doc => new SocialLink(doc)));
          return docs;
        });
    },
    updateSocialLink({ commit }, { source, target }) {
      return fetch(`/api/social-links/${target.name}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: source.name,
          href: source.href,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        });
    },
    createSocialLink({ commit }, { source }) {
      return fetch('/api/social-links', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: source.name,
          href: source.href,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        });
    },
    deleteSocialLink({ dispatch }, { target }) {
      return fetch(`/api/social-links/${target.name}`, { method: 'DELETE' })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return dispatch('fetchSocialLinksList');
        });
    },
  },
};
