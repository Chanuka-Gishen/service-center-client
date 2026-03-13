import { useState } from 'react';
import responseUtil from 'src/utils/responseUtil';

const useApiActions = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiFunction(...args);

      if (responseUtil.isResponseSuccess(res.data.responseCode)) {
        setLoading(false);
        return res.data.responseData || true;
      }

      return null;
    } catch (err) {
      setError(err);
      setLoading(false);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
};

export default useApiActions;
