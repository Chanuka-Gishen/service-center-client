import { Helmet } from 'react-helmet-async';
import { Bookings } from 'src/sections/bookings';

// ----------------------------------------------------------------------

export default function BookingsPage() {
  return (
    <>
      <Helmet>
        <title> Bookings | TuneTab </title>
      </Helmet>

      <Bookings />
    </>
  );
}
