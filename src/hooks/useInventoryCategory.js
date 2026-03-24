import axios from 'axios';
import { useState } from 'react';
import useApiActions from './useApiActions';
import {
  createCategory,
  fetchCategories,
  fetchCategoryOptions,
  EditCategory,
} from 'src/api/categoryService';

const useInventoryCategory = () => {
  const sourceToken = axios.CancelToken.source();

  const [categories, setCategories] = useState([]);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const { request: getCategoriesRequest, loading: isLoadingCategories } =
    useApiActions(fetchCategories);
  const { request: getCategoryOptionsRequest, loading: isLoadingCategoryOptions } =
    useApiActions(fetchCategoryOptions);
  const { request: createCategoryRequest, loading: isLoadingAddCategory } =
    useApiActions(createCategory);
  const { request: updateCategoryRequest, loading: isLoadingUpdateCategory } =
    useApiActions(EditCategory);

  const getCategories = async (params) => {
    const result = await getCategoriesRequest(params, sourceToken.token);

    if (result) {
      setCategories(result.data.length > 0 ? result.data : []);
      console.log(result.data.length);

      setCategoriesCount(result.count || 0);
    }
  };

  const getCategoryOptions = async () => {
    const result = await getCategoryOptionsRequest(sourceToken.token);

    if (result) {
      setCategoryOptions(result.length > 0 ? result : []);
    }
  };

  const addCategory = async (values) => {
    const result = await createCategoryRequest(values, sourceToken.token);

    return !!result;
  };

  const updateCategory = async (values) => {
    const result = await updateCategoryRequest(values, sourceToken.token);

    return !!result;
  };

  return {
    categories,
    categoriesCount,
    categoryOptions,
    isLoadingCategories,
    isLoadingCategoryOptions,
    isLoadingAddCategory,
    isLoadingUpdateCategory,
    getCategories,
    getCategoryOptions,
    addCategory,
    updateCategory,
  };
};

export default useInventoryCategory;
