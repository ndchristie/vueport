import Vuex from 'vuex';
import SocialLink from 'models/SocialLink';
import socialLinks from 'store/modules/socialLinks';
import fetchMock from 'fetch-mock';

let store;
let socialLink;

describe('vuex store', () => {
  describe('socialLinks module', () => {
    beforeEach(() => {
      store = new Vuex.Store({
        modules: { socialLinks: _.cloneDeep(socialLinks) },
      });
      socialLink = new SocialLink();
    });

    afterEach(() => {
      fetchMock.restore();
    });

    it('maintains an active social link', () => {
      expect(store.getters.activeSocialLink).to.be.instanceof(SocialLink);
    });

    it('fetches social links from the api', () => {
      fetchMock.get('*', 404);
      return store.dispatch('fetchSocialLinksList', socialLink)
        .catch((err) => {
          expect(err.message).to.equal('Not Found');
        })
        .then(() => {
          fetchMock.restore();
          const expectedLinks = Array.from(new Array(10), () => new SocialLink());
          fetchMock.get('*', expectedLinks);
          return store.dispatch('fetchSocialLinksList')
            .should.be.fulfilled
            .then(() => {
              expect(store.getters.socialLinksList).to.deep.equal(expectedLinks);
            });
        });
    });

    it('fetches a specific social link from the api', () => {
      fetchMock.get('*', 404);
      return store.dispatch('fetchSocialLink', socialLink)
        .catch((err) => {
          expect(err.message).to.equal('Not Found');
        })
        .then(() => {
          fetchMock.restore();
          const expectedLink = { name: 'test', href: 'http://test.com' };
          fetchMock.get('*', expectedLink);
          return store.dispatch('fetchSocialLink', { name: 'test' })
            .should.be.fulfilled
            .then(() => {
              expect(store.getters.activeSocialLink.name).to.equal(expectedLink.name);
              expect(store.getters.activeSocialLink.href).to.equal(expectedLink.href);
            });
        });
    });

    it('can create a social link and post to the api', () => {
      fetchMock.post('*', 503);
      return store.dispatch('createSocialLink', { source: socialLink })
        .catch(err => expect(err.message).to.equal('Service Unavailable'))
        .then(() => {
          fetchMock.restore();
          fetchMock.post('/api/social-links', socialLink);
          return store.dispatch('createSocialLink', { source: socialLink })
            .should.be.fulfilled;
        });
    });

    it('can edit a social link and post to the api', () => {
      const updatedSocialLink = new SocialLink({ name: 'newName' });
      const options = { target: socialLink, source: updatedSocialLink };
      fetchMock.put('*', 503);
      return store.dispatch('updateSocialLink', options)
        .catch(err => expect(err.message).to.equal('Service Unavailable'))
        .then(() => {
          fetchMock.restore();
          fetchMock.put('*', updatedSocialLink);
          return store.dispatch('updateSocialLink', options)
            .should.eventually.deep.equal(updatedSocialLink);
        });
    });

    it('can delete a social link via the api', () => {
      fetchMock.get('/api/social-links', []);
      fetchMock.delete(`/api/social-links/${socialLink.name}`, {});
      return store.dispatch('deleteSocialLink', { socialLink })
        .should.be.fulfilled;
    });
  });
});
