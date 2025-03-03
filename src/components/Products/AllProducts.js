import React, { useEffect } from 'react';
import {
  Col,
  Row,
  TopSpace,
  Spinner,
  ContainerSpinner,
  PaginationContainer,
  Button,
} from '../../styles/Home.style';
import {
  Img,
  Text,
  TextImage,
  ContainerImage,
  Card,
} from '../../styles/Grid.style';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiRef = useSelector((state) => state.dasboardReducer.apiRef);
  let urlPage = window.location.href;
  if (window.location.href) {
    urlPage = window.location.href.split('page=')[1];
  }

  const categoriesPage = useSelector(
    (state) => state.dasboardReducer.categoriesPage,
  );

  const leftArrowPage = (page) => {
    dispatch({ type: 'CHANGE_CATEGORIES_PAGE', categoriesPage: page });
    dispatch({
      type: 'GET_LIST_PRODUCTS_REQUEST',
      apiRef: apiRef,
      selectedCategory: [],
      page: page,
    });
    navigate(`/products/?page=${page}`);
  };
  const rightArrowPage = (page) => {
    dispatch({ type: 'CHANGE_CATEGORIES_PAGE', categoriesPage: page });
    dispatch({
      type: 'GET_LIST_PRODUCTS_REQUEST',
      apiRef: apiRef,
      selectedCategory: [],
      page: page,
    });
    navigate(`/products/?page=${page}`);
  };

  useEffect(() => {
    if (urlPage) {
      dispatch({
        type: 'GET_LIST_PRODUCTS_REQUEST',
        apiRef: apiRef,
        page: urlPage,
        selectedCategory: [],
      });
    } else {
      dispatch({
        type: 'GET_LIST_PRODUCTS_REQUEST',
        apiRef: apiRef,
        page: categoriesPage,
        selectedCategory: [],
      });
    }
  }, [apiRef, urlPage]);

  const listProducts = useSelector(
    (state) => state.dasboardReducer.listProducts,
  );

  const fetchingProducts = useSelector(
    (state) => state.dasboardReducer.fetchingProducts,
  );

  const shoppingCartList = useSelector(
    (state) => state.dasboardReducer.shoppingCartList,
  );

  const addToCart = (idArticle) => {
    console.log('idArticle', idArticle);
    dispatch({
      type: 'ADD_TO_CART_REQUEST',
      idArticle,
      listProducts: listProducts.results,
      shoppingCartList,
    });
  };

  const getDetailProduct = (id) => {
    dispatch({
      type: 'GET_PRODUCT_DETAIL_REQUEST',
      apiRef: apiRef,
      productId: id,
      shoppingCartList,
    });
    navigate(`/product/${id}`);
  };

  return (
    <ContainerSpinner active={fetchingProducts}>
      <TopSpace />
      <Spinner active={fetchingProducts} viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
        <p>Loading...</p>
      </Spinner>
      {listProducts.results && (
        <Row centered>
          {listProducts.results.map(
            ({ data: { mainimage, url, category, name, price }, id }) => (
              <Col lg="2" md="3" sm="4" xs="11" spaced>
                <Card>
                  <ContainerImage onClick={() => getDetailProduct(id)}>
                    <Img products src={mainimage.url} alt={url} />
                    <TextImage>{category.slug}</TextImage>
                  </ContainerImage>
                  <Text>{name}</Text>
                  <Row centered>
                    <Text top onClick={() => getDetailProduct(id)}>
                      ${price}
                    </Text>
                    <Button bottom onClick={() => addToCart(id)}>
                      Add to Cart
                    </Button>
                  </Row>
                </Card>
              </Col>
            ),
          )}
        </Row>
      )}
      <Row centered>
        <Col lg="3" md="3" sm="3" xs="9">
          <PaginationContainer>
            <img
              onClick={() => leftArrowPage(listProducts.page - 1)}
              src="https://img.icons8.com/ios/50/undefined/double-left.png"
            />

            {listProducts.page}
            <span>/</span>
            {listProducts.total_pages}
            <img
              onClick={() => rightArrowPage(listProducts.page + 1)}
              src="https://img.icons8.com/ios/50/undefined/double-right.png"
            />
          </PaginationContainer>
        </Col>
      </Row>
    </ContainerSpinner>
  );
};

AllProducts.propTypes = {
  categoriesPage: PropTypes.number,
  listProducts: PropTypes.object,
  fetchingProducts: PropTypes.bool,
  urlPage: PropTypes.string,
  selectedCategory: PropTypes.string,
  apiRef: PropTypes.string,
};

export default AllProducts;
