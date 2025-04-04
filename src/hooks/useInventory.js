import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import responseUtil from 'src/utils/responseUtil';

const useInventory = () => {
  const { enqueueSnackbar } = useSnackbar();

  const sourceToken = axios.CancelToken.source();

  const [items, setItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [item, setItem] = useState(null);
  const [selectItems, setSelectItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSelect, setIsLoadingSelect] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingStockUpdate, setIsLoadingStockUpdate] = useState(false);

  // Fetch all inventory items
  const fetchAllItems = async (params) => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.ITEMS,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setItems(res.data.responseData.data);
          setItemsCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return items;
  };

  // Fetch inventory items for selection
  const fetchItemsForSelection = async (params) => {
    if (isLoadingSelect) return;

    setIsLoadingSelect(true);

    await backendAuthApi({
      url: BACKEND_API.ITEMS_SELECT,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setSelectItems(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingSelect(false);
      })
      .finally(() => {
        setIsLoadingSelect(false);
      });
  };

  // Add inventory item
  const addItems = async (data) => {
    if (isLoadingAdd) return;

    let isSuccess = false;

    setIsLoadingAdd(true);

    await backendAuthApi({
      url: BACKEND_API.ITEMS_ADD,
      method: 'POST',
      cancelToken: sourceToken.token,
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
        setIsLoadingAdd(false);
      })
      .finally(() => {
        setIsLoadingAdd(false);
      });
    return isSuccess;
  };

  // Update inventory item stock
  const updapteItemStock = async (data) => {
    if (isLoadingStockUpdate) return;

    let isSuccess = false;

    setIsLoadingStockUpdate(true);

    await backendAuthApi({
      url: BACKEND_API.ITEM_UPDATE_STOCK,
      method: 'PUT',
      cancelToken: sourceToken.token,
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
        setIsLoadingStockUpdate(false);
      })
      .finally(() => {
        setIsLoadingStockUpdate(false);
      });

    return isSuccess;
  };

  return {
    items,
    selectItems,
    item,
    itemsCount,
    isLoading,
    isLoadingSelect,
    isLoadingAdd,
    isLoadingStockUpdate,
    fetchAllItems,
    fetchItemsForSelection,
    addItems,
    updapteItemStock,
  };
};

export default useInventory;
