import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import responseUtil from 'src/utils/responseUtil';

const useUser = () => {
  const sourceToken = axios.CancelToken.source();
  const { enqueueSnackbar } = useSnackbar();

  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [activities, setActivities] = useState([]);
  const [activitiesCount, setActivitiesCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);

  // Fetch all users
  const fetchUsers = async (params) => {
    setIsLoading(true);
    await backendAuthApi({
      url: BACKEND_API.USERS,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setUsers(res.data.responseData.data);
          setUsersCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Register system user
  const registerUser = async (data) => {
    if (isLoadingAdd) return;

    setIsLoadingAdd(true);

    let isSuccess = false;

    await backendAuthApi({
      url: BACKEND_API.USER_REGISTER,
      method: 'POST',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }

        enqueueSnackbar(res.data.responseMessage, {
          variant: responseUtil.findResponseType(res.data.responseCode),
        });
      })
      .catch(() => {
        setIsLoadingAdd(false);
      })
      .finally(() => {
        setIsLoadingAdd(false);
      });

    return isSuccess;
  };

  // Upate admin
  const updateUser = async (data) => {
    if (isLoadingUpdate) return;

    setIsLoadingUpdate(true);

    let isSuccess = false;

    await backendAuthApi({
      url: BACKEND_API.USER_UPDATE,
      method: 'PUT',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }

        enqueueSnackbar(res.data.responseMessage, {
          variant: responseUtil.findResponseType(res.data.responseCode),
        });
      })
      .catch(() => {
        setIsLoadingUpdate(false);
      })
      .finally(() => {
        setIsLoadingUpdate(false);
      });

    return isSuccess;
  };

  // Admin activities - Login
  const fetchAdminActivities = async (params) => {
    setIsLoadingActivities(true);

    await backendAuthApi({
      url: BACKEND_API.USER_ACTIVITIES,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setActivities(res.data.responseData.data);
          setActivitiesCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoadingActivities(false);
      })
      .finally(() => {
        setIsLoadingActivities(false);
      });
  };

  return {
    users,
    usersCount,
    activities,
    activitiesCount,
    isLoading,
    isLoadingAdd,
    isLoadingUpdate,
    isLoadingActivities,
    fetchUsers,
    registerUser,
    updateUser,
    fetchAdminActivities,
  };
};

export default useUser;
