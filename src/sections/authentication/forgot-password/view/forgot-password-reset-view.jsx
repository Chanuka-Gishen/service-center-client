import React from 'react';
import {
  Box,
  Card,
  Stack,
  Typography,
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
import { PasswordField } from 'src/components/password-field/password-field';
import resetPasswordSchema from 'src/schema/reset-password-schema';

export const ForgotPasswordResetView = ({
  success,
  handleConfirm,
  onBack,
  handleComplete,
  isLoading,
}) => {
  const theme = useTheme();

  if (success) {
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
        }}
      >
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 460,
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'success.main',
                mx: 'auto',
                mb: 2,
              }}
            >
              <SecurityIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              Password Reset Successfully!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your password has been reset. You can now log in with your new password.
            </Typography>
          </Box>
          <Button fullWidth variant="contained" onClick={handleComplete} sx={{ mt: 2 }}>
            Back to Sign In
          </Button>
        </Card>
      </Box>
    );
  }

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
              Create a strong new password to secure your account and continue managing your service
              center operations.
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

          {/* Reset Password Card */}
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
              <IconButton onClick={onBack} sx={{ mb: 2 }}>
                <ArrowBackIcon />
              </IconButton>

              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                Create New Password
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Your new password must be different from previously used passwords and meet the
                security requirements.
              </Typography>
            </Box>

            <Formik
              initialValues={{
                password: '',
                confirmPassword: '',
              }}
              validationSchema={resetPasswordSchema}
              onSubmit={(values) => {
                handleConfirm(values);
              }}
            >
              {({ values, errors, touched, handleSubmit, getFieldProps }) => (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <PasswordField
                      label="Password"
                      {...getFieldProps('password')}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    />

                    <PasswordField
                      label="Confirm Password"
                      {...getFieldProps('confirmPassword')}
                      error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                    />

                    {/* Password Requirements */}
                    <Box sx={{ p: 2, bgcolor: 'background.neutral', borderRadius: 2 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mb: 1, display: 'block' }}
                      >
                        Password must contain:
                      </Typography>
                      <Stack direction="row" spacing={2} flexWrap="wrap" alignItems={'flex-start'}>
                        <Typography
                          variant="caption"
                          color={values.password.length >= 6 ? 'success.main' : 'text.secondary'}
                        >
                          ✓ At least 6 characters
                        </Typography>
                        <Typography
                          variant="caption"
                          color={/[A-Z]/.test(values.password) ? 'success.main' : 'text.secondary'}
                        >
                          ✓ One uppercase letter
                        </Typography>
                        <Typography
                          variant="caption"
                          color={/[a-z]/.test(values.password) ? 'success.main' : 'text.secondary'}
                        >
                          ✓ One lowercase letter
                        </Typography>
                        <Typography
                          variant="caption"
                          color={/[0-9]/.test(values.password) ? 'success.main' : 'text.secondary'}
                        >
                          ✓ One number
                        </Typography>
                        <Typography
                          variant="caption"
                          color={
                            /[^A-Za-z0-9]/.test(values.password) ? 'success.main' : 'text.secondary'
                          }
                        >
                          ✓ One special character
                        </Typography>
                      </Stack>
                    </Box>

                    <Button
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      loading={isLoading}
                    >
                      Reset Password
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
