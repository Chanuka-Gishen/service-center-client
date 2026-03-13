import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';

export const fetchBrands = (params, cancelToken) =>
  backendAuthApi({
    url: BACKEND_API.BRANDS,
    method: 'GET',
    params,
    cancelToken,
  });

export const fetchBrandOptions = (cancelToken) =>
  backendAuthApi({
    url: BACKEND_API.BRANDS_OPTIONS,
    method: 'GET',
    cancelToken,
  });

export const createBrand = (data, cancelToken) =>
  backendAuthApi({
    url: BACKEND_API.BRANDS_ADD,
    method: 'POST',
    data,
    cancelToken,
  });

export const editBrand = (data, cancelToken, id) =>
  backendAuthApi({
    url: BACKEND_API.BRANDS_UPDATE,
    method: 'PUT',
    params: { id },
    data,
    cancelToken,
  });
