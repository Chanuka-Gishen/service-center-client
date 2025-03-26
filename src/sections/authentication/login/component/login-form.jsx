import React from 'react';
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { FormikProvider } from 'formik';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const LoginForm = ({ handleClick, handleShowPassword, showPassword, formik, isLoading }) => {
  const { touched, errors, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Stack spacing={3} sx={{ my: 3 }}>
        <TextField
          label="User Name/Email"
          autoComplete="off"
          {...getFieldProps('userEmail')}
          error={Boolean(touched.userEmail && errors.userEmail)}
          helperText={touched.userEmail && errors.userEmail}
        />

        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...getFieldProps('userPassword')}
          error={Boolean(touched.userPassword && errors.userPassword)}
          helperText={touched.userPassword && errors.userPassword}
        />
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        loading={isLoading}
        disabled={isLoading}
      >
        Login
      </LoadingButton>
    </FormikProvider>
  );
};

LoginForm.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleShowPassword: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
};

export default LoginForm;
