import { Helmet } from 'react-helmet-async';

import { Overview } from 'src/sections/overview';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | WijayaAuto </title>
      </Helmet>

      <Overview />
    </>
  );
}
