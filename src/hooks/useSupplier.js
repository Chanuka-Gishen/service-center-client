import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import responseUtil from 'src/utils/responseUtil';

const useSupplier = () => {
  const sourceToken = axios.CancelToken.source();

  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState(null);
  const [suppliersOptions, setSuppliersOptions] = useState([]);
  const [supplierGrnRecords, setSupplierGrnRecords] = useState([]);
  const [supplierPayments, setSupplierPayments] = useState([]);
  const [supplierItems, setSupplierItems] = useState([]);

  const [suppliersCount, setSuppliersCount] = useState(0);
  const [supplierGrnCount, setSupplierGrnCount] = useState(0);
  const [supplierPaymentsCount, setSupplierPaymentsCount] = useState(0);

  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(true);
  const [isLoadingSupplier, setIsLoadingSupplier] = useState(true);
  const [isLoadingSupRegister, setIsLoadingSupRegister] = useState(false);
  const [isLoadingSupUpdate, setIsLoadingSupUpdate] = useState(false);
  const [isLoadingAddSupPayment, setIsLoadingAddSupPayment] = useState(false);
  const [isLoadingSuppliersOptions, setIsLoadingSuppliersOptions] = useState(false);
  const [isLoadingSupplierGrnRecords, setIsLoadingSupplierGrnRecords] = useState(false);
  const [isLoadingSupplierPayments, setIsLoadingSupplierPayments] = useState(false);
  const [isLoadingSupplierItems, setIsLoadingSupplierItems] = useState(false);
  const [isLoadingAddStockBulk, setIsLoadingAddStockBulk] = useState(false);

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

  // Fetch supplier info
  const fetchSupplierInfo = async (id) => {
    setIsLoadingSupplier(true);

    await backendAuthApi({
      url: BACKEND_API.SUPPLIER_INFO,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: {
        id,
      },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setSupplier(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingSupplier(false);
      })
      .finally(() => {
        setIsLoadingSupplier(false);
      });
  };

  // Fetch supplier GRN records
  const fetchSupplierGrnRecords = async (params) => {
    setIsLoadingSupplierGrnRecords(true);

    await backendAuthApi({
      url: BACKEND_API.SUPPLIER_PURCHASES,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setSupplierGrnRecords(res.data.responseData.data);
          setSupplierGrnCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoadingSupplierGrnRecords(false);
      })
      .finally(() => {
        setIsLoadingSupplierGrnRecords(false);
      });
  };

  // Fetch supplier recent payments made
  const fetchSupplierRecentPayments = async (params) => {
    setIsLoadingSupplierPayments(true);

    await backendAuthApi({
      url: BACKEND_API.SUPPLIER_PAYMENTS,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setSupplierPayments(res.data.responseData.data);
          setSupplierPaymentsCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoadingSupplierPayments(false);
      })
      .finally(() => {
        setIsLoadingSupplierPayments(false);
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
      method: 'PUT',
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

  // Create supplier payments
  const createSupplierPayments = async (data) => {
    if (isLoadingAddSupPayment) return;

    let isSuccess = false;

    setIsLoadingAddSupPayment(true);

    await backendAuthApi({
      url: BACKEND_API.SUPPLIER_ADD_PAYMENTS,
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
        setIsLoadingAddSupPayment(false);
      })
      .finally(() => {
        setIsLoadingAddSupPayment(false);
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

  // Supplier products/items info
  const fetchSupplierItemsInfo = async (id) => {
    setIsLoadingSupplierItems(true);

    await backendAuthApi({
      url: BACKEND_API.SUPPLIER_ITEMS_INFO,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: { id },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setSupplierItems(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingSupplierItems(false);
      })
      .finally(() => {
        setIsLoadingSupplierItems(false);
      });
  };

  // Add stock bulks
  const addStockBulks = async (id, data) => {
    let isSuccess = false;
    setIsLoadingAddStockBulk(true);

    await backendAuthApi({
      url: BACKEND_API.ITEM_UPDATE_STOCK_BULK,
      method: 'PUT',
      cancelToken: sourceToken.token,
      params: { id },
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        } else {
          enqueueSnackbar(res.data.responseMessage, {
            variant: responseUtil.findResponseType(res.data.responseCode),
          });
        }
      })
      .catch(() => {
        setIsLoadingAddStockBulk(false);
      })
      .finally(() => {
        setIsLoadingAddStockBulk(false);
      });

    return isSuccess;
  };

  return {
    suppliers,
    supplier,
    supplierGrnRecords,
    supplierPayments,
    suppliersCount,
    supplierGrnCount,
    supplierPaymentsCount,
    suppliersOptions,
    supplierItems,
    isLoadingSuppliers,
    isLoadingSupplier,
    isLoadingSupRegister,
    isLoadingSupUpdate,
    isLoadingAddSupPayment,
    isLoadingSuppliersOptions,
    isLoadingSupplierGrnRecords,
    isLoadingSupplierPayments,
    isLoadingSupplierItems,
    isLoadingAddStockBulk,
    getAllSuppliers,
    fetchSupplierInfo,
    registerSupplier,
    updateSupplier,
    addStockBulks,
    createSupplierPayments,
    fetchSuppliersForSelection,
    fetchSupplierGrnRecords,
    fetchSupplierRecentPayments,
    fetchSupplierItemsInfo,
  };
};

export default useSupplier;
