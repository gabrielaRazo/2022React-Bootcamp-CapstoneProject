import React, { useEffect } from 'react';
import { Col, Row, TopSpace, SectionTitle, Button } from '../styles/Home.style';
import {
  Img,
  Text,
  TextImage,
  ContainerImage,
  Card,
  CardDashboard,
} from '../styles/Grid.style';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const GridProductos = () => {
  const dispatch = useDispatch();
  const apiRef = useSelector((state) => state.dasboardReducer.apiRef);

  useEffect(() => {
    dispatch({ type: 'GET_LIST_PRODUCTS_REQUEST', apiRef: apiRef });
  }, [apiRef]);

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
  };

  return (
    <div>
      <TopSpace />
      <TopSpace />
      <TopSpace />

      <SectionTitle>Products</SectionTitle>
      {listProducts.results && (
        <Row centered>
          {listProducts.results.map(
            ({ data: { mainimage, url, category, name, price }, id }) => (
              <Col lg="2" md="3" sm="4" xs="11" spaced>
                <CardDashboard onClick={() => getDetailProduct(id)}>
                  <ContainerImage>
                    <Img src={mainimage.url} alt={url} />
                    <TextImage>{category.slug}</TextImage>
                  </ContainerImage>
                  <Text>{name}</Text>
                  <Row centered>
                    <Text top>${price}</Text>
                    <Button bottom>Add to Cart</Button>
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
          <Button>View all products</Button>
        </Link>
      </Row>
      <TopSpace />
    </div>
  );
};

export default GridProductos;
