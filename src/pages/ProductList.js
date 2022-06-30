import React from 'react';
import Sidebar from '../components/SideBar';
import { Col, Row } from '../styles/Home.style';
import useFeaturedBanners from '../utils/hooks/useFeaturedBanners';
import ProductsFilter from './ProductsFilter';

const ProductList = () => {
  useFeaturedBanners();
  return (
    <div>
      <Row>
        <Col lg="3" md="3" sm="6" xs="7">
          <Sidebar />
        </Col>
        <Col lg="9" md="9" sm="6" xs="5">
          <ProductsFilter />
        </Col>
      </Row>
    </div>
  );
};

export default ProductList;
