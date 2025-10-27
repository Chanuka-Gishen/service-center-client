import { Helmet } from 'react-helmet-async';
import { WorkorderDetails } from 'src/sections/workorder-details';

// ----------------------------------------------------------------------

export default function WorkorderDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Details | TuneTab </title>
      </Helmet>

      <WorkorderDetails />
    </>
  );
}
