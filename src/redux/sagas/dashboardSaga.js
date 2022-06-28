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
      yield put({
        type: dashboardActions.CHANGE_STOCK_ON_CART_REQUEST,
        shoppingCartList: action.shoppingCartList,
        idArticle: productId,
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

function* addToShoppingCart(action) {
  try {
    const listProducts = action.listProducts;
    const productsAdded = action.shoppingCartList;
    let total = 0;
    if (action.cartTotal) {
      total = action.cartTotal;
    }

    let productAdded = listProducts.find(
      (producto) => producto.id === action.idArticle,
    );

    if (productAdded) {
      let productExisting = productsAdded.find(
        (productAdded) => action.idArticle === productAdded.id,
      );

      if (productExisting) {
        const shoppingCartList = [...productsAdded];
        for (let i = 0; i < productsAdded.length; i++) {
          if (productsAdded[i].id === productExisting.id) {
            productsAdded[i].quantity = productsAdded[i].quantity + 1;
          }
        }
        total = total + productAdded.data.price;
        const totalProductsCart = shoppingCartList
          .map((li) => li.quantity)
          .reduce((sum, val) => sum + val, 0);
        yield put({
          type: dashboardActions.ADD_TO_CART_SUCCESS,
          shoppingCartList: [...productsAdded],
          cartTotal: total,
          totalProductsCart: totalProductsCart,
        });
      } else {
        productAdded.quantity = 1;
        total = total + productAdded.price;
        const shoppingCartList = [...productsAdded, productAdded];
        const totalProductsCart = shoppingCartList
          .map((li) => li.quantity)
          .reduce((sum, val) => sum + val, 0);

        yield put({
          type: dashboardActions.ADD_TO_CART_SUCCESS,
          shoppingCartList: shoppingCartList,
          cartTotal: total,
          totalProductsCart: totalProductsCart,
        });
      }
    } else {
      yield put({ type: dashboardActions.ADD_TO_CART_FAILURE });
    }
  } catch (error) {
    //console.log(error);
    yield put({ type: dashboardActions.ADD_TO_CART_FAILURE });
  }
}
export function* addToShoppingCartSaga() {
  yield takeLatest(dashboardActions.ADD_TO_CART_REQUEST, addToShoppingCart);
}

function* getShoppingCart(action) {
  try {
    //console.log('action', action);
    const shoppingCartList = action.shoppingCartList;
    const totalProductsCart = shoppingCartList
      .map((li) => li.quantity)
      .reduce((sum, val) => sum + val, 0);
    const cartTotal = shoppingCartList
      .map((item) => item.data.price * item.quantity)
      .reduce((total, num) => total + num, 0);

    yield put({
      type: dashboardActions.GET_SHOPPING_CART_SUCCESS,
      cartTotal: cartTotal,
      totalProductsCart: totalProductsCart,
    });
  } catch (error) {
    //console.log(error);
    yield put({ type: dashboardActions.GET_SHOPPING_CART_FAILURE });
  }
}
export function* getShoppingCartSaga() {
  yield takeLatest(dashboardActions.GET_SHOPPING_CART_REQUEST, getShoppingCart);
}

function* deleteItemCart(action) {
  try {
    console.log('action', action);
    const productsAdded = action.shoppingCartList;
    const total = action.cartTotal;
    const totalProductsCart = action.totalProductsCart;
    const productToDelete = productsAdded.find(
      (product) => action.idArticle === product.id,
    );
    const newProducts = productsAdded.filter(
      (product) => action.idArticle !== product.id,
    );
    const newTotal = total - productToDelete.price * productToDelete.quantity;
    const newTotalProducts = totalProductsCart - productToDelete.quantity;

    yield put({
      type: dashboardActions.REMOVE_PRODUCT_CART_SUCCESS,
      shoppingCartList: newProducts,
      cartTotal: newTotal,
      totalProductsCart: newTotalProducts,
    });
  } catch (error) {
    //console.log(error);
    yield put({ type: dashboardActions.REMOVE_PRODUCT_CART_FAILURE });
  }
}
export function* deleteItemCartSaga() {
  yield takeLatest(
    dashboardActions.REMOVE_PRODUCT_CART_REQUEST,
    deleteItemCart,
  );
}

function* editItemsCart(action) {
  try {
    const productsAdded = action.shoppingCartList;
    let total = 0;
    if (action.cartTotal) {
      total = action.cartTotal;
    }
    const actionToEdit = action.actionToEdit;

    let productAdded = productsAdded.find(
      (producto) => producto.id === action.idArticle,
    );

    if (actionToEdit === 'add') {
      if (productAdded) {
        total = total + productAdded.data.price;
        for (let i = 0; i < productsAdded.length; i++) {
          if (productsAdded[i].id === productAdded.id) {
            productsAdded[i].quantity = productsAdded[i].quantity + 1;
          }
        }
        const totalProductsCart = action.shoppingCartList
          .map((li) => li.quantity)
          .reduce((sum, val) => sum + val, 0);
        yield put({
          type: dashboardActions.EDIT_SHOPPING_CART_SUCCESS,
          cartTotal: total,
          shoppingCartList: action.shoppingCartList,
          totalProductsCart: totalProductsCart,
        });
      }
    } else if (actionToEdit === 'sub') {
      if (productAdded) {
        if (productAdded.quantity === 1) {
          const newProducts = productsAdded.filter(
            (product) => action.idArticle !== product.id,
          );
          total = total - productAdded.data.price;
          const totalProductsCart = newProducts
            .map((li) => li.quantity)
            .reduce((sum, val) => sum + val, 0);
          yield put({
            type: dashboardActions.EDIT_SHOPPING_CART_SUCCESS,
            shoppingCartList: newProducts,
            cartTotal: total,
            totalProductsCart: totalProductsCart,
          });
        } else {
          for (let i = 0; i < productsAdded.length; i++) {
            if (productsAdded[i].id === productAdded.id) {
              productsAdded[i].quantity = productsAdded[i].quantity - 1;
            }
          }
          total = total - productAdded.data.price;
          const totalProductsCart = productsAdded
            .map((li) => li.quantity)
            .reduce((sum, val) => sum + val, 0);

          yield put({
            type: dashboardActions.EDIT_SHOPPING_CART_SUCCESS,
            shoppingCartList: productsAdded,
            cartTotal: total,
            totalProductsCart: totalProductsCart,
          });
        }
      }
    }
  } catch (error) {
    //console.log(error);
    yield put({ type: dashboardActions.EDIT_SHOPPING_CART_FAILURE });
  }
}
export function* editItemsCartSaga() {
  yield takeLatest(dashboardActions.EDIT_SHOPPING_CART_REQUEST, editItemsCart);
}

function* changeStockItemCart(action) {
  try {
    //console.log('action', action);
    const shoppingCartList = action.shoppingCartList;
    const idArticle = action.idArticle;
    let stockOnItem = 0;

    for (let i = 0; i < shoppingCartList.length; i++) {
      if (idArticle === shoppingCartList[i].id) {
        stockOnItem = shoppingCartList[i].quantity;
      }
    }

    yield put({
      type: dashboardActions.CHANGE_STOCK_ON_CART_SUCCESS,
      stockOnItem: stockOnItem,
    });
  } catch (error) {
    //console.log(error);
    yield put({ type: dashboardActions.CHANGE_STOCK_ON_CART_FAILURE });
  }
}
export function* changeStockItemCartSaga() {
  yield takeLatest(
    dashboardActions.CHANGE_STOCK_ON_CART_REQUEST,
    changeStockItemCart,
  );
}
