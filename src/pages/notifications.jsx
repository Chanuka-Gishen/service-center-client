import { Helmet } from 'react-helmet-async';

import { Notifications } from 'src/sections/notifications';

// ----------------------------------------------------------------------

export default function NotificationsPage() {
  return (
    <>
      <Helmet>
        <title> Notifications | WijayaAuto </title>
      </Helmet>

      <Notifications />
    </>
  );
}
