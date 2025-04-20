import React from 'react';
import { Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { FormikProvider } from 'formik';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const LoginForm = ({ handleClick, handleShowPassword, showPassword, formik, isLoading }) => {
  const { touched, errors, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Stack spacing={3} sx={{ my: 1 }}>
        <TextField
          label="User Name/Email"
          autoComplete="off"
          fullWidth
          {...getFieldProps('userEmail')}
          error={Boolean(touched.userEmail && errors.userEmail)}
          helperText={touched.userEmail && errors.userEmail}
        />

        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
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

      <Button
        fullWidth
        loading={isLoading}
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        loadingPosition="start"
        onClick={handleClick}
      >
        Continue
      </Button>
    </FormikProvider>
  );
};

LoginForm.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleShowPassword: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
};

export default LoginForm;
