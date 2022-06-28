import React, { useEffect } from 'react';
import {
  Col,
  Row,
  TopSpace,
  SectionTitle,
  Button,
  ContainerSpinner,
  Spinner,
} from '../styles/Home.style';
import {
  Img,
  Text,
  TextImage,
  ContainerImage,
  CardDashboard,
} from '../styles/Grid.style';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const GridProductos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiRef = useSelector((state) => state.dasboardReducer.apiRef);
  const shoppingCartList = useSelector(
    (state) => state.dasboardReducer.shoppingCartList,
  );

  useEffect(() => {
    dispatch({ type: 'GET_LIST_PRODUCTS_REQUEST', apiRef: apiRef });
    dispatch({
      type: 'GET_SHOPPING_CART_REQUEST',
      shoppingCartList: shoppingCartList,
    });
  }, [apiRef, shoppingCartList]);

  const listProducts = useSelector(
    (state) => state.dasboardReducer.listProducts,
  );
  const fetchingProducts = useSelector(
    (state) => state.dasboardReducer.fetchingProducts,
  );

  const resetSearch = () => {
    dispatch({ type: 'GET_PRODUCT_SEARCH_FAILURE' });
  };

  const addToCart = (idArticle) => {
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
    <div>
      <TopSpace />
      <TopSpace />
      <TopSpace />

      <ContainerSpinner active={fetchingProducts}>
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
          <TopSpace />
        </Spinner>
        <SectionTitle>Products</SectionTitle>
        {listProducts.results && (
          <Row centered>
            {listProducts.results.map(
              ({ data: { mainimage, url, category, name, price }, id }) => (
                <Col lg="2" md="3" sm="4" xs="11" spaced>
                  <CardDashboard>
                    <ContainerImage onClick={() => getDetailProduct(id)}>
                      <Img src={mainimage.url} alt={url} />
                      <TextImage>{category.slug}</TextImage>
                    </ContainerImage>
                    <Text onClick={() => getDetailProduct(id)}>{name}</Text>
                    <Row centered>
                      <Text top>${price}</Text>
                      <Button bottom onClick={() => addToCart(id)}>
                        Add to Cart
                      </Button>
                    </Row>
                  </CardDashboard>
                </Col>
              ),
            )}
          </Row>
        )}
        <Row centered>
          <Link to="/products">
            <TopSpace />
            <Button onClick={resetSearch}>View all products</Button>
          </Link>
        </Row>
        <TopSpace />
      </ContainerSpinner>
    </div>
  );
};

GridProductos.propTypes = {
  current: PropTypes.number,
  listProducts: PropTypes.object,
  fetchingProducts: PropTypes.bool,
  apiRef: PropTypes.string,
};

export default GridProductos;
