import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import {
  Col,
  ContainerSpinner,
  Row,
  Spinner,
  TopSpace,
} from '../styles/Home.style';
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
import PropTypes from 'prop-types';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const iconsURL = 'https://img.icons8.com/ios-filled';
  const apiRef = useSelector((state) => state.dasboardReducer.apiRef);
  const productDetail = useSelector(
    (state) => state.dasboardReducer.productDetail,
  );
  const fetchingProductDetail = useSelector(
    (state) => state.dasboardReducer.fetchingProductDetail,
  );

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

  return (
    <div>
      <Header />
      <SpaceTop />
      <ContainerSpinner active={fetchingProductDetail}>
        <Spinner active={fetchingProductDetail} viewBox="0 0 50 50">
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
                      <span category>
                        {productDetail[0].data.category.slug}
                      </span>
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
                                <InputText>{quantity}</InputText>
                              </Col>
                              <Col lg={1} md={1} sm={1} xs={1}>
                                <IconsContainer>
                                  <InputIconUp>
                                    <img
                                      src={`${iconsURL}/50/undefined/collapse-arrow.png`}
                                      onClick={() =>
                                        quantity !==
                                          productDetail[0].data.stock &&
                                        setQuantity(quantity + 1)
                                      }
                                    />
                                  </InputIconUp>
                                  <InputIconDown>
                                    <img
                                      src={`${iconsURL}/50/undefined/expand-arrow--v1.png`}
                                      onClick={() =>
                                        quantity > 1 &&
                                        setQuantity(quantity - 1)
                                      }
                                    />
                                  </InputIconDown>
                                </IconsContainer>
                              </Col>
                            </Row>
                          </InputContainer>
                        </Col>
                        <Col lg={8} md={7} sm={7} xs={7} spaced>
                          <Button>Add to Cart</Button>
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
      </ContainerSpinner>
      <Footer />
    </div>
  );
};

ProductDetails.propTypes = {
  quantity: PropTypes.number,
  productId: PropTypes.number,
  iconsURL: PropTypes.string,
  productDetail: PropTypes.object,
  fetchingProductDetail: PropTypes.bool,
  apiRef: PropTypes.string,
};

export default ProductDetails;
