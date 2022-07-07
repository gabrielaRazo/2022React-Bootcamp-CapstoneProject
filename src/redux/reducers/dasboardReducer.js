import * as dashboardActions from '../actions/dashboardActions';

const initialState = {
  //API ref
  apiRef: 'YZaBvBIAACgAvnOP',
  //Banner
  listBanner: [],
  fetchingBanner: false,
  //Categories
  listCategories: [],
  fetchingCategories: false,
  selectedCategory: [],
  categoriesPage: 1,
  //Products
  fetchingProducts: false,
  listProducts: [],
  filterdProductList: [],
  filterdProductListInfo: [],
  //Product Detail
  fetchingProductDetail: false,
  productDetail: [],
  //Search Bar
  searchResult: [],
  searchText: '',
  listProductSearch: [],
  listProductSearchInfo: [],
  fetchingProductSearch: false,
  searchDone: false,
  //Shooping Cart
  cartTotal: null,
  totalProductsCart: null,
  shoppingCartList: [],
  fetchingInfoToCart: false,
  stockOnItem: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    //API ref
    case dashboardActions.GET_API_REF:
      return { ...state, apiRef: action.apiRef };

    //Banner
    case dashboardActions.GET_LIST_BANNER_REQUEST:
      return { ...state, fetchingBanner: true };
    case dashboardActions.GET_LIST_BANNER_SUCCESS:
      return { ...state, fetchingBanner: false, listBanner: action.listBanner };
    case dashboardActions.GET_LIST_BANNER_FAILURE:
      return { ...state, fetchingBanner: false };

    //Categories
    case dashboardActions.GET_LIST_CATEGORIES_REQUEST:
      return { ...state, fetchingCategories: true };
    case dashboardActions.GET_LIST_CATEGORIES_SUCCESS:
      return {
        ...state,
        fetchingCategories: false,
        listCategories: action.listCategories,
      };
    case dashboardActions.GET_LIST_CATEGORIES_FAILURE:
      return { ...state, fetchingCategories: false };

    case dashboardActions.CHANGE_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.selectedCategory };

    //Products
    case dashboardActions.GET_LIST_PRODUCTS_REQUEST:
      return { ...state, fetchingProducts: true };
    case dashboardActions.GET_LIST_PRODUCTS_SUCCESS:
      return {
        ...state,
        fetchingProducts: false,
        listProducts: action.listProducts,
        filterdProductList: action.filterdProductList,
        filterdProductListInfo: action.filterdProductListInfo,
      };
    case dashboardActions.GET_LIST_PRODUCTS_FAILURE:
      return { ...state, fetchingProducts: false };

    //Pagination Categories
    case dashboardActions.CHANGE_CATEGORIES_PAGE:
      return { ...state, categoriesPage: action.categoriesPage };

    //Product Detail
    case dashboardActions.GET_PRODUCT_DETAIL_REQUEST:
      return { ...state, fetchingProductDetail: true };
    case dashboardActions.GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        fetchingProductDetail: false,
        productDetail: action.productDetail,
      };
    case dashboardActions.GET_PRODUCT_DETAIL_FAILURE:
      return { ...state, fetchingProductDetail: false };

    //Search Bar
    case dashboardActions.CHANGE_SEARCH_VALUE:
      return { ...state, searchText: action.searchText };

    case dashboardActions.GET_PRODUCT_SEARCH_REQUEST:
      return { ...state, fetchingProductSearch: true, searchDone: false };
    case dashboardActions.GET_PRODUCT_SEARCH_SUCCESS:
      return {
        ...state,
        fetchingProductSearch: false,
        searchResult: action.searchResult,
        listProductSearch: action.listProductSearch,
        listProductSearchInfo: action.listProductSearchInfo,
        searchDone: true,
      };
    case dashboardActions.GET_PRODUCT_SEARCH_FAILURE:
      return {
        ...state,
        fetchingProductSearch: false,
        listProductSearch: [],
        searchDone: false,
      };

    //shopping cart
    case dashboardActions.GET_SHOPPING_CART_REQUEST:
      return { ...state, fetchingInfoToCart: true };
    case dashboardActions.GET_SHOPPING_CART_SUCCESS:
      return {
        ...state,
        fetchingInfoToCart: false,
        cartTotal: action.cartTotal,
        totalProductsCart: action.totalProductsCart,
      };
    case dashboardActions.GET_SHOPPING_CART_FAILURE:
      return { ...state, fetchingInfoToCart: false };

    case dashboardActions.ADD_TO_CART_REQUEST:
      return { ...state, fetchingAddToCart: true };
    case dashboardActions.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        fetchingAddToCart: false,
        shoppingCartList: action.shoppingCartList,
      };
    case dashboardActions.ADD_TO_CART_FAILURE:
      return { ...state, fetchingAddToCart: false };

    case dashboardActions.EDIT_SHOPPING_CART_REQUEST:
      return { ...state, fetchingInfoToCart: true };
    case dashboardActions.EDIT_SHOPPING_CART_SUCCESS:
      return {
        ...state,
        fetchingInfoToCart: false,
        shoppingCartList: action.shoppingCartList,
        cartTotal: action.cartTotal,
        totalProductsCart: action.totalProductsCart,
      };
    case dashboardActions.EDIT_SHOPPING_CART_FAILURE:
      return { ...state, fetchingInfoToCart: false };

    case dashboardActions.REMOVE_PRODUCT_CART_REQUEST:
      return { ...state, fetchingInfoToCart: true };
    case dashboardActions.REMOVE_PRODUCT_CART_SUCCESS:
      return {
        ...state,
        fetchingInfoToCart: false,
        shoppingCartList: action.shoppingCartList,
        cartTotal: action.cartTotal,
        totalProductsCart: action.totalProductsCart,
      };
    case dashboardActions.REMOVE_PRODUCT_CART_FAILURE:
      return { ...state, fetchingInfoToCart: false };

    case dashboardActions.CHANGE_STOCK_ON_CART_REQUEST:
      return { ...state, fetchingProductDetail: true };
    case dashboardActions.CHANGE_STOCK_ON_CART_SUCCESS:
      return {
        ...state,
        fetchingProductDetail: false,
        stockOnItem: action.stockOnItem,
      };
    case dashboardActions.CHANGE_STOCK_ON_CART_FAILURE:
      return { ...state, fetchingProductDetail: false };

    default:
      return state;
  }
};
