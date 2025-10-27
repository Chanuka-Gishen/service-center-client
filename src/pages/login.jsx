import { Helmet } from 'react-helmet-async';

import { LoginView } from 'src/sections/authentication/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | TuneTab </title>
      </Helmet>

      <LoginView />
    </>
  );
}
