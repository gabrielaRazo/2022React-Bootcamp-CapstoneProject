import React from 'react';
import { useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const ProductGallery = (props) => {
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

export default ProductGallery;
