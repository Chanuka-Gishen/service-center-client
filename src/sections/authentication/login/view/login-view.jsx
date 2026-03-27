import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { Build as BuildIcon, Security as SecurityIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

import LoginForm from '../component/login-form';
import Logo from 'src/components/logo';
import { Avatar, Chip, Container, Divider } from '@mui/material';

const bgGradient = ({ color, imgUrl }) => ({
  background: `linear-gradient(to bottom, ${color}, ${color}), url(${imgUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

export const LoginView = ({ formik, isLoadingLogin, handleNavigateForgotPassword }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.primary.dark, 0.85),
          imgUrl: '/assets/background/service-center-bg.jpg', // Update with relevant service center background
        }),
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.info.main})`,
        }}
      />

      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          alignItems="center"
          justifyContent="center"
        >
          {/* Brand Section - Visible on larger screens */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'flex-start',
              color: 'white',
              maxWidth: 400,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: 'white',
                  color: theme.palette.primary.main,
                }}
              >
                <BuildIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                TuneTab
              </Typography>
            </Box>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
              Service Center Management System
            </Typography>

            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
              Streamline your service operations, manage appointments, track repairs, and delight
              your customers with our comprehensive management solution.
            </Typography>

            <Stack direction="row" spacing={2}>
              <Chip
                icon={<SecurityIcon color="white" />}
                label="Secure Access"
                variant="outlined"
                sx={{ color: 'white', borderColor: 'white', opacity: 0.9 }}
              />
              <Chip
                icon={<BuildIcon color="white" />}
                label="Service Ready"
                variant="outlined"
                sx={{ color: 'white', borderColor: 'white', opacity: 0.9 }}
              />
            </Stack>
          </Box>

          <Card
            sx={{
              p: { xs: 3, sm: 5 },
              width: 1,
              maxWidth: 460,
              borderRadius: 3,
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(10px)',
              backgroundColor: alpha(theme.palette.background.paper, 0.95),
            }}
          >
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexDirection: 'column',
                alignItems: 'center',
                mb: 4,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <BuildIcon color="primary" />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  TuneTab
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Service Center Management
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 4,
              }}
            >
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  gap: 1,
                  mb: 2,
                }}
              >
                <Logo />
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                Welcome Back!
              </Typography>

              <Typography variant="body2" color="text.secondary" align="center">
                Sign in to access your service center dashboard and manage operations
              </Typography>
            </Box>

            <LoginForm
              formik={formik}
              isLoadingLogin={isLoadingLogin}
              handleNavigateForgotPassword={handleNavigateForgotPassword}
            />

            {/* Footer */}
            <Box sx={{ mt: 'auto' }}>
              <Divider sx={{ my: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Secure Login
                </Typography>
              </Divider>

              <Typography variant="caption" color="text.secondary" align="center" display="block">
                © {new Date().getFullYear()} TuneTab. All rights reserved.
                <br />
                Version 2.0.0
              </Typography>
            </Box>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

LoginView.propTypes = {
  formik: PropTypes.object.isRequired,
  isUserEmailVerified: PropTypes.bool.isRequired,
  isUserFirstLogin: PropTypes.bool.isRequired,
  isLoadingVerifyEmail: PropTypes.bool.isRequired,
  isLoadingLogin: PropTypes.bool.isRequired,
  handleVerifyUserLogin: PropTypes.func.isRequired,
};
