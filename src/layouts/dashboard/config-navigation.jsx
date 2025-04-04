import { NAVBAR_ITEMS } from './common/navigation-names';

import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import WorkIcon from '@mui/icons-material/Work';

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
    title: 'Inventory',
    name: NAVBAR_ITEMS.INVENTORY,
    path: 'inventory',
    icon: <InventoryIcon />,
    adminOnly: false,
  },
  {
    title: 'Workorders',
    name: NAVBAR_ITEMS.WORKORDERS,
    path: 'workorders',
    icon: <WorkIcon />,
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
