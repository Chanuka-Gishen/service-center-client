// SERVER URL
const IP_URL = import.meta.env.VITE_SERVER_URL;

// URIs
export const BACKEND_API = {
  // AUTHENTICATION API'S
  LOGIN: IP_URL + '/authentication/noAuth/login',
  LOGOUT: IP_URL + '/authentication/auth/logout',

  USER_REGISTER: IP_URL + '/user/supAuth/create',
  USERS: IP_URL + '/user/auth/all',

  CUSTOMERS: IP_URL + '/customer/auth/customers',
  CUSTOMER: IP_URL + '/customer/auth/customer',
  CUSTOMER_REGISTER: IP_URL + '/customer/auth/register',
  CUSTOMER_EDIT: IP_URL + '/customer/supAuth/update',

  VEHICLE_REGISTER : IP_URL + '/vehicle/auth/register',
  VEHICLE_EDIT: IP_URL + '/vehicle/supAuth/update',

  ITEMS: IP_URL + '/inventory/auth/items',
  ITEMS_SELECT: IP_URL + '/inventory/auth/items-select',
  ITEMS_ADD: IP_URL + '/inventory/auth/create',
  ITEMS_EDIT: IP_URL + '/inventory/supAuth/update',
  ITEM_UPDATE_STOCK: IP_URL + '/inventory/auth/update-stocks',
  ITEM_UPDATE_LOGS: IP_URL + '/inventory/auth/stock-logs',
  ITEMS_INFO: IP_URL + '/inventory/auth/item',

  WO_ALL: IP_URL + '/workorder/auth/list',
  WO_ACTIVE: IP_URL + '/workorder/auth/active-orders',
  WO_INFO: IP_URL + '/workorder/auth/info',
  WO_CREATE: IP_URL + '/workorder/auth/create',
  WO_UPDATE: IP_URL + '/workorder/auth/update',
  WO_DOWNLOAD_INVOICE: IP_URL + '/workorder/auth/download-invoice',
  WO_UPDATE_COMPLETED: IP_URL + '/workorder/auth/update-complete',
  WO_UPDATE_CLOSED: IP_URL + '/workorder/auth/update-closed',

  PAYMENT_WO: IP_URL + '/payment/auth/wo-payments',
  PAYMENT_CREATE: IP_URL + '/payment/auth/add',

  EMP_REGISTER: IP_URL + '/employee/auth/register',
  EMP_ALL: IP_URL + '/employee/auth/employees',
  EMP_INFO: IP_URL + 'employee/auth/employee',
};
