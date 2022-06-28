import React from 'react';
import CartPage from '../components/CartPage';
import CartPageResponsive from '../components/CartPageResponsive';
import Footer from '../components/Footer';
import {
  ContainerLargeScreens,
  ContainerResponsive,
} from '../styles/Cart.style';
import Header from './header/Header';

export const ShoppingCartPage = () => {
  return (
    <div>
      <Header />
      <ContainerLargeScreens>
        <CartPage />
      </ContainerLargeScreens>
      <ContainerResponsive>
        <CartPageResponsive />
      </ContainerResponsive>
      <Footer />
    </div>
  );
};

export default ShoppingCartPage;
