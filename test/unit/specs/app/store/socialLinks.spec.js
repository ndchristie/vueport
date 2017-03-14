import Vuex from 'vuex';
import SocialLink from 'models/SocialLink';
import socialLinks from 'store/modules/socialLinks';
import fetchMock from 'fetch-mock';

describe('vuex store', () => {
  describe('socialLinks module', () => {
    let store;

    beforeEach(() => {
      store = new Vuex.Store({
        modules: { socialLinks: _.cloneDeep(socialLinks) },
      });
    });

    afterEach(() => {
      fetchMock.restore();
    });

    it('maintains an active social link', () => {
      expect(store.state.socialLinks.active).to.be.null;
      store.dispatch('newSocialLink');
      expect(store.getters.activeSocialLink).to.be.instanceof(SocialLink);
    });

    it('fetches a stored socialLink from the api', (done) => {
      fetchMock.get('*', { name: 'testLink', href: '#' });
      store.dispatch('fetchSocialLink', { name: 'testLink' })
        .should.be.fulfilled
        .then(() => {
          expect(store.getters.activeSocialLink.name).to.equal('testLink');
          expect(store.getters.activeSocialLink.href).to.equal('#');
          done();
        });
    });

    it('can create a socialLink and post to the api', (done) => {
      const socialLink = new SocialLink({ name: 'testLink' });
      fetchMock.post('/api/social-links', 200);
      store.dispatch('createSocialLink', { socialLink })
        .should.be.fulfilled
        .then(() => {
          done();
        });
    });

    it('can edit a socialLink and post to the api', (done) => {
      const socialLink = new SocialLink({ name: 'testLink' });
      fetchMock.put(`/api/social-links/${socialLink.name}`, 200);
      store.dispatch('updateSocialLink', { previous: socialLink, socialLink })
        .should.be.fulfilled
        .then(() => {
          done();
        });
    });

    it('can delete a socialLink via the api', (done) => {
      const socialLink = new SocialLink({ name: 'testLink' });
      fetchMock.get('/api/social-links', []);
      fetchMock.delete(`/api/social-links/${socialLink.name}`, {});
      store.dispatch('deleteSocialLink', { socialLink })
        .should.be.fulfilled
        .then(() => {
          done();
        });
    });
  });
});
