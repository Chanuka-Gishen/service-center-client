// SERVER URL
const IP_URL = import.meta.env.VITE_SERVER_URL;

// URIs
export const BACKEND_API = {
  // AUTHENTICATION API'S
  LOGIN: IP_URL + '/authentication/noAuth/login',
  LOGOUT: IP_URL + '/authentication/auth/logout',

  REGISTER: IP_URL + '/employee/register',
};
