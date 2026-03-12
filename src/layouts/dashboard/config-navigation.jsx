import { NAVBAR_ITEMS } from './common/navigation-names';

import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import WorkIcon from '@mui/icons-material/Work';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HailIcon from '@mui/icons-material/Hail';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CampaignIcon from '@mui/icons-material/Campaign';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { USER_ROLE } from 'src/constants/user-role';

const navConfig = [
  {
    title: 'Dashboard',
    name: NAVBAR_ITEMS.DASHBOARD,
    path: '',
    icon: <DashboardIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.STAFF],
    isParent: false,
  },
  {
    title: 'Bookings',
    name: NAVBAR_ITEMS.BOOKINGS,
    path: 'bookings',
    icon: <CalendarMonthIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.STAFF],
    isParent: false,
  },
  {
    title: 'Workorders',
    name: 'workorders',
    icon: <WorkIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.STAFF],
    isParent: true,
    children: [
      {
        title: 'Active Jobs',
        name: 'active-workorders',
        path: 'workorders',
      },
      {
        title: 'Records',
        name: NAVBAR_ITEMS.JOBS,
        path: 'jobs',
      },
    ],
  },
  {
    title: 'Inventory',
    name: NAVBAR_ITEMS.INVENTORY,
    icon: <InventoryIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.STAFF],
    isParent: true,
    children: [
      {
        title: 'Brands',
        name: 'brands',
        path: 'brand',
      },
      {
        title: 'Categories',
        name: 'categories',
        path: 'category',
      },
      {
        title: 'Items',
        name: 'items',
        path: 'inventory',
      },
    ],
  },
  {
    title: 'Customers',
    name: NAVBAR_ITEMS.CUSTOMERS,
    path: 'customers',
    icon: <GroupIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.STAFF],
    isParent: false,
  },
  {
    title: 'Promotions',
    name: NAVBAR_ITEMS.NOTIFICATIONS,
    path: 'notifications',
    icon: <CampaignIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN],
    isParent: false,
  },
  {
    title: 'Suppliers',
    name: NAVBAR_ITEMS.SUPPLIERS,
    path: 'suppliers',
    icon: <HailIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.STAFF],
    isParent: false,
  },
  {
    title: 'Accounts',
    name: 'accounts',
    icon: <AccountBalanceIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.STAFF],
    isParent: true,
    children: [
      {
        title: 'Records',
        name: 'accounts-records',
        path: 'accounts',
        permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN],
      },
      {
        title: 'Reports',
        name: NAVBAR_ITEMS.ACCOUNTS_REPORTS,
        path: 'reports',
        permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.STAFF],
      },
    ],
  },
  {
    title: 'Employee Management',
    name: 'emp-management',
    icon: <FolderSharedIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN],
    isParent: true,
    children: [
      {
        title: 'Employees',
        name: NAVBAR_ITEMS.EMPLOYEES,
        path: 'employees',
        permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN],
      },
      {
        title: 'Emp Attendence',
        name: NAVBAR_ITEMS.EMP_ATTENDENCE,
        path: 'emp-attendence',
        permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN],
      },
      {
        title: 'Payroll Management',
        name: NAVBAR_ITEMS.PAYROLL,
        path: 'payroll',
        permissions: [USER_ROLE.SUPER_ADMIN],
      },
    ],
  },
  {
    title: 'Administration',
    name: NAVBAR_ITEMS.USERS,
    path: 'users',
    icon: <AdminPanelSettingsIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN],
    isParent: false,
  },
];

export default navConfig;
