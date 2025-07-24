import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';

const useAuth = () => {
  const { enqueueSnackbar } = useSnackbar();
  const sourceToken = axios.CancelToken.source();

  const [isLoadingVerifyEmail, setIsLoadingVerifyEmail] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingPwdReset, setIsLoadingPwdReset] = useState(false);

  const verifyUserEmailController = async (email) => {
    let user = null;
    setIsLoadingVerifyEmail(true);

    await backendAuthApi({
      url: BACKEND_API.USER_EMAIL_VALIDATE,
      method: 'POST',
      cancelToken: sourceToken.token,
      data: { email },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          user = res.data.responseData;
        }
      })
      .catch(() => {
        setIsLoadingVerifyEmail(false);
      })
      .finally(() => {
        setIsLoadingVerifyEmail(false);
      });

    return user;
  };

  const resetPasswordController = async (data) => {
    let response = null;

    setIsLoadingPwdReset(true);

    await backendAuthApi({
      url: BACKEND_API.USER_RESET_PWD,
      method: 'PUT',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          response = res.data.responseData;
        }

        enqueueSnackbar(res.data.responseMessage, {
          variant: responseUtil.findResponseType(res.data.responseCode),
        });
      })
      .catch(() => {
        setIsLoadingPwdReset(false);
      })
      .finally(() => {
        setIsLoadingPwdReset(false);
      });

    return response;
  };

  const loginController = async (data) => {
    let response = null;
    setIsLoadingLogin(true);

    await backendAuthApi({
      url: BACKEND_API.LOGIN,
      method: 'POST',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          response = res.data.responseData;
        }
      })
      .catch(() => {
        setIsLoadingLogin(false);
      })
      .finally(() => {
        setIsLoadingLogin(false);
      });

    return response;
  };

  return {
    isLoadingVerifyEmail,
    isLoadingLogin,
    isLoadingPwdReset,
    verifyUserEmailController,
    resetPasswordController,
    loginController,
  };
};

export default useAuth;
