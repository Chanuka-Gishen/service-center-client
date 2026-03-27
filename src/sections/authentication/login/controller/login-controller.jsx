import React from 'react';

import { useFormik } from 'formik';

import { LoginView } from '../view/login-view';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { useRouter } from 'src/routes/hooks';

import useAuthStore from 'src/store/auth-store';
import useAuth from 'src/hooks/use-auth';
import loginSchema from 'src/schema/login-schema';

const LoginController = () => {
  const router = useRouter();
  const { loginUser, saveUserData } = useAuthStore.getState();

  const { isLoadingLogin, loginController } = useAuth();

  const formik = useFormik({
    initialValues: {
      userEmail: '',
      userPassword: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleNavigateForgotPassword = () => {
    router.push(NAVIGATION_ROUTES.forgot_password);
  };

  const handleLogin = async (data) => {
    const response = await loginController(data);

    if (!response) return;

    if (response.user.isUserFirstLogin) {
      saveUserData(response);
      router.push(NAVIGATION_ROUTES.set_password);
      return;
    }

    loginUser(response);
    router.push(NAVIGATION_ROUTES.dashboard.base);
  };

  return (
    <LoginView
      formik={formik}
      isLoadingLogin={isLoadingLogin}
      handleNavigateForgotPassword={handleNavigateForgotPassword}
    />
  );
};

export default LoginController;
