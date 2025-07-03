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
  const [grnInfo, setGrnInfo] = useState(null);
  const [suppliersOptions, setSuppliersOptions] = useState([]);
  const [supplierGrnRecords, setSupplierGrnRecords] = useState([]);
  const [supplierPayments, setSupplierPayments] = useState([]);
  const [supplierItems, setSupplierItems] = useState([]);
  const [supplierReturns, setSupplierReturns] = useState([]);

  const [suppliersCount, setSuppliersCount] = useState(0);
  const [supplierGrnCount, setSupplierGrnCount] = useState(0);
  const [supplierPaymentsCount, setSupplierPaymentsCount] = useState(0);
  const [supplierReturnsCount, setSupplierReturnsCount] = useState(0);

  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(true);
  const [isLoadingSupplier, setIsLoadingSupplier] = useState(true);
  const [isLoadingSupRegister, setIsLoadingSupRegister] = useState(false);
  const [isLoadingSupUpdate, setIsLoadingSupUpdate] = useState(false);
  const [isLoadingAddSupPayment, setIsLoadingAddSupPayment] = useState(false);
  const [isLoadingSuppliersOptions, setIsLoadingSuppliersOptions] = useState(false);
  const [isLoadingSupplierGrnRecords, setIsLoadingSupplierGrnRecords] = useState(false);
  const [isLoadingGrnInfo, setIsLoadingGrnInfo] = useState(true);
  const [isLoadingSupplierPayments, setIsLoadingSupplierPayments] = useState(false);
  const [isLoadingSupplierItems, setIsLoadingSupplierItems] = useState(false);
  const [isLoadingAddStockBulk, setIsLoadingAddStockBulk] = useState(false);
  const [isLoadingSupReturns, setIsLoadingSupReturns] = useState(false);
  const [isLoadingCreateReturns, setIsLoadingCreateReturns] = useState(false);
  const [isLoadingProcessReturns, setIsLaodingProcessReturns] = useState(false);
  const [isLoadingCancelReturns, setIsLoadingCancelReturns] = useState(false);

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
      url: BACKEND_API.SUPPLIER_GRN_RECORDS,
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

  // Fetch supplier Grn record info
  const fetchGrnInfo = async (id) => {
    setIsLoadingGrnInfo(true);

    await backendAuthApi({
      url: BACKEND_API.SUPPLIER_GRN_RECORD_INFO,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: { id },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setGrnInfo(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingGrnInfo(false);
      })
      .finally(() => {
        setIsLoadingGrnInfo(false);
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

  // Fetch supplier return items
  const fetchSupplierReturnItems = async (params) => {
    setIsLoadingSupReturns(true);

    await backendAuthApi({
      url: BACKEND_API.SUPPLIER_RETURNED_ITEMS,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setSupplierReturns(res.data.responseData.data);
          setSupplierReturnsCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoadingSupReturns(false);
      })
      .finally(() => {
        setIsLoadingSupReturns(false);
      });
  };

  // Create item return record
  const createItemReturnRecord = async (data) => {
    let isSuccess = false;

    setIsLoadingCreateReturns(true);

    await backendAuthApi({
      url: BACKEND_API.SUPPLIER_RETURN_ITEM,
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
        setIsLoadingCreateReturns(false);
      })
      .finally(() => {
        setIsLoadingCreateReturns(false);
      });

    return isSuccess;
  };

  // Process item return record
  const processItemReturnRecord = async (data) => {
    let isSuccess = false;

    setIsLaodingProcessReturns(true);

    await backendAuthApi({
      url: BACKEND_API.SUPPLIER_RETURN_PROCESS,
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
        setIsLaodingProcessReturns(false);
      })
      .finally(() => {
        setIsLaodingProcessReturns(false);
      });

    return isSuccess;
  };

  // Cancel item return record
  const cancelItemReturnRecord = async (params) => {
    let isSuccess = false;

    setIsLoadingCancelReturns(true);

    await backendAuthApi({
      url: BACKEND_API.SUPPLIER_RETURN_CANCEL,
      method: 'PUT',
      cancelToken: sourceToken.token,
      params,
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
        setIsLoadingCancelReturns(false);
      })
      .finally(() => {
        setIsLoadingCancelReturns(false);
      });

    return isSuccess;
  };

  return {
    suppliers,
    supplier,
    supplierGrnRecords,
    grnInfo,
    supplierPayments,
    suppliersCount,
    supplierGrnCount,
    supplierPaymentsCount,
    suppliersOptions,
    supplierItems,
    supplierReturns,
    supplierReturnsCount,
    isLoadingSuppliers,
    isLoadingSupplier,
    isLoadingSupRegister,
    isLoadingSupUpdate,
    isLoadingAddSupPayment,
    isLoadingSuppliersOptions,
    isLoadingSupplierGrnRecords,
    isLoadingGrnInfo,
    isLoadingSupplierPayments,
    isLoadingSupplierItems,
    isLoadingAddStockBulk,
    isLoadingSupReturns,
    isLoadingCreateReturns,
    isLoadingProcessReturns,
    isLoadingCancelReturns,
    getAllSuppliers,
    fetchSupplierInfo,
    registerSupplier,
    updateSupplier,
    addStockBulks,
    createSupplierPayments,
    fetchSuppliersForSelection,
    fetchSupplierGrnRecords,
    fetchGrnInfo,
    fetchSupplierRecentPayments,
    fetchSupplierItemsInfo,
    fetchSupplierReturnItems,
    createItemReturnRecord,
    processItemReturnRecord,
    cancelItemReturnRecord,
  };
};

export default useSupplier;
