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
  const [isLoadingSendVerificationOtp, setIsLoadingSendVerificationOtp] = useState(false);
  const [isLoadingVerifyingForgotPwdOtp, setIsLoadingVerifyingForgotPwdOtp] = useState(false);
  const [isLoadingResetForgotPwd, setIsLoadingResetForgotPwd] = useState(false);

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

  const sendVerificationOtp = async (email) => {
    let isSuccess = false;
    setIsLoadingSendVerificationOtp(true);

    await backendAuthApi({
      url: BACKEND_API.SEND_RESET_PWD_OTP,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: { email },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) isSuccess = true;
      })
      .catch(() => {
        setIsLoadingSendVerificationOtp(false);
      })
      .finally(() => {
        setIsLoadingSendVerificationOtp(false);
      });

    return isSuccess;
  };

  const verifyResetForgotPasswordOtp = async (email, otp) => {
    let result = null;

    setIsLoadingVerifyingForgotPwdOtp(true);

    await backendAuthApi({
      url: BACKEND_API.VERIFY_RESET_PWD_OTP,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: { email, otp },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) result = res.data.responseData;
      })
      .catch(() => {
        setIsLoadingVerifyingForgotPwdOtp(false);
      })
      .finally(() => {
        setIsLoadingVerifyingForgotPwdOtp(false);
      });

    return result;
  };

  const resetForgotPassword = async (data) => {
    let isSuccess = false;

    setIsLoadingResetForgotPwd(true);

    await backendAuthApi({
      url: BACKEND_API.RESET_FORGOT_PWD,
      method: 'POST',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) isSuccess = true;

        setIsLoadingResetForgotPwd(false);
      })
      .catch(() => {
        setIsLoadingResetForgotPwd(false);
      });

    return isSuccess;
  };

  return {
    isLoadingVerifyEmail,
    isLoadingLogin,
    isLoadingPwdReset,
    isLoadingSendVerificationOtp,
    isLoadingVerifyingForgotPwdOtp,
    isLoadingResetForgotPwd,
    verifyUserEmailController,
    resetPasswordController,
    loginController,
    sendVerificationOtp,
    verifyResetForgotPasswordOtp,
    resetForgotPassword,
  };
};

export default useAuth;
