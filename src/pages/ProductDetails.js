import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from './header/Header';

const ProductDetails = (props) => {
  const dispatch = useDispatch();
  const apiRef = useSelector((state) => state.dasboardReducer.apiRef);
  //const productId = useSelector((state) => state.dasboardReducer.productId);
  const productId = 'YZZ_XhIAAC0AvmiA';
  useEffect(() => {
    dispatch({
      type: 'GET_PRODUCT_DETAIL_REQUEST',
      apiRef: apiRef,
      productId: productId,
    });
  }, [productId]);
  return (
    <div>
      <Header />
      <div style={{ marginTop: '2em' }} />
      <h1>Hola</h1>
      <Footer />
    </div>
  );
};

export default ProductDetails;
