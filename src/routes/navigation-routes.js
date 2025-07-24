export const NAVIGATION_ROUTES = {
  // authentication routes
  login: '/login',
  set_password: '/setPassword',
  register: 'register',

  // not found
  not_found: '404',
  all_path: '*',

  // main routes
  dashboard: {
    base: '/dashboard',
    main: '',
  },
  customers: {
    base: '/customers',
    Details: {
      base: '/customers/details',
    },
  },
  inventory: {
    base: '/inventory',
    details: {
      base: '/inventory/details',
    },
  },
  workorders: {
    base: '/workorders',
  },
  jobs: {
    base: '/jobs',
    details: {
      base: '/jobs/details',
    },
  },
  employees: {
    base: '/employees',
    details: {
      base: '/employees/details/:id',
      id: '/employees/details/',
    },
  },
  empAttendence: {
    base: '/emp-attendence',
  },
  users: {
    base: '/users',
  },
  suppliers: {
    base: '/suppliers',
    details: {
      base: '/suppliers/details/:id',
      id: '/suppliers/details/',
      info: {
        base: '/suppliers/details/:supId/:id',
        id: '/suppliers/details/:supId/',
      },
    },
  },
  accounts: {
    base: '/accounts',
  },
  accounts_reports: {
    base: '/reports',
  },
};
