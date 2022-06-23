import React, { useState } from 'react';
import {
  Col,
  Row,
  TopSpace,
  ContainerSpinner,
  Spinner,
} from '../styles/Home.style';
import {
  SlideImage,
  IconLeftArrow,
  IconRightArrow,
  CenteredTextTitle,
} from '../styles/Banner.style';
import { useSelector } from 'react-redux';
import useFeaturedBanners from '../utils/hooks/useFeaturedBanners';
import PropTypes from 'prop-types';

const Slider = () => {
  useFeaturedBanners();
  const [current, setCurrent] = useState(0);
  const length = 3;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const listBanner = useSelector((state) => state.dasboardReducer.listBanner);
  const fetchingBanner = useSelector(
    (state) => state.dasboardReducer.fetchingBanner,
  );

  return (
    <div>
      <TopSpace />
      <ContainerSpinner active={fetchingBanner}>
        <Spinner active={fetchingBanner} viewBox="0 0 50 50">
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
        {listBanner.results && (
          <Row centered>
            <IconLeftArrow onClick={prevSlide} />
            <Col lg="11" xs="9" md="11">
              {listBanner.results.map(
                ({ data: { main_image, title, id } }, index) => (
                  <div key={id}>
                    {index === current && (
                      <>
                        <SlideImage src={main_image.url} alt={main_image.alt} />
                        <CenteredTextTitle>{title}</CenteredTextTitle>
                      </>
                    )}
                  </div>
                ),
              )}
            </Col>
            <IconRightArrow onClick={nextSlide} />
          </Row>
        )}
      </ContainerSpinner>
    </div>
  );
};

Slider.propTypes = {
  current: PropTypes.number,
  listBanner: PropTypes.object,
  fetchingBanner: PropTypes.bool,
};

export default Slider;
