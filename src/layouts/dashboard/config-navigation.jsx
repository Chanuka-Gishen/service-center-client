import { NAVBAR_ITEMS } from './common/navigation-names';

import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import WorkIcon from '@mui/icons-material/Work';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HailIcon from '@mui/icons-material/Hail';

import { USER_ROLE } from 'src/constants/user-role';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Dashboard',
    name: NAVBAR_ITEMS.DASHBOARD,
    path: '',
    icon: <DashboardIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.STAFF],
  },
  {
    title: 'Active Jobs',
    name: NAVBAR_ITEMS.WORKORDERS,
    path: 'workorders',
    icon: <WorkIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.STAFF],
  },
  {
    title: 'Workorders',
    name: NAVBAR_ITEMS.JOBS,
    path: 'jobs',
    icon: <WorkHistoryIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.STAFF],
  },
  {
    title: 'Inventory',
    name: NAVBAR_ITEMS.INVENTORY,
    path: 'inventory',
    icon: <InventoryIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.STAFF],
  },
  {
    title: 'Customers',
    name: NAVBAR_ITEMS.CUSTOMERS,
    path: 'customers',
    icon: <GroupIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.STAFF],
  },
  {
    title: 'Suppliers',
    name: NAVBAR_ITEMS.SUPPLIERS,
    path: 'suppliers',
    icon: <HailIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.STAFF],
  },
  {
    title: 'Employees',
    name: NAVBAR_ITEMS.EMPLOYEES,
    path: 'employees',
    icon: <FolderSharedIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN],
  },
  {
    title: 'Users',
    name: NAVBAR_ITEMS.USERS,
    path: 'users',
    icon: <AdminPanelSettingsIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN],
  },
];

export default navConfig;
