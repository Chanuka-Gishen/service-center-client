import { Helmet } from 'react-helmet-async';
import { Workorders } from 'src/sections/workorders';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Workorders | TuneTab </title>
      </Helmet>

      <Workorders />
    </>
  );
}
