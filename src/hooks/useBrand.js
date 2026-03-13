import axios from 'axios';
import { useState } from 'react';
import { fetchBrandOptions, fetchBrands, createBrand, editBrand } from 'src/api/brandService';
import useApiActions from './useApiActions';

const useBrand = () => {
  const sourceToken = axios.CancelToken.source();

  const [brands, setBrands] = useState([]);
  const [brandsCount, setBrandsCount] = useState(0);
  const [brandOptions, setBrandOptions] = useState([]);

  const { request: getBrandsRequest, loading: isLoadingBrands } = useApiActions(fetchBrands);

  const { request: getOptionsRequest, loading: isLoadingBrandsOptions } =
    useApiActions(fetchBrandOptions);

  const { request: addBrandRequest, loading: isLoadingAddBrands } = useApiActions(createBrand);

  const { request: updateBrandRequest, loading: isLoadingUpdateBrands } = useApiActions(editBrand);

  const getBrands = async (params) => {
    const data = await getBrandsRequest(params, sourceToken.token);

    if (data) {
      setBrands(data.data.length > 0 ? data.data : []);
      setBrandsCount(data.count || 0);
    }
  };

  const getBrandsOptional = async () => {
    const data = await getOptionsRequest(sourceToken.token);

    if (data) {
      setBrandOptions(data);
    }
  };

  const addBrand = async (data) => {
    const res = await addBrandRequest(data, sourceToken.token);
    return !!res;
  };

  const updateBrand = async (data, id) => {
    const res = await updateBrandRequest(data, sourceToken.token, id);
    return !!res;
  };

  //   const [isLoadingBrands, setIsLoadingBrands] = useState(true);
  //   const [isLoadingBrandsOptions, setIsLoadingBrandsOptions] = useState(false);
  //   const [isLoadingAddBrands, setIsLoadingAddBrands] = useState(false);
  //   const [isLoadingUpdateBrands, setIsLoadingUpdateBrands] = useState(false);

  //   const getBrands = async (params) => {
  //     await backendAuthApi({
  //       url: BACKEND_API.BRANDS,
  //       method: 'GET',
  //       cancelToken: sourceToken.token,
  //       params,
  //     })
  //       .then((res) => {
  //         if (responseUtil.isResponseSuccess(res.data.responseCode)) {
  //           setBrands(res.data.responseData.data.length > 0 ? res.data.responseData.data : []);
  //           setBrandsCount(res.data.responseData.count);
  //         }

  //         setIsLoadingBrands(false);
  //       })
  //       .catch(() => {
  //         setIsLoadingBrands(false);
  //       });
  //   };

  //   const getBrandsOptional = async () => {
  //     setIsLoadingBrandsOptions(true);

  //     await backendAuthApi({
  //       url: BACKEND_API.BRANDS_OPTIONS,
  //       method: 'GET',
  //       cancelToken: sourceToken.token,
  //     })
  //       .then((res) => {
  //         if (responseUtil.isResponseSuccess(res.data.responseCode)) {
  //           setIsLoadingBrandsOptions(res.data.responseData);
  //         }

  //         setIsLoadingBrandsOptions(false);
  //       })
  //       .catch(() => {
  //         setIsLoadingBrandsOptions(false);
  //       });
  //   };

  //   const addBrand = async (data) => {
  //     if (isLoadingAddBrands) return;

  //     let isSuccess = false;

  //     setIsLoadingAddBrands(true);

  //     await backendAuthApi({
  //       url: BACKEND_API.BRANDS_ADD,
  //       method: 'POST',
  //       cancelToken: sourceToken.token,
  //       data,
  //     })
  //       .then((res) => {
  //         if (responseUtil.isResponseSuccess(res.data.responseCode)) {
  //           isSuccess = true;
  //         }

  //         setIsLoadingAddBrands(false);
  //       })
  //       .catch(() => {
  //         setIsLoadingAddBrands(false);
  //       });

  //     return isSuccess;
  //   };

  //   const updateBrand = async (data) => {
  //     if (isLoadingUpdateBrands) return;

  //     let isSuccess = false;

  //     setIsLoadingUpdateBrands(true);

  //     await backendAuthApi({
  //       url: BACKEND_API.BRANDS_UPDATE,
  //       method: 'PUT',
  //       cancelToken: sourceToken.token,
  //       data,
  //     })
  //       .then((res) => {
  //         if (responseUtil.isResponseSuccess(res.data.responseCode)) {
  //           isSuccess = true;
  //         }

  //         setIsLoadingUpdateBrands(false);
  //       })
  //       .catch(() => {
  //         setIsLoadingUpdateBrands(false);
  //       });

  //     return isSuccess;
  //   };

  return {
    brands,
    brandsCount,
    brandOptions,
    isLoadingBrands,
    isLoadingBrandsOptions,
    isLoadingAddBrands,
    isLoadingUpdateBrands,
    getBrands,
    getBrandsOptional,
    addBrand,
    updateBrand,
  };
};

export default useBrand;
