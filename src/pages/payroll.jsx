import { Helmet } from 'react-helmet-async';
import { Payroll } from 'src/sections/payroll';

// ----------------------------------------------------------------------

export default function PayrollPage() {
  return (
    <>
      <Helmet>
        <title> Payroll Management | TuneTab </title>
      </Helmet>

      <Payroll />
    </>
  );
}
