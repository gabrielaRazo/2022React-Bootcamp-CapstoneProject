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

    //console.log('response products', response);

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
    console.log(action);
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

    console.log('response de product', response, productId);

    if (response.status === 200) {
      const productDetail = response.data;
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
