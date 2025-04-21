import { Helmet } from 'react-helmet-async';
import { Employees } from 'src/sections/employees';

// ----------------------------------------------------------------------

export default function EmployeesPage() {
  return (
    <>
      <Helmet>
        <title> Employees | WijayaAuto </title>
      </Helmet>

      <Employees />
    </>
  );
}
