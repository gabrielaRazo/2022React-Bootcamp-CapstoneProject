import { takeLatest, call, put } from 'redux-saga/effects';
import * as dashboardActions from '../actions/dashboardActions';
import { API_BASE_URL } from '../../utils/constants';

import axios from 'axios';

const controller = new AbortController();

function* listCategoriesDashboard(action) {
  try {
    console.log(action);
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
    console.log('response categories', response);

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
    console.log(action);
    const apiRef = action.apiRef;
    const selectedCategory = action.selectedCategory;
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
        '[[at(document.type, "product")]]',
      )}&lang=en-us&pageSize=12`,
      {
        signal: controller.signal,
      },
    );

    console.log(response);

    if (response.status === 200) {
      const listProducts = response.data;
      let filterdProductList = [];

      if (selectedCategory) {
        for (let i = 0; i < listProducts.results.length; i++) {
          if (
            listProducts.results[i].data.category.slug
              .toLowerCase()
              .includes(selectedCategory.toLowerCase()) === true
          ) {
            filterdProductList.push(listProducts.results[i]);
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
    console.log(error);
    yield put({ type: dashboardActions.GET_LIST_PRODUCTS_FAILURE });
  }
}
export function* listProductsDashboardSaga() {
  yield takeLatest(
    dashboardActions.GET_LIST_PRODUCTS_REQUEST,
    listProductsDashboard,
  );
}
