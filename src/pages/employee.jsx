import { Helmet } from 'react-helmet-async';
import { Employee } from 'src/sections/employee';

// ----------------------------------------------------------------------

export default function EmployeePage() {
  return (
    <>
      <Helmet>
        <title> Employee | TuneTab </title>
      </Helmet>

      <Employee />
    </>
  );
}
