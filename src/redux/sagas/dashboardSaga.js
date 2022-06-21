import { takeLatest, call, put } from 'redux-saga/effects';
import * as dashboardActions from '../actions/dashboardActions';
import { API_BASE_URL } from '../../utils/constants';

import axios from 'axios';

const controller = new AbortController();

function* listCategoriesDashboard(action) {
  try {
    //console.log(action);
    const apiRef = action.apiRef;
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
        '[[at(document.type, "category")]]',
      )}&lang=en-us&pageSize=30`,
      {
        signal: controller.signal,
      },
    );

    if (response.status === 200) {
      const listCategories = response.data;
      yield put({
        type: dashboardActions.GET_LIST_CATEGORIES_SUCCESS,
        listCategories: listCategories,
      });
    } else {
      yield put({ type: dashboardActions.GET_LIST_CATEGORIES_FAILURE });
    }
  } catch (error) {
    //console.log(error);
    yield put({ type: dashboardActions.GET_LIST_CATEGORIES_FAILURE });
  }
}
export function* listCategoriesDashboardSaga() {
  yield takeLatest(
    dashboardActions.GET_LIST_CATEGORIES_REQUEST,
    listCategoriesDashboard,
  );
}

function* listProductsDashboard(action) {
  try {
    //console.log('action productos', action);
    const apiRef = action.apiRef;
    let page = 1;
    if (action.page) {
      page = parseInt(action.page);
    }
    const selectedCategory = action.selectedCategory;

    const response = yield call(
      axios.get,
      `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
        '[[at(document.type, "product")]]',
      )}&lang=en-us&page=${page}&pageSize=12`,
      {
        signal: controller.signal,
      },
    );

    //console.log('response products', response, page, selectedCategory);

    if (response.status === 200) {
      const listProducts = response.data;
      let filterdProductList = [];

      if (selectedCategory) {
        for (let i = 0; i < listProducts.results.length; i++) {
          for (const item in selectedCategory) {
            if (
              listProducts.results[i].data.category.slug
                .toLowerCase()
                .includes(selectedCategory[item].toLowerCase()) === true
            ) {
              filterdProductList.push(listProducts.results[i]);
            }
          }
        }
      }
      //console.log('filterdProductList', filterdProductList, listProducts);

      yield put({
        type: dashboardActions.GET_LIST_PRODUCTS_SUCCESS,
        listProducts: listProducts,
        filterdProductList: filterdProductList,
      });
    } else {
      yield put({ type: dashboardActions.GET_LIST_PRODUCTS_FAILURE });
    }
  } catch (error) {
    //console.log(error);
    yield put({ type: dashboardActions.GET_LIST_PRODUCTS_FAILURE });
  }
}
export function* listProductsDashboardSaga() {
  yield takeLatest(
    dashboardActions.GET_LIST_PRODUCTS_REQUEST,
    listProductsDashboard,
  );
}

function* getProductDetail(action) {
  try {
    //console.log(action);
    const apiRef = action.apiRef;
    const productId = action.productId;
    const API_URL =
      'https://wizeline-academy.cdn.prismic.io/api/v2/documents/search';
    const response = yield call(
      axios.get,
      `${API_URL}?ref=${apiRef}&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22${productId}%22%29+%5D%5D`,
      {
        signal: controller.signal,
      },
    );
    //console.log('response de product', response, productId);

    if (response.status === 200) {
      const productDetail = response.data.results;
      yield put({
        type: dashboardActions.GET_PRODUCT_DETAIL_SUCCESS,
        productDetail: productDetail,
      });
    } else {
      yield put({ type: dashboardActions.GET_PRODUCT_DETAIL_FAILURE });
    }
  } catch (error) {
    //console.log(error);
    yield put({ type: dashboardActions.GET_PRODUCT_DETAIL_FAILURE });
  }
}
export function* getProductDetailSaga() {
  yield takeLatest(
    dashboardActions.GET_PRODUCT_DETAIL_REQUEST,
    getProductDetail,
  );
}

function* listProductSearch(action) {
  try {
    //console.log(action);
    let searchText = '';
    if (action.searchText) {
      searchText = action.searchText;
    }

    const apiRef = action.apiRef;
    const API_URL = `https://wizeline-academy.cdn.prismic.io/api/v2/documents/search`;
    const TYPE_URL = `?ref=${apiRef}&q=%5B%5Bat(document.type%2C%20%22product%22)%5D%5D&`;
    const URLP2 = `q=%5B%5Bfulltext(document%2C%20%22$`;

    const response = yield call(
      axios.get,
      `${API_URL}${TYPE_URL}${URLP2}${searchText}%22)%5D%5D&lang=en-us&pageSize=20`,
      {
        signal: controller.signal,
      },
    );
    //console.log('response', response);

    if (response.status === 200) {
      const searchResult = response.data;
      const listProductSearch = response.data.results;
      const listProductSearchInfo = response.data;

      yield put({
        type: dashboardActions.GET_PRODUCT_SEARCH_SUCCESS,
        searchResult: searchResult,
        listProductSearch: listProductSearch,
        listProductSearchInfo: listProductSearchInfo,
      });
    } else {
      yield put({ type: dashboardActions.GET_PRODUCT_SEARCH_FAILURE });
    }
  } catch (error) {
    //console.log(error);
    yield put({ type: dashboardActions.GET_PRODUCT_SEARCH_FAILURE });
  }
}
export function* listProductSearchSaga() {
  yield takeLatest(
    dashboardActions.GET_PRODUCT_SEARCH_REQUEST,
    listProductSearch,
  );
}
