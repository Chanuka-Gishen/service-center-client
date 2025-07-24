import { Button, Stack } from '@mui/material';
import { Formik } from 'formik';
import { PasswordField } from 'src/components/password-field/password-field';
import resetPasswordSchema from 'src/schema/reset-password-schema';

export const ChangePasswordForm = ({ isLoading, handleConfirm }) => {
  return (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={resetPasswordSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleConfirm(values);
        resetForm();
      }}
    >
      {({ errors, touched, handleSubmit, getFieldProps }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} sx={{ my: 3 }}>
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
          </Stack>

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            loading={isLoading}
            disabled={isLoading}
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};
