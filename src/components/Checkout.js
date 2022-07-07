import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  CheckoutContainer,
  CheckoutSpaceTop,
  ContainerTable,
  CheckoutButtonTable,
  PaymentButtonTable,
  TextSubTitleTable,
  TitleTable,
  Container,
  CheckoutInput,
  CheckoutLabel,
  CheckoutSBtn,
  CheckoutTextArea,
  ErrorTextMessage,
} from '../styles/Checkout.style';
import { Col, Row } from '../styles/Home.style';
import { Divider } from '../styles/SideBar.style';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shoppingCartList = useSelector(
    (state) => state.dasboardReducer.shoppingCartList,
  );
  const cartTotal = useSelector((state) => state.dasboardReducer.cartTotal);
  const totalProductsCart = useSelector(
    (state) => state.dasboardReducer.totalProductsCart,
  );

  useEffect(() => {
    dispatch({
      type: 'GET_SHOPPING_CART_REQUEST',
      shoppingCartList: shoppingCartList,
    });
    if (!shoppingCartList[0]) {
      navigate('/cart');
    }
  }, [shoppingCartList]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log('data', data);
  console.log('errors', errors);
  return (
    <CheckoutContainer>
      <CheckoutSpaceTop />
      <Row centered>
        <Col lg={11} md={11} sm={11} xs={11}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Row centered>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <CheckoutLabel required={true}>
                      <span>*</span>First Name
                    </CheckoutLabel>
                    <CheckoutInput
                      type="text"
                      placeholder="First Name"
                      {...register('firstName', {
                        required: 'Please fill the field!',
                      })}
                    />
                    {errors.firstName && (
                      <ErrorTextMessage>
                        {errors.firstName.message}
                      </ErrorTextMessage>
                    )}
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <CheckoutLabel required={true}>
                      <span>*</span>Email
                    </CheckoutLabel>
                    <CheckoutInput
                      type="text"
                      placeholder="Email"
                      {...register('email', {
                        required: 'Please fill the field!',
                        pattern: /^\S+@\S+$/i,
                      })}
                    />
                    {errors.firstName && (
                      <ErrorTextMessage>
                        {errors.firstName.message}
                      </ErrorTextMessage>
                    )}
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <CheckoutLabel required={true}>
                      <span>*</span>Zip Code
                    </CheckoutLabel>
                    <CheckoutInput
                      type="tel"
                      placeholder="Zip Code"
                      {...register('zipCode', {
                        required: 'Please fill the field!',
                        minLength: 5,
                        maxLength: 6,
                      })}
                    />
                    {errors.firstName && (
                      <ErrorTextMessage>
                        {errors.firstName.message}
                      </ErrorTextMessage>
                    )}
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <CheckoutLabel required={false}>
                      <span>*</span>
                      Notes
                    </CheckoutLabel>
                    <CheckoutTextArea
                      type="text"
                      placeholder="Write a comment..."
                      {...register('notes', {
                        required: false,
                        maxLength: 200,
                      })}
                      name="content"
                    />
                  </Col>
                </Row>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <ContainerTable>
                  <Row centered>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <TitleTable>
                        Order Summary
                        <span> ({totalProductsCart} Products)</span>
                      </TitleTable>
                    </Col>
                    <Col lg={9} md={9} sm={6} xs={6}>
                      <TextSubTitleTable>Product</TextSubTitleTable>
                    </Col>
                    <Col lg={3} md={3} sm={6} xs={6}>
                      <TextSubTitleTable>Subtotal</TextSubTitleTable>
                    </Col>
                    <Divider color />
                  </Row>
                  <Row centered>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <Container>
                        {shoppingCartList.map(
                          ({ data: { price, name }, quantity }) => (
                            <Row centered>
                              <Col lg={10} md={10} sm={5} xs={5}>
                                <TextSubTitleTable>
                                  {name} <strong>X{quantity}</strong>
                                </TextSubTitleTable>
                              </Col>
                              <Col lg={2} md={2} sm={7} xs={7}>
                                <TextSubTitleTable>
                                  ${price * quantity}
                                </TextSubTitleTable>
                              </Col>
                              <Divider color />
                            </Row>
                          ),
                        )}
                        <Divider color />
                        <Divider color />
                      </Container>
                    </Col>
                  </Row>
                  <Row centered>
                    <div style={{ marginTop: '3em' }} />
                    <Col lg={10} md={10} sm={5} xs={5}>
                      <TextSubTitleTable>Total</TextSubTitleTable>
                    </Col>
                    <Col lg={2} md={2} sm={7} xs={7}>
                      <TextSubTitleTable>${cartTotal}</TextSubTitleTable>
                    </Col>
                  </Row>
                  <div style={{ marginTop: '3em' }} />
                </ContainerTable>
                <Row centered>
                  <Col lg={10}>
                    <CheckoutButtonTable onClick={() => navigate('/cart')}>
                      <span>Go Back to Cart</span>
                      <img src="https://img.icons8.com/small/16/000000/right.png" />
                    </CheckoutButtonTable>
                  </Col>
                  <Col lg={10}>
                    <PaymentButtonTable centered type="submit">
                      Continue to Payment Information
                    </PaymentButtonTable>
                  </Col>
                </Row>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </CheckoutContainer>
  );
};

export default Checkout;
