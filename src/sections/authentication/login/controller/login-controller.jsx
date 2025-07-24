import React, { useState } from 'react';

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

  const { isLoadingVerifyEmail, isLoadingLogin, verifyUserEmailController, loginController } =
    useAuth();

  const [isUserEmailVerified, setIsUserEmailVerified] = useState(false);
  const [isUserFirstLogin, setIsUserFirstLogin] = useState(false);

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

  const handleVerifyUserLogin = async () => {
    const user = await verifyUserEmailController(formik.values.userEmail);

    setIsUserEmailVerified(user ? true : false);
    setIsUserFirstLogin(user ? user.isUserFirstLogin : false);

    if (user && user.isUserFirstLogin) {
      saveUserData(user);
      router.push(NAVIGATION_ROUTES.set_password);
    }
  };

  const handleLogin = async (data) => {
    const response = await loginController(data);

    if (response) {
      loginUser(response);
      router.push(NAVIGATION_ROUTES.dashboard.base);
    }
  };

  return (
    <LoginView
      formik={formik}
      isUserEmailVerified={isUserEmailVerified}
      isUserFirstLogin={isUserFirstLogin}
      isLoadingVerifyEmail={isLoadingVerifyEmail}
      isLoadingLogin={isLoadingLogin}
      handleVerifyUserLogin={handleVerifyUserLogin}
    />
  );
};

export default LoginController;
