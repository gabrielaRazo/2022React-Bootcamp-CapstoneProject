import React from 'react';
import Checkout from '../components/Checkout';
import Footer from '../components/Footer';
import Header from './header/Header';

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <Checkout />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
