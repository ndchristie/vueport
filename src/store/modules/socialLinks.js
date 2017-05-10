import { UPDATE_SOCIAL_LINKS_LIST, UPDATE_CURRENT_SOCIAL_LINK } from '@/store/mutations';
import headers from '@/store/headers';

export default {
  state: {
    active: { name: '...', href: '...' },
    list: [],
  },
  mutations: {
    [UPDATE_SOCIAL_LINKS_LIST](state, list) {
      state.list = list;
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
          const socialLink = {
            id: doc.id,
            name: doc.name,
            href: doc.href,
          };
          commit(UPDATE_CURRENT_SOCIAL_LINK, socialLink);
          return socialLink;
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
          const list = docs
            .map(doc => ({
              id: doc.id,
              name: doc.name,
              href: doc.href,
            }));
          commit(UPDATE_SOCIAL_LINKS_LIST, list);
          return list;
        });
    },
    updateSocialLink({ commit }, { source, target }) {
      return fetch(`/api/social-links/${target.name}`, {
        method: 'PUT',
        headers,
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
        headers,
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
