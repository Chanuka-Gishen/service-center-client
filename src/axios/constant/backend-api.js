// SERVER URL
const IP_URL = import.meta.env.VITE_SERVER_URL;

// URIs
export const BACKEND_API = {
  // AUTHENTICATION API'S
  LOGIN: IP_URL + '/authentication/noAuth/login',
  LOGOUT: IP_URL + '/authentication/auth/logout',

  REGISTER: IP_URL + '/auth/create',

  CUSTOMERS: IP_URL + '/customer/auth/customers',
  CUSTOMER: IP_URL + '/customer/auth/customer',
  CUSTOMER_REGISTER: IP_URL + '/customer/auth/register',

  ITEMS: IP_URL + '/inventory/auth/items',
  ITEMS_SELECT: IP_URL + '/inventory/auth/items-select',
  ITEMS_ADD: IP_URL + '/inventory/auth/create',
  ITEM_UPDATE_STOCK: IP_URL + '/inventory/auth/update-stocks',

  WO_ACTIVE: IP_URL + '/workorder/auth/active-orders',
  WO_INFO: IP_URL + '/workorder/auth/info',
  WO_CREATE: IP_URL + '/workorder/auth/create',
  WO_UPDATE: IP_URL + '/workorder/auth/update',
  WO_DOWNLOAD_INVOICE: IP_URL + '/workorder/auth/download-invoice',
  WO_UPDATE_COMPLETED: IP_URL + '/workorder/auth/update-complete',
  WO_UPDATE_CLOSED: IP_URL + '/workorder/auth/update-closed',

  PAYMENT_CREATE: IP_URL + '/payment/auth/add'
};
