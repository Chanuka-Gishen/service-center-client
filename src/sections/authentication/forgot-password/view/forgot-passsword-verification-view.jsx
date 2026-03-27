import React from 'react';
import {
  Box,
  Card,
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  Container,
  Avatar,
  Chip,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Build as BuildIcon,
  Security as SecurityIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { Formik } from 'formik';
import verifyEmailSchema from 'src/schema/verify-email-schema';

export const ForgotPasswordVerificationView = ({ onSubmit, isLoading, onBackToLogin }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.primary.dark, 0.85),
          imgUrl: '/assets/background/service-center-bg.jpg',
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

      <Container maxWidth="md">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          alignItems="center"
          justifyContent="center"
        >
          {/* Brand Section */}
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
              Reset your password and regain access to your service center operations.
            </Typography>

            <Stack direction="row" spacing={2}>
              <Chip
                icon={<SecurityIcon />}
                label="Secure Access"
                variant="outlined"
                sx={{ color: 'white', borderColor: 'white', opacity: 0.9 }}
              />
              <Chip
                icon={<BuildIcon />}
                label="Service Ready"
                variant="outlined"
                sx={{ color: 'white', borderColor: 'white', opacity: 0.9 }}
              />
            </Stack>
          </Box>

          {/* Forgot Password Card */}
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
            {/* Mobile Logo */}
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

            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <IconButton onClick={onBackToLogin} sx={{ mb: 2 }}>
                <ArrowBackIcon />
              </IconButton>

              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                Forgot Password?
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Enter your email address and we'll send you a verification code to reset your
                password.
              </Typography>
            </Box>

            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={verifyEmailSchema}
              onSubmit={(values) => {
                onSubmit(values);
              }}
            >
              {({ errors, touched, handleSubmit, getFieldProps }) => (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email Address"
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      placeholder="Enter your registered email"
                      autoFocus
                    />

                    <Button
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      loading={isLoading}
                    >
                      Send Verification Code
                    </Button>

                    <Divider sx={{ my: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Remember your password?
                      </Typography>
                    </Divider>

                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={onBackToLogin}
                      sx={{
                        py: 1.2,
                        borderRadius: 2,
                        textTransform: 'none',
                      }}
                    >
                      Back to Sign In
                    </Button>
                  </Stack>
                </form>
              )}
            </Formik>

            {/* Footer */}
            <Divider sx={{ my: 3 }}>
              <Typography variant="caption" color="text.secondary">
                Secure Password Reset
              </Typography>
            </Divider>

            <Typography variant="caption" color="text.secondary" align="center" display="block">
              © {new Date().getFullYear()} TuneTab. All rights reserved.
            </Typography>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

const bgGradient = ({ color, imgUrl }) => ({
  background: `linear-gradient(to bottom, ${color}, ${color}), url(${imgUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});
