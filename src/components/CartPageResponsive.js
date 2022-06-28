import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  CartContainer,
  TopSpace,
  IconDeleteCart,
  ContainerIcon,
  CartTitle,
  CartTextTable,
  CartSpaceTable,
  ContainerFloatRight,
  CartTextTableLeft,
  CartTextRight,
  CartTextLeft,
  CartTextQuantity,
  CartBoldText,
  CartButton,
  CartTextCenter,
  CartIcon,
  CardContainerTable,
  CardRowTable,
  TextResponsive,
} from '../styles/Cart.style';
import { Text } from '../styles/Grid.style';
import { Col, ContainerSpinner, Img, Row, Spinner } from '../styles/Home.style';
import {
  IconsContainer,
  InputContainer,
  InputIconDown,
  InputIconUp,
  InputText,
} from '../styles/ProductDetail.style';
import { Divider } from '../styles/SideBar.style';

export const CartPageResponsive = () => {
  const navigate = useNavigate();
  const iconsURL = 'https://img.icons8.com/ios-filled';
  const deleteIconUrl =
    'https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/000000/';
  const shoppingCartList = useSelector(
    (state) => state.dasboardReducer.shoppingCartList,
  );
  const cartTotal = useSelector((state) => state.dasboardReducer.cartTotal);
  const fetchingInfoToCart = useSelector(
    (state) => state.dasboardReducer.fetchingInfoToCart,
  );
  const totalProductsCart = useSelector(
    (state) => state.dasboardReducer.totalProductsCart,
  );
  return (
    <div>
      <CartContainer>
        <TopSpace />
        <ContainerSpinner active={fetchingInfoToCart}>
          <Spinner active={fetchingInfoToCart} viewBox="0 0 50 50">
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
          <CartTitle>Shopping Cart</CartTitle>

          {shoppingCartList[0] ? (
            <>
              <CartTextQuantity>
                Your selection (
                <CartBoldText>{totalProductsCart} products</CartBoldText>)
              </CartTextQuantity>
              <Row>
                <Col lg={8} md={12}>
                  {shoppingCartList.map(
                    ({
                      data: { mainimage, url, price, name },
                      id,
                      quantity,
                    }) => (
                      <Row>
                        <CardContainerTable>
                          <Row>
                            <Col xs={11} sm={11} spaced>
                              <IconDeleteCart
                                src={
                                  deleteIconUrl +
                                  'external-delete-interface-dreamstale-lineal-dreamstale.png'
                                }
                              />
                            </Col>
                            <CardRowTable />
                            <Col xs={12} sm={12} spaced>
                              <Img src={mainimage.url} alt={url} />
                            </Col>
                            <CardRowTable />
                          </Row>
                          <Row>
                            <Col xs={4} sm={4}>
                              <TextResponsive>Product: </TextResponsive>
                            </Col>
                            <Col xs={8} sm={8}>
                              <TextResponsive>{name}</TextResponsive>
                            </Col>
                          </Row>
                          <CardRowTable />
                          <Row>
                            <Col xs={8} sm={8}>
                              <TextResponsive>Price: </TextResponsive>
                            </Col>
                            <Col xs={4} sm={4}>
                              <TextResponsive>${price}</TextResponsive>
                            </Col>
                          </Row>
                          <CardRowTable />
                          <Row>
                            <Col xs={7} sm={7}>
                              <TextResponsive>Quantity:</TextResponsive>
                            </Col>
                            <Col xs={4} sm={4} space>
                              <InputContainer>
                                <Row>
                                  <Col xs={11} sm={11}>
                                    <InputText>{quantity}</InputText>
                                  </Col>
                                  <Col xs={1} sm={1}>
                                    <IconsContainer>
                                      <InputIconUp>
                                        <img
                                          src={`${iconsURL}/50/undefined/collapse-arrow.png`}
                                        />
                                      </InputIconUp>
                                      <InputIconDown>
                                        <img
                                          src={`${iconsURL}/50/undefined/expand-arrow--v1.png`}
                                        />
                                      </InputIconDown>
                                    </IconsContainer>
                                  </Col>
                                </Row>
                              </InputContainer>
                            </Col>
                          </Row>
                          <CardRowTable />
                          <Row>
                            <Col xs={8} sm={8}>
                              <TextResponsive>Subtotal: </TextResponsive>
                            </Col>
                            <Col xs={4} sm={4}>
                              <TextResponsive>
                                ${quantity * price}
                              </TextResponsive>
                            </Col>
                          </Row>
                        </CardContainerTable>
                      </Row>
                    ),
                  )}
                </Col>
              </Row>

              <Col sm={12} xs={12}>
                <CartSpaceTable />
                <Divider noSpace />
                <CartTextTableLeft>Shopping Cart Total</CartTextTableLeft>
                <Divider noSpace />
                <Row>
                  <Col sm={10} xs={10}>
                    <br />
                    <CartTextLeft>Total:</CartTextLeft>
                  </Col>
                  <Col sm={2} xs={2}>
                    <br />
                    <CartTextRight>${cartTotal}</CartTextRight>
                  </Col>
                </Row>
                <Divider noSpace />
                <Row>
                  <CartButton space>Checkout</CartButton>
                </Row>
              </Col>
            </>
          ) : (
            <>
              <Row centered>
                <Col sm={12} xs={12}>
                  <CartIcon src="https://img.icons8.com/ios/100/000000/shopping-cart.png" />
                  <CartTextCenter>Your cart is currently empty</CartTextCenter>
                </Col>
              </Row>
              <Row centered>
                <Col sm={12} xs={12}>
                  <CartButton onClick={() => navigate(`/home`)}>
                    Continue Shopping
                  </CartButton>
                </Col>
              </Row>
            </>
          )}
        </ContainerSpinner>
      </CartContainer>
    </div>
  );
};

export default CartPageResponsive;
