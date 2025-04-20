import { Details } from '@mui/icons-material';

export const NAVIGATION_ROUTES = {
  // authentication routes
  login: 'login',
  set_password: 'setPassword',
  register: 'register',

  // not found
  not_found: '404',
  all_path: '*',

  // main routes
  dashboard: {
    base: '/dashboard',
    main: ''
  },
  customers: {
    base: '/customers',
    Details: {
      base: '/customers/details',
    },
  },
  inventory: {
    base: '/inventory',
  },
  workorders: {
    base: '/workorders',
  },
  jobs:{
    base: '/jobs',
    details: {
      base: '/jobs/details'
    }
  }
};
