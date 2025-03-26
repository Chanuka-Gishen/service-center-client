import PropTypes from 'prop-types';

import { Container, Typography } from '@mui/material';
import useAuthStore from 'src/store/auth-store';
import { ComingSoon } from 'src/sections/coming-soon';

// ----------------------------------------------------------------------

export const Overview = () => {
  const { auth } = useAuthStore.getState();

  return (
    <Container maxWidth="xl">
      <ComingSoon />
    </Container>
  );
};

Overview.propTypes = {};
