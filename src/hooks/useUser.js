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

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    setIsLoading(true);
    await backendAuthApi({
      url: BACKEND_API.USERS,
      method: 'GET',
      cancelToken: sourceToken.token,
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

  return {
    users,
    usersCount,
    isLoading,
    isLoadingAdd,
    fetchUsers,
    registerUser,
  };
};

export default useUser;
