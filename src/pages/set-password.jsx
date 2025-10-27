import { Helmet } from 'react-helmet-async';

import { SetPassword } from 'src/sections/authentication/set-password';

// ----------------------------------------------------------------------

export default function SetPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Password | TuneTab </title>
      </Helmet>

      <SetPassword />
    </>
  );
}
