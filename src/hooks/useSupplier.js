import axios from 'axios';
import { useState } from 'react';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import responseUtil from 'src/utils/responseUtil';

const useSupplier = () => {
  const sourceToken = axios.CancelToken.source();

  const [suppliers, setSuppliers] = useState([]);
  const [suppliersOptions, setSuppliersOptions] = useState([]);

  const [suppliersCount, setSuppliersCount] = useState(0);

  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(true);
  const [isLoadingSupplier, setIsLoadingSupplier] = useState(true);
  const [isLoadingSupRegister, setIsLoadingSupRegister] = useState(false);
  const [isLoadingSupUpdate, setIsLoadingSupUpdate] = useState(false);
  const [isLoadingSuppliersOptions, setIsLoadingSuppliersOptions] = useState(false);

  // Get all suppliers with filterss
  const getAllSuppliers = async (params) => {
    setIsLoadingSuppliers(true);

    await backendAuthApi({
      url: BACKEND_API.SUPPLIERS,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setSuppliers(res.data.responseData.data);
          setSuppliersCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoadingSuppliers(false);
      })
      .finally(() => {
        setIsLoadingSuppliers(false);
      });
  };

  // Register supplier
  const registerSupplier = async (data) => {
    if (isLoadingSupRegister) return;

    let isSuccess = false;

    setIsLoadingSupRegister(true);

    await backendAuthApi({
      url: BACKEND_API.SUPPLIER_ADD,
      method: 'POST',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }
      })
      .catch(() => {
        setIsLoadingSupRegister(false);
      })
      .finally(() => {
        setIsLoadingSupRegister(false);
      });

    return isSuccess;
  };

  // Update supplier
  const updateSupplier = async (id, data) => {
    if (isLoadingSupUpdate) return;

    let isSuccess = false;

    setIsLoadingSupUpdate(true);

    await backendAuthApi({
      url: BACKEND_API.SUPPLIER_UPDATE,
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
      })
      .catch(() => {
        setIsLoadingSupUpdate(false);
      })
      .finally(() => {
        setIsLoadingSupUpdate(false);
      });

    return isSuccess;
  };

  // Suppliers for selection
  const fetchSuppliersForSelection = async (name) => {
    if (isLoadingSuppliersOptions) return;

    setIsLoadingSuppliersOptions(true);

    await backendAuthApi({
      url: BACKEND_API.SUPPLIER_OPTIONS,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: {
        name,
      },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setSuppliersOptions(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingSuppliersOptions(false);
      })
      .finally(() => {
        setIsLoadingSuppliersOptions(false);
      });
  };

  return {
    suppliers,
    suppliersCount,
    suppliersOptions,
    isLoadingSuppliers,
    isLoadingSupplier,
    isLoadingSupRegister,
    isLoadingSupUpdate,
    isLoadingSuppliersOptions,
    getAllSuppliers,
    registerSupplier,
    updateSupplier,
    fetchSuppliersForSelection,
  };
};

export default useSupplier;
