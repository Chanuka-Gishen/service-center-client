import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

import useAuth from 'src/hooks/use-auth';
import { useRouter } from 'src/routes/hooks';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { ForgotPasswordVerificationView } from '../view/forgot-passsword-verification-view';
import { ForgotPasswordOTPVerificationView } from '../view/forgot-password-otp-verification';
import { ForgotPasswordResetView } from '../view/forgot-password-reset-view';
import { useLocation, useNavigate } from 'react-router-dom';

const STEPS = {
  REQUEST: 'request',
  VERIFY: 'verify',
  RESET: 'reset',
};

const ForgotPasswordController = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const location = useLocation();

  const {
    isLoadingSendVerificationOtp,
    isLoadingVerifyingForgotPwdOtp,
    isLoadingResetForgotPwd,
    sendVerificationOtp,
    verifyResetForgotPasswordOtp,
    resetForgotPassword,
  } = useAuth();

  const queryParams = new URLSearchParams(location.search);
  const urlEmail = queryParams.get('user_email');
  const urlOtp = queryParams.get('code');

  const [step, setStep] = useState(STEPS.REQUEST);
  const [email, setEmail] = useState('');
  const [initialOtp, setInitialOtp] = useState('');
  const [isResetPasswordSuccess, setIsResetPasswordSuccess] = useState(false);
  const [resetToken, setResetToken] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleBack = () => {
    if (step === STEPS.VERIFY) {
      setStep(STEPS.REQUEST);
      setEmail('');
      setResetToken(null);
    } else if (step === STEPS.RESET) {
      setStep(STEPS.VERIFY);
    }
  };

  const handleComplete = () => {
    router.replace(NAVIGATION_ROUTES.login);
  };

  const handleRequestOtp = async (values) => {
    const isSuccess = await sendVerificationOtp(values.email);

    if (isSuccess) {
      setEmail(values.email);
      setStep(STEPS.VERIFY);
      setResendCooldown(60);
    }
  };

  const handleVerifyOTP = async (values) => {
    const result = await verifyResetForgotPasswordOtp(email, values.otp);

    if (result) {
      setResetToken(result);
      setStep(STEPS.RESET);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) {
      enqueueSnackbar('Please wait before requesting another code', { variant: 'info' });
    }

    const isSuccess = await sendVerificationOtp(email);

    if (isSuccess) setResendCooldown(60);
  };

  const handleResetPassword = async (values) => {
    const data = { token: resetToken, ...values };

    const isSuccess = await resetForgotPassword(data);

    if (isSuccess) setIsResetPasswordSuccess(true);
  };

  // Handle resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  useEffect(() => {
    if (urlEmail && urlOtp) {
      // If both email and OTP/token are present in URL, go directly to verification step
      setEmail(urlEmail);
      setInitialOtp(urlOtp);
      setStep(STEPS.VERIFY);
    }
  }, [urlEmail, urlOtp]);

  switch (step) {
    case STEPS.REQUEST:
      return (
        <ForgotPasswordVerificationView
          onSubmit={handleRequestOtp}
          isLoading={isLoadingSendVerificationOtp}
          onBackToLogin={handleComplete}
        />
      );
    case STEPS.VERIFY:
      return (
        <ForgotPasswordOTPVerificationView
          email={email}
          initialOtp={initialOtp}
          handleResend={handleResendOTP}
          onSubmit={handleVerifyOTP}
          onBack={handleBack}
          isLoading={isLoadingVerifyingForgotPwdOtp}
          isLoadingResend={isLoadingSendVerificationOtp}
          resendCooldown={resendCooldown}
        />
      );
    case STEPS.RESET:
      return (
        <ForgotPasswordResetView
          handleConfirm={handleResetPassword}
          success={isResetPasswordSuccess}
          onBack={handleBack}
          isLoading={isLoadingResetForgotPwd}
          handleComplete={handleComplete}
        />
      );
    default:
      return null;
  }
};

export default ForgotPasswordController;
