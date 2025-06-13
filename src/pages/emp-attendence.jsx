import { Helmet } from 'react-helmet-async';
import { EmpAttendence } from 'src/sections/emp-attendence';

// ----------------------------------------------------------------------

export default function EmpAttendencePage() {
  return (
    <>
      <Helmet>
        <title> Attendence | WijayaAuto </title>
      </Helmet>

      <EmpAttendence />
    </>
  );
}
