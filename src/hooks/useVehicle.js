import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import responseUtil from 'src/utils/responseUtil';

const useVehicle = () => {
  const sourceToken = axios.CancelToken.source();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoadingAddVehicle, setIsLoadingAddVehicle] = useState(false);
  const [isLoadingUpdateVehicle, setIsLoadingUpdateVehicle] = useState(false);

  // Add new vehicle
  const addVehicleController = async (id, data) => {
    if (isLoadingAddVehicle) return;

    let isSuccess = false;

    setIsLoadingAddVehicle(true);

    await backendAuthApi({
      url: BACKEND_API.VEHICLE_REGISTER,
      method: 'POST',
      cancelToken: sourceToken.token,
      params: {
        id,
      },
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
        setIsLoadingAddVehicle(false);
      })
      .finally(() => {
        setIsLoadingAddVehicle(false);
      });

    return isSuccess;
  };

  // Update customer vehicle
  const updateVehicleController = async (id, data) => {
    if (isLoadingUpdateVehicle) return;

    let isSuccess = false;

    setIsLoadingUpdateVehicle(true);

    await backendAuthApi({
      url: BACKEND_API.VEHICLE_EDIT,
      method: 'PUT',
      cancelToken: sourceToken.token,
      params: { id },
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess) {
          isSuccess = true;
        }

        enqueueSnackbar(res.data.responseMessage, {
          variant: responseUtil.findResponseType(res.data.responseCode),
        });
      })
      .catch(() => {
        setIsLoadingUpdateVehicle(false);
      })
      .finally(() => {
        setIsLoadingUpdateVehicle(false);
      });

    return isSuccess;
  };

  return {
    isLoadingAddVehicle,
    isLoadingUpdateVehicle,
    addVehicleController,
    updateVehicleController,
  };
};

export default useVehicle;
