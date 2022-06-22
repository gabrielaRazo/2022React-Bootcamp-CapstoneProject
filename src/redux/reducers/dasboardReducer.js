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

    default:
      return state;
  }
};
