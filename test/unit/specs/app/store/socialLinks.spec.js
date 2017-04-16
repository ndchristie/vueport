import Vuex from 'vuex';
import fetchMock from 'fetch-mock';
import socialLinks from '@/store/modules/socialLinks';

let store;
let socialLink;

describe('vuex store', () => {
  describe('socialLinks module', () => {
    beforeEach(() => {
      store = new Vuex.Store({
        modules: { socialLinks: _.cloneDeep(socialLinks) },
      });
      socialLink = { name: 'Google', href: 'http://google.com' };
    });

    afterEach(() => {
      fetchMock.restore();
    });

    it('maintains an active social link', () => {
      store.getters.activeSocialLink
        .should.have.property('name');
      store.getters.activeSocialLink
        .should.have.property('href');
    });

    it('fetches social links from the api', () => {
      fetchMock.get('*', 404);
      return store.dispatch('fetchSocialLinksList', socialLink)
        .catch((err) => {
          expect(err.message).to.equal('Not Found');
        })
        .then(() => {
          fetchMock.restore();
          const expectedLinks = Array
            .from(new Array(10), (v, i) => ({
              name: `Social Link ${i}`,
              href: `http://google.com/${i}`,
            }));
          fetchMock.get('*', expectedLinks);
          return store.dispatch('fetchSocialLinksList')
            .should.be.fulfilled
            .then((list) => {
              expectedLinks.forEach((v, i) => {
                list[i].name
                  .should.equal(v.name);
                list[i].href
                  .should.equal(v.href);
              });
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
          fetchMock.post('*', socialLink);
          return store.dispatch('createSocialLink', { source: socialLink })
            .should.be.fulfilled;
        });
    });

    it('can edit a social link and post to the api', () => {
      const updatedSocialLink = { name: 'newName' };
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
      fetchMock.get('*', []);
      fetchMock.delete('*', 503);
      return store.dispatch('deleteSocialLink', { target: socialLink })
        .catch(err => expect(err.message).to.equal('Service Unavailable'))
        .then(() => {
          fetchMock.restore();
          fetchMock.get('*', []);
          fetchMock.delete('*', 200);
          return store.dispatch('deleteSocialLink', { target: socialLink })
            .should.be.fulfilled;
        });
    });
  });
});
