import React, { useEffect, useState } from 'react';
import {
  Col,
  Row,
  TextCentered,
  TopSpace,
  Spinner,
  ContainerSpinner,
  PaginationContainer,
  Button,
} from '../styles/Home.style';

import noResults from '../assets/no-results.png';
import {
  Img,
  Text,
  TextImage,
  ContainerImage,
  Card,
} from '../styles/Grid.style';
import { useDispatch, useSelector } from 'react-redux';

export const Products = () => {
  const dispatch = useDispatch();
  const apiRef = useSelector((state) => state.dasboardReducer.apiRef);
  const urlPath = window.location.href.split('=')[1];
  const selectedCategory = useSelector(
    (state) => state.dasboardReducer.selectedCategory,
  );
  const categoriesPage = useSelector(
    (state) => state.dasboardReducer.categoriesPage,
  );

  const leftArrowPage = (page) => {
    dispatch({ type: 'CHANGE_CATEGORIES_PAGE', categoriesPage: page });
    dispatch({
      type: 'GET_LIST_PRODUCTS_REQUEST',
      apiRef: apiRef,
      selectedCategory,
      page: page,
    });
  };
  const rightArrowPage = (page) => {
    dispatch({ type: 'CHANGE_CATEGORIES_PAGE', categoriesPage: page });
    dispatch({
      type: 'GET_LIST_PRODUCTS_REQUEST',
      apiRef: apiRef,
      selectedCategory,
      page: page,
    });
  };

  useEffect(() => {
    if (urlPath) {
      const urlPathCategories = urlPath.split('?')[0].split(',');
      dispatch({
        type: 'GET_LIST_PRODUCTS_REQUEST',
        apiRef: apiRef,
        page: window.location.href.split('=')[2],
        selectedCategory: urlPathCategories,
      });
    } else {
      dispatch({
        type: 'GET_LIST_PRODUCTS_REQUEST',
        apiRef: apiRef,
        page: categoriesPage,
        selectedCategory,
      });
    }
  }, [apiRef, selectedCategory, urlPath]);

  const filterdProductList = useSelector(
    (state) => state.dasboardReducer.filterdProductList,
  );

  const listProducts = useSelector(
    (state) => state.dasboardReducer.listProducts,
  );

  const fetchingProducts = useSelector(
    (state) => state.dasboardReducer.fetchingProducts,
  );

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
              ({ data: { mainimage, url, category, name, price } }) => (
                <Col lg="2" md="3" sm="4" xs="11" spaced>
                  <Card>
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
          {selectedCategory[0] || urlPath ? (
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
          ) : (
            <>
              {listProducts.results && (
                <Row centered>
                  {listProducts.results.map(
                    ({ data: { mainimage, url, category, name, price } }) => (
                      <Col lg="2" md="3" sm="4" xs="11" spaced>
                        <Card>
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
            </>
          )}
        </>
      )}
    </ContainerSpinner>
  );
};

export default Products;
