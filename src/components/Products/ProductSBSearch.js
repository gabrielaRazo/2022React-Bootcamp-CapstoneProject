import React from 'react';
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
import PropTypes from 'prop-types';

export const ProductSBSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiRef = useSelector((state) => state.dasboardReducer.apiRef);
  const searchText = useSelector((state) => state.dasboardReducer.searchText);
  const selectedCategory = useSelector(
    (state) => state.dasboardReducer.selectedCategory,
  );

  const leftArrowPage = (page) => {
    dispatch({ type: 'CHANGE_CATEGORIES_PAGE', categoriesPage: page });
    dispatch({
      type: 'GET_LIST_PRODUCTS_REQUEST',
      apiRef: apiRef,
      selectedCategory,
      page: page,
    });
    navigate(`/products/?page=${page}`);
  };
  const rightArrowPage = (page) => {
    dispatch({ type: 'CHANGE_CATEGORIES_PAGE', categoriesPage: page });
    dispatch({
      type: 'GET_LIST_PRODUCTS_REQUEST',
      apiRef: apiRef,
      selectedCategory,
      page: page,
    });
    navigate(`/products/?page=${page}`);
  };

  const listProductSearch = useSelector(
    (state) => state.dasboardReducer.listProductSearch,
  );

  const listProductSearchInfo = useSelector(
    (state) => state.dasboardReducer.listProductSearchInfo,
  );
  const fetchingProductSearch = useSelector(
    (state) => state.dasboardReducer.fetchingProductSearch,
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
    <ContainerSpinner active={fetchingProductSearch}>
      <TopSpace />
      <Spinner active={fetchingProductSearch} viewBox="0 0 50 50">
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
      {listProductSearch[0] ? (
        <>
          <Row centered>
            {listProductSearch.map(
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
                  onClick={() => leftArrowPage(listProductSearchInfo.page - 1)}
                  src="https://img.icons8.com/ios/50/undefined/double-left.png"
                />

                {listProductSearchInfo.page}
                <span>/</span>
                {listProductSearchInfo.total_pages}
                <img
                  onClick={() =>
                    rightArrowPage(
                      listProductSearchInfo.total_pages !==
                        listProductSearchInfo.page &&
                        listProductSearchInfo.page + 1,
                    )
                  }
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
                Sorry, we couldn't find any matches for the search
                <strong> "{searchText}"</strong>
              </TextCentered>
            </Col>
          </Row>
        </>
      )}
    </ContainerSpinner>
  );
};

ProductSBSearch.propTypes = {
  selectedCategory: PropTypes.string,
  listProductSearch: PropTypes.object,
  listProductSearchInfo: PropTypes.object,
  fetchingProductSearch: PropTypes.bool,
  searchText: PropTypes.string,
  apiRef: PropTypes.string,
};

export default ProductSBSearch;
