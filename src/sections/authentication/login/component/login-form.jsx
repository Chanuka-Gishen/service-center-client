import React from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { FormikProvider } from 'formik';

import commonUtil from 'src/utils/common-util';
import { PasswordField } from 'src/components/password-field/password-field';

const LoginForm = ({
  formik,
  isUserEmailVerified,
  isUserFirstLogin,
  isLoadingVerifyEmail,
  isLoadingLogin,
  handleVerifyUserLogin,
}) => {
  const { values, touched, errors, getFieldProps, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ my: 1 }}>
          <TextField
            label="User Name/Email"
            autoComplete="off"
            fullWidth
            {...getFieldProps('userEmail')}
            error={Boolean(touched.userEmail && errors.userEmail)}
            helperText={touched.userEmail && errors.userEmail}
          />
          {isUserEmailVerified && !isUserFirstLogin && (
            <PasswordField
              label={'User Password'}
              {...getFieldProps('userPassword')}
              error={Boolean(touched.userPassword && errors.userPassword)}
              helperText={touched.userPassword && errors.userPassword}
            />
          )}
        </Stack>

        {!isUserEmailVerified && (
          <Button
            fullWidth
            loading={isLoadingVerifyEmail}
            disabled={isLoadingVerifyEmail || commonUtil.stringIsEmptyOrSpaces(values.userEmail)}
            size="large"
            variant="contained"
            color="inherit"
            loadingPosition="start"
            onClick={handleVerifyUserLogin}
          >
            Verify Email
          </Button>
        )}

        {isUserEmailVerified && !isUserFirstLogin && (
          <Button
            fullWidth
            loading={isLoadingLogin}
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            loadingPosition="start"
          >
            Continue
          </Button>
        )}
      </form>
    </FormikProvider>
  );
};

export default LoginForm;
