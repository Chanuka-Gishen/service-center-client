import { Helmet } from 'react-helmet-async';
import { Employees } from 'src/sections/employees';

// ----------------------------------------------------------------------

export default function EmployeesPage() {
  return (
    <>
      <Helmet>
        <title> Employees | TuneTab </title>
      </Helmet>

      <Employees />
    </>
  );
}
