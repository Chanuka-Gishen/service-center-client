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
  ITEMS_ADD: IP_URL + '/inventory/auth/create',
  ITEM_UPDATE_STOCK: IP_URL + '/inventory/auth/update-stocks'
};
