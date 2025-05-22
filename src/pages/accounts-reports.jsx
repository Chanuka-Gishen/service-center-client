import { Helmet } from 'react-helmet-async';
import { AccountsReports } from 'src/sections/accounts-reports';

// ----------------------------------------------------------------------

export default function AccountsReportsPage() {
  return (
    <>
      <Helmet>
        <title> Reports | WijayaAuto </title>
      </Helmet>

      <AccountsReports />
    </>
  );
}
