import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { NAVBAR_ITEMS } from './common/navigation-names';

import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Dashboard',
    name: NAVBAR_ITEMS.DASHBOARD,
    path: '',
    icon: <DashboardIcon />,
    adminOnly: false,
  },
  {
    title: 'Customers',
    name: NAVBAR_ITEMS.CUSTOMERS,
    path: 'customers',
    icon: <GroupIcon />,
    adminOnly: false,
  },
];

export default navConfig;
