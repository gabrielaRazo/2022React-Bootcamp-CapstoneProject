import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from '../styles/Cart.style';
import { Text } from '../styles/Grid.style';
import { Col, ContainerSpinner, Img, Row, Spinner } from '../styles/Home.style';
import {
  IconsContainer,
  InputContainer,
  InputIconDown,
  InputIconUp,
  InputText,
  TextInfo,
} from '../styles/ProductDetail.style';
import { Divider } from '../styles/SideBar.style';

export const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiRef = useSelector((state) => state.dasboardReducer.apiRef);
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
  const listProducts = useSelector(
    (state) => state.dasboardReducer.listProducts,
  );

  const getDetailProduct = (id) => {
    dispatch({
      type: 'GET_PRODUCT_DETAIL_REQUEST',
      apiRef: apiRef,
      productId: id,
      shoppingCartList,
    });
    navigate(`/product/${id}`);
  };

  const editItemsCart = (type, id) => {
    let productAdded = shoppingCartList.find((producto) => producto.id === id);
    if (type === 'add') {
      if (productAdded.quantity < productAdded.data.stock) {
        dispatch({
          type: 'EDIT_SHOPPING_CART_REQUEST',
          idArticle: id,
          actionToEdit: 'add',
          shoppingCartList,
          cartTotal,
          totalProductsCart,
        });
      }
    } else if (type === 'sub') {
      dispatch({
        type: 'EDIT_SHOPPING_CART_REQUEST',
        idArticle: id,
        actionToEdit: 'sub',
        listProducts,
        shoppingCartList,
        cartTotal,
        totalProductsCart,
      });
    }
  };

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
                  <Divider noSpace />
                  <Row centered>
                    <Col lg={7} md={6}>
                      <CartTextTable>Product</CartTextTable>
                    </Col>
                    <Col lg={2} md={2}>
                      <CartTextTable>Price</CartTextTable>
                    </Col>
                    <Col lg={1} md={2}>
                      <CartTextTable>Quantity</CartTextTable>
                    </Col>
                    <Col lg={2} md={2}>
                      <CartTextTable>Subtotal</CartTextTable>
                    </Col>
                  </Row>

                  <Row centered>
                    {shoppingCartList.map(
                      ({
                        data: { mainimage, url, price, name, stock },
                        id,
                        quantity,
                      }) => (
                        <Row centered>
                          <Divider noSpace />
                          <Col lg={4} md={3}>
                            <Row>
                              <Col lg={4} md={4}>
                                <ContainerIcon>
                                  <IconDeleteCart
                                    onClick={() =>
                                      dispatch({
                                        type: 'REMOVE_PRODUCT_CART_REQUEST',
                                        idArticle: id,
                                        shoppingCartList,
                                        cartTotal,
                                        totalProductsCart,
                                      })
                                    }
                                    src={
                                      deleteIconUrl +
                                      'external-delete-interface-dreamstale-lineal-dreamstale.png'
                                    }
                                  />
                                </ContainerIcon>
                              </Col>
                              <Col lg={8} md={8}>
                                <Img
                                  clickable
                                  onClick={() => getDetailProduct(id)}
                                  src={mainimage.url}
                                  alt={url}
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col lg={3} md={3}>
                            <Text
                              clickable
                              onClick={() => getDetailProduct(id)}
                            >
                              {name}
                            </Text>
                          </Col>
                          <Col lg={2} md={2}>
                            <Text>${price}</Text>
                          </Col>
                          <Col lg={1} md={2}>
                            <InputContainer>
                              <Row>
                                <Col lg={11} md={11}>
                                  <InputText>{quantity}</InputText>
                                </Col>
                                <Col lg={1} md={1}>
                                  <IconsContainer>
                                    <InputIconUp
                                      onClick={() => editItemsCart('add', id)}
                                    >
                                      <img
                                        src={`${iconsURL}/50/undefined/collapse-arrow.png`}
                                      />
                                    </InputIconUp>
                                    <InputIconDown
                                      onClick={() => editItemsCart('sub', id)}
                                    >
                                      <img
                                        src={`${iconsURL}/50/undefined/expand-arrow--v1.png`}
                                      />
                                    </InputIconDown>
                                  </IconsContainer>
                                </Col>

                                {quantity === stock && (
                                  <TextInfo>No more stock available</TextInfo>
                                )}
                              </Row>
                            </InputContainer>
                          </Col>
                          <Col lg={2} md={2}>
                            <Text>${quantity * price}</Text>
                          </Col>
                        </Row>
                      ),
                    )}
                    <Divider />
                  </Row>
                </Col>
                <Col lg={3} collapse="md">
                  <CartSpaceTable />
                  <ContainerFloatRight>
                    <Divider noSpace />
                    <CartTextTableLeft>Shopping Cart Total</CartTextTableLeft>
                    <Divider noSpace />
                    <Row>
                      <Col lg={10} md={10}>
                        <br />
                        <CartTextLeft>Total:</CartTextLeft>
                      </Col>
                      <Col lg={2} md={2}>
                        <br />
                        <CartTextRight>${cartTotal}</CartTextRight>
                      </Col>
                    </Row>
                    <Divider noSpace />
                    <Row>
                      <CartButton space>Checkout</CartButton>
                    </Row>
                  </ContainerFloatRight>
                </Col>
                <Col md={12} collapse="lg">
                  <CartSpaceTable />
                  <Divider noSpace />
                  <CartTextTableLeft>Shopping Cart Total</CartTextTableLeft>
                  <Divider noSpace />
                  <Row>
                    <Col md={10}>
                      <br />
                      <CartTextLeft>Total:</CartTextLeft>
                    </Col>
                    <Col md={2}>
                      <br />
                      <CartTextRight>${cartTotal}</CartTextRight>
                    </Col>
                  </Row>
                  <Divider noSpace />
                  <Row centered>
                    <Col md={6}>
                      <CartButton space>Checkout</CartButton>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row centered>
                <Col lg={6} md={6}>
                  <CartIcon src="https://img.icons8.com/ios/100/000000/shopping-cart.png" />
                  <CartTextCenter>Your cart is currently empty</CartTextCenter>
                </Col>
              </Row>
              <Row centered>
                <Col lg={3} md={5}>
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

export default CartPage;
