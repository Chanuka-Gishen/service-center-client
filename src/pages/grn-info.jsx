import { Helmet } from 'react-helmet-async';
import { GrnInfo } from 'src/sections/grn-info';

// ----------------------------------------------------------------------

export default function GrnInfoPage() {
  return (
    <>
      <Helmet>
        <title> GRN Info | TuneTab </title>
      </Helmet>

      <GrnInfo />
    </>
  );
}
