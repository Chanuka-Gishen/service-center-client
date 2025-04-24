import { Helmet } from 'react-helmet-async';
import { Users } from 'src/sections/users';

// ----------------------------------------------------------------------

export default function UsersPage() {
  return (
    <>
      <Helmet>
        <title> Users | WijayaAuto </title>
      </Helmet>

      <Users />
    </>
  );
}
