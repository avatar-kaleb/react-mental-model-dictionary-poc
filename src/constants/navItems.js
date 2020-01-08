export const PUBLIC_NAV_ITEMS = [
  {
    exact: true,
    label: 'Dictionary',
    to: '/',
    icon: 'book'
  },
  {
    exact: true,
    label: 'About Mental Models',
    to: '/about-mental-models',
    icon: 'help'
  },
  {
    exact: true,
    label: 'About the Project',
    to: '/about-the-project',
    icon: 'info'
  }
];

export const AUTH_NAV_ITEMS = [
  ...PUBLIC_NAV_ITEMS
  // TODO: ADD profile page in the future
  // {
  //   exact: true,
  //   label: 'Profile',
  //   to: '/profile',
  //   icon: 'person'
  // }
];

export const ADMIN_NAV_ITEMS = [
  ...AUTH_NAV_ITEMS,
  {
    exact: true,
    label: 'Admin',
    to: '/admin',
    icon: 'settings'
  }
];
