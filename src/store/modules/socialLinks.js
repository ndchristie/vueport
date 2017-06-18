import { UPDATE_SOCIAL_LINKS_LIST, UPDATE_ACTIVE_SOCIAL_LINK } from '@/store/mutations';
import { headers, jsonResponse } from '@/store/common';

const serializeSocialLink = source => JSON.stringify({
  name: source.name,
  href: source.href,
});

const socialLinkFactory = source => Object.create({
  id: source.id,
  name: source.name,
  href: source.href,
});

export default {
  state: {
    active: { name: '...', href: '...' },
    list: [],
  },
  mutations: {
    [UPDATE_SOCIAL_LINKS_LIST](state, list) {
      state.list = list;
    },
    [UPDATE_ACTIVE_SOCIAL_LINK](state, socialLink) {
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
        .then(jsonResponse)
        .then((doc) => {
          const socialLink = socialLinkFactory(doc);
          commit(UPDATE_ACTIVE_SOCIAL_LINK, socialLink);
          return socialLink;
        });
    },
    fetchSocialLinksList({ commit }) {
      return fetch('/api/social-links')
        .then(jsonResponse)
        .then((docs) => {
          const list = docs.map(socialLinkFactory);
          commit(UPDATE_SOCIAL_LINKS_LIST, list);
          return list;
        });
    },
    updateSocialLink({ commit }, { source, target }) {
      return fetch(`/api/social-links/${target.name}`, {
        method: 'PUT',
        headers,
        body: serializeSocialLink(source),
      })
        .then(jsonResponse);
    },
    createSocialLink({ commit }, { source }) {
      return fetch('/api/social-links', {
        method: 'POST',
        headers,
        body: serializeSocialLink(source),
      })
        .then(jsonResponse);
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
