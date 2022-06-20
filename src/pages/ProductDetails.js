import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import { Col, Row } from '../styles/Home.style';
import {
  Title,
  ProductContainer,
  SpaceTop,
  ProductText,
  ProductTags,
  CartContainer,
  Button,
  InputContainer,
  InputText,
  InputIconUp,
  InputIconDown,
  IconsContainer,
} from '../styles/ProductDetail.style';
import { Divider } from '../styles/SideBar.style';
import Header from './header/Header';
import ProductGallery from '../components/ProductGallery';

const ProductDetails = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const apiRef = useSelector((state) => state.dasboardReducer.apiRef);
  const productDetail = useSelector(
    (state) => state.dasboardReducer.productDetail,
  );
  console.log('productDetail', productDetail);

  const productId = useSelector((state) => state.dasboardReducer.productId);

  useEffect(() => {
    if (window.location.href.split('/')[4]) {
      dispatch({
        type: 'GET_PRODUCT_DETAIL_REQUEST',
        apiRef: apiRef,
        productId: window.location.href.split('/')[4],
      });
    } else {
      dispatch({
        type: 'GET_PRODUCT_DETAIL_REQUEST',
        apiRef: apiRef,
        productId: productId,
      });
    }
  }, [productId]);

  const handleChange = (e) => {
    console.log('e.target.value', e.target.value);
    //setValue(event.target.value);
  };

  const iconsURL = 'https://img.icons8.com/';

  console.log('value', value);

  return (
    <div>
      <Header />
      <SpaceTop />
      {productDetail[0] && (
        <ProductContainer>
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
              <ProductGallery />
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Row centered>
                <Col lg={10} md={10} sm={12} xs={12}>
                  <Title>{productDetail[0].data.name}</Title>
                  <ProductText price>
                    ${productDetail[0].data.price}
                    <span category>{productDetail[0].data.category.slug}</span>
                  </ProductText>
                  <ProductText description>
                    {productDetail[0].data.description[0].text}
                  </ProductText>
                  <ProductText specs>
                    SKU: {productDetail[0].data.sku}
                  </ProductText>

                  {productDetail[0].tags && (
                    <ProductTags>
                      Tags:
                      {productDetail[0].tags.map((item) => (
                        <span> {item}</span>
                      ))}
                    </ProductTags>
                  )}
                  <Divider />
                  {productDetail[0].data.specs.map((item) => (
                    <ProductText specs>
                      {item.spec_name}: {item.spec_value}
                    </ProductText>
                  ))}
                  <Divider />
                  <CartContainer>
                    <Row>
                      <Col lg={2} md={4} sm={4} xs={4}>
                        <InputContainer>
                          <Row>
                            <Col lg={11} md={11} sm={11} xs={11}>
                              <InputText>{value}</InputText>
                            </Col>
                            <Col lg={1} md={1} sm={1} xs={1}>
                              <IconsContainer>
                                <InputIconUp>
                                  <img
                                    src={`${iconsURL}ios-filled/50/undefined/collapse-arrow.png`}
                                    onClick={() =>
                                      value !== productDetail[0].data.stock &&
                                      setValue(value + 1)
                                    }
                                  />
                                </InputIconUp>
                                <InputIconDown>
                                  <img
                                    src={`${iconsURL}ios/50/undefined/expand-arrow--v1.png`}
                                    onClick={() =>
                                      value > 1 && setValue(value - 1)
                                    }
                                  />
                                </InputIconDown>
                              </IconsContainer>
                            </Col>
                          </Row>
                        </InputContainer>
                      </Col>
                      <Col lg={8} md={7} sm={7} xs={7} spaced>
                        <Button>Añadir al carrito</Button>
                      </Col>
                    </Row>
                  </CartContainer>
                  <ProductText specs>
                    Stock: {productDetail[0].data.stock}
                  </ProductText>
                </Col>
              </Row>
            </Col>
          </Row>
        </ProductContainer>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetails;
