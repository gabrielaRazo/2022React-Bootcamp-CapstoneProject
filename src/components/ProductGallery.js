import React from 'react';
import { useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';

const ProductGallery = () => {
  const productDetail = useSelector(
    (state) => state.dasboardReducer.productDetail,
  );

  return (
    <div>
      <Carousel>
        {productDetail[0].data.images.map(({ image: { url } }) => (
          <img style={{ width: '100%' }} src={url} />
        ))}
      </Carousel>
    </div>
  );
};

ProductGallery.propTypes = {
  productDetail: PropTypes.object,
};

export default ProductGallery;
