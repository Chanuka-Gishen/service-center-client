import { Helmet } from 'react-helmet-async';
import { Jobs } from 'src/sections/jobs';

// ----------------------------------------------------------------------

export default function JobsPage() {
  return (
    <>
      <Helmet>
        <title> Jobs | TuneTab </title>
      </Helmet>

      <Jobs />
    </>
  );
}
