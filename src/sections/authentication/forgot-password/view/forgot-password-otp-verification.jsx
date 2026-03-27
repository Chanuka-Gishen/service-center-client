import React, { useEffect } from 'react';
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
import * as Yup from 'yup';

const validationSchema = Yup.object({
  otp: Yup.string()
    .required('OTP is required')
    .length(6, 'OTP must be 6 digits')
    .matches(/^\d+$/, 'OTP must contain only numbers'),
});

export const ForgotPasswordOTPVerificationView = ({
  email,
  initialOtp,
  onSubmit,
  handleResend,
  onBack,
  isLoading,
  isLoadingResend,
  resendCooldown = 0,
}) => {
  const theme = useTheme();

  useEffect(() => {
    if (initialOtp && initialOtp.length === 6 && !isLoading) {
      onSubmit({ otp: initialOtp });
    }
  }, [initialOtp]);

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
              Verify your identity to reset your password and secure your account.
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
                Verify Your Identity
              </Typography>

              <Typography variant="body2" color="text.secondary">
                We've sent a 6-digit verification code to <strong>{email}</strong>. Please enter it
                below.
              </Typography>
            </Box>

            <Formik
              initialValues={{
                otp: initialOtp,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                onSubmit(values);
              }}
            >
              {({ errors, touched, handleSubmit, getFieldProps }) => (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      name="otpCode"
                      label="Verification Code"
                      {...getFieldProps('otp')}
                      error={Boolean(touched.otp && errors.otp)}
                      helperText={touched.otp && errors.otp}
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
                      Verify Code
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Didn't receive the code?{' '}
                        <Button
                          variant="text"
                          size="small"
                          onClick={handleResend}
                          loading={isLoadingResend}
                          disabled={resendCooldown > 0}
                          sx={{ textTransform: 'none', minWidth: 'auto' }}
                        >
                          {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
                        </Button>
                      </Typography>
                    </Box>
                  </Stack>
                </form>
              )}
            </Formik>

            {/* Footer */}
            <Divider sx={{ my: 3 }}>
              <Typography variant="caption" color="text.secondary">
                Secure Verification
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
