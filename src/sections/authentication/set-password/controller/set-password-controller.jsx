import React, { useEffect } from 'react';

import { SetPasswordView } from '../view/set-password-view';
import { useRouter } from 'src/routes/hooks';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import useAuthStore from 'src/store/auth-store';
import useAuth from 'src/hooks/use-auth';

//-------------------------------------------------------

const SetPasswordController = () => {
  const router = useRouter();

  const { isLoadingPwdReset, resetPasswordController } = useAuth();

  const { auth, loginUser } = useAuthStore.getState();

  const handleConfirm = async (values) => {
    const data = {
      id: auth.user.id,
      ...values,
    };
    const user = await resetPasswordController(data);

    if (user) {
      loginUser(user);
      router.push(NAVIGATION_ROUTES.dashboard.base);
    }
  };

  useEffect(() => {
    if (!router) return;
    if (!auth.user.id && !auth.user.isUserFirstLogin) {
      router.replace(NAVIGATION_ROUTES.login);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user?.id, auth.user?.isUserFirstLogin, router]);

  return <SetPasswordView isLoading={isLoadingPwdReset} handleConfirm={handleConfirm} />;
};

export default SetPasswordController;
