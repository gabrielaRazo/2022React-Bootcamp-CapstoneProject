import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';
import { useDispatch } from 'react-redux';

function useFeaturedBanners() {
  const dispatch = useDispatch();

  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [featuredBanners, setFeaturedBanners] = useState(() => ({
    data: {},
    isLoading: true,
  }));

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getFeaturedBanners() {
      try {
        dispatch({ type: 'GET_API_REF', apiRef: apiRef });
        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            '[[at(document.type, "banner")]]',
          )}&lang=en-us&pageSize=5`,
          {
            signal: controller.signal,
          },
        );

        if (response.status === 200) {
          const data = await response.json();
          dispatch({ type: 'GET_LIST_BANNER_SUCCESS', listBanner: data });
        } else {
          dispatch({ type: 'GET_LIST_BANNER_FAILURE', listBanner: [] });
        }
      } catch (err) {
        dispatch({ type: 'GET_LIST_BANNER_FAILURE', listBanner: [] });
        //console.error(err);
      }
    }

    getFeaturedBanners();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading]);

  return featuredBanners;
}

export default useFeaturedBanners;
