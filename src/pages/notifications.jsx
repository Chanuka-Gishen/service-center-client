import { Helmet } from 'react-helmet-async';

import { Notifications } from 'src/sections/notifications';

// ----------------------------------------------------------------------

export default function NotificationsPage() {
  return (
    <>
      <Helmet>
        <title> Notifications | TuneTab </title>
      </Helmet>

      <Notifications />
    </>
  );
}
