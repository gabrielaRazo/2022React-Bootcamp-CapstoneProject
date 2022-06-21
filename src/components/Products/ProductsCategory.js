import React, { useEffect } from 'react';
import {
  Col,
  Row,
  TextCentered,
  TopSpace,
  Spinner,
  ContainerSpinner,
  PaginationContainer,
  Button,
} from '../../styles/Home.style';

import noResults from '../../assets/no-results.png';
import {
  Img,
  Text,
  TextImage,
  ContainerImage,
  Card,
} from '../../styles/Grid.style';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const ProductsCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiRef = useSelector((state) => state.dasboardReducer.apiRef);
  const urlPath = window.location.href.split('category=')[1];
  const urlPage = window.location.href.split('page=')[1];
  const selectedCategory = useSelector(
    (state) => state.dasboardReducer.selectedCategory,
  );

  const leftArrowPage = (page) => {
    const urlPathCategories = urlPath.split('?')[0].split(',');
    if (urlPath) {
      dispatch({ type: 'CHANGE_CATEGORIES_PAGE', categoriesPage: page });
      dispatch({
        type: 'GET_LIST_PRODUCTS_REQUEST',
        apiRef: apiRef,
        selectedCategory: urlPathCategories,
        page: page,
      });
      navigate(`/products/?category=${selectedCategory}?page=${page}`);
    } else {
      dispatch({ type: 'CHANGE_CATEGORIES_PAGE', categoriesPage: page });
      dispatch({
        type: 'GET_LIST_PRODUCTS_REQUEST',
        apiRef: apiRef,
        selectedCategory,
        page: page,
      });
      navigate(`/products/?category=${selectedCategory}?page=${page}`);
    }
  };
  const rightArrowPage = (page) => {
    const urlPathCategories = urlPath.split('?')[0].split(',');
    if (urlPath) {
      dispatch({ type: 'CHANGE_CATEGORIES_PAGE', categoriesPage: page });
      dispatch({
        type: 'GET_LIST_PRODUCTS_REQUEST',
        apiRef: apiRef,
        selectedCategory: urlPathCategories,
        page: page,
      });
      navigate(`/products/?category=${selectedCategory}?page=${page}`);
    } else {
      dispatch({ type: 'CHANGE_CATEGORIES_PAGE', categoriesPage: page });
      dispatch({
        type: 'GET_LIST_PRODUCTS_REQUEST',
        apiRef: apiRef,
        selectedCategory,
        page: page,
      });
      navigate(`/products/?category=${selectedCategory}?page=${page}`);
    }
  };

  useEffect(() => {
    if (urlPath) {
      const urlPathCategories = urlPath.split('?')[0].split(',');
      dispatch({
        type: 'GET_LIST_PRODUCTS_REQUEST',
        apiRef: apiRef,
        page: urlPage,
        selectedCategory: urlPathCategories,
      });
    } else if (urlPage) {
      dispatch({
        type: 'GET_LIST_PRODUCTS_REQUEST',
        apiRef: apiRef,
        page: urlPage,
        selectedCategory,
      });
    }
  }, [apiRef, selectedCategory, urlPath, urlPage]);

  const filterdProductList = useSelector(
    (state) => state.dasboardReducer.filterdProductList,
  );

  const listProducts = useSelector(
    (state) => state.dasboardReducer.listProducts,
  );

  const fetchingProducts = useSelector(
    (state) => state.dasboardReducer.fetchingProducts,
  );

  const getDetailProduct = (id) => {
    dispatch({
      type: 'GET_PRODUCT_DETAIL_REQUEST',
      apiRef: apiRef,
      productId: id,
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
      {filterdProductList[0] ? (
        <>
          <Row centered>
            {filterdProductList.map(
              ({ data: { mainimage, url, category, name, price }, id }) => (
                <Col lg="2" md="3" sm="4" xs="11" spaced>
                  <Card onClick={() => getDetailProduct(id)}>
                    <ContainerImage>
                      <Img products src={mainimage.url} alt={url} />
                      <TextImage>{category.slug}</TextImage>
                    </ContainerImage>
                    <Text>{name}</Text>
                    <Row centered>
                      <Text top>${price}</Text>
                      <Button bottom>Add to Cart</Button>
                    </Row>
                  </Card>
                </Col>
              ),
            )}
          </Row>
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
        </>
      ) : (
        <>
          <TopSpace extra />
          <Row centered>
            <Col lg="6" md="6" sm="8" xs="11" spaced>
              <Row centered>
                <Img src={noResults} />
              </Row>
            </Col>
            <Col lg="6" md="6" sm="6" xs="11" spaced>
              <TextCentered>
                Sorry, we couldn't find any matches for the categories
                <strong> "{selectedCategory.join(', ')}"</strong>
              </TextCentered>
            </Col>
          </Row>
        </>
      )}
    </ContainerSpinner>
  );
};

export default ProductsCategory;
