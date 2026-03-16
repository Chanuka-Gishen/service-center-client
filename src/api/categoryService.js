import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';

export const fetchCategories = (params, cancelToken) =>
  backendAuthApi({
    url: BACKEND_API.INV_CATEGORIES,
    method: 'GET',
    cancelToken,
    params,
  });

export const fetchCategoryOptions = (cancelToken) =>
  backendAuthApi({
    url: BACKEND_API.INV_CATEGORY_OPTIONS,
    method: 'GET',
    cancelToken,
    params,
  });

export const createCategory = (data, cancelToken) =>
  backendAuthApi({
    url: BACKEND_API.INV_CATEGORY_ADD,
    method: 'POST',
    cancelToken,
    data,
  });

export const EditCategory = (data, cancelToken) =>
  backendAuthApi({
    url: BACKEND_API.INV_CATEGORY_UPDATE,
    method: 'PUT',
    cancelToken,
    data,
  });
