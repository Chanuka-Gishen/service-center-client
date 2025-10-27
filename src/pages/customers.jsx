import { Helmet } from 'react-helmet-async';
import { Customers } from 'src/sections/customers';


// ----------------------------------------------------------------------

export default function CustomersPage() {
  return (
    <>
      <Helmet>
        <title> Customers | TuneTab </title>
      </Helmet>

      <Customers />
    </>
  );
}
