import React from 'react';
import { Products } from '../components/Products';
import Sidebar from '../components/SideBar';
import { Col, Row } from '../styles/Home.style';

const ProductList = () => {
  return (
    <div>
      <Row>
        <Col lg="3" md="3" sm="6" xs="7">
          <Sidebar />
        </Col>
        <Col lg="9" md="9" sm="6" xs="5">
          <Products />
        </Col>
      </Row>
    </div>
  );
};

export default ProductList;
