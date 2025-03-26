import React, { useState } from 'react';

import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import * as Yup from 'yup';

import { LoginView } from '../view/login-view';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { useRouter } from 'src/routes/hooks';

import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';
import { SNACKBAR_VARIANT } from 'src/constants/snackbar-constants';
import useAuthStore from 'src/store/auth-store';

//-------------------------------------------------------

const validationSchema = Yup.object().shape({
  userEmail: Yup.string().required('User Name is required'),
  userPassword: Yup.string().required('Password is required'),
});

const LoginController = () => {
  const router = useRouter();
  const { loginUser } = useAuthStore.getState();
  const { enqueueSnackbar } = useSnackbar();

  let cancelToken = axios.CancelToken.source();

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      userEmail: '',
      userPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      null;
    },
  });

  const handleLogin = async () => {
    if (formik.isValid && formik.dirty) {
      setIsLoading(true);

      await backendAuthApi({
        url: BACKEND_API.LOGIN,
        method: 'POST',
        cancelToken: cancelToken.token,
        data: formik.values,
      })
        .then((res) => {
          const data = res.data;
          if (responseUtil.isResponseSuccess(data.responseCode)) {
            loginUser(data.responseData);

            if (data.responseData.userNewPwd) {
              router.push(NAVIGATION_ROUTES.set_password);
            } else {
              // Update login status - TODO
              router.push(NAVIGATION_ROUTES.dashboard.base);
            }
          } else {
            enqueueSnackbar(data.responseMessage, {
              variant: SNACKBAR_VARIANT.ERROR,
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return <LoginView handleLogin={handleLogin} formik={formik} isLoading={isLoading} />;
};

export default LoginController;
