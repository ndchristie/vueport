import AdminLayout from 'components/layout/AdminLayout';
import SocialLinksList from 'components/admin/socialLinks/SocialLinksList';
import EditSocialLink from 'components/admin/socialLinks/EditSocialLink';
import NewSocialLink from 'components/admin/socialLinks/NewSocialLink';
import ViewSocialLink from 'components/admin/socialLinks/ViewSocialLink';

const socialLinksIndex = {
  path: 'social-links',
  component: SocialLinksList,
};

const newSocialLink = {
  path: 'social-links/new',
  component: NewSocialLink,
};

const viewSocialLink = {
  path: 'social-links/:name',
  component: ViewSocialLink,
};

const editSocialLink = {
  path: 'social-links/:name/edit',
  component: EditSocialLink,
};

const adminIndexRoute = {
  path: '/admin',
  component: AdminLayout,
  children: [
    socialLinksIndex,
    newSocialLink,
    viewSocialLink,
    editSocialLink,
  ],
};

export default [
  adminIndexRoute,
];
