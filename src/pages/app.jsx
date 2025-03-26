import { Helmet } from 'react-helmet-async';

import { Overview } from 'src/sections/overview';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | ZenXbyte </title>
      </Helmet>

      <Overview />
    </>
  );
}
