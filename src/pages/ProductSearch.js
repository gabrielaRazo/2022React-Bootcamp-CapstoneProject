import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  CardDashboard,
  ContainerImage,
  TextImage,
  Text,
} from '../styles/Grid.style';
import {
  Button,
  Col,
  ContainerSpinner,
  Img,
  Row,
  Spinner,
  TopSpace,
} from '../styles/Home.style';
import {
  ImgNoFound,
  SearchContainer,
  SearchSpace,
  SearchText,
  ContainerCenter,
} from '../styles/ProductSearch.style';
import useFeaturedBanners from '../utils/hooks/useFeaturedBanners';
import Header from './header/Header';
import PropTypes from 'prop-types';

const ProductSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiRef = useSelector((state) => state.dasboardReducer.apiRef);
  useFeaturedBanners();
  const searchResult = useSelector(
    (state) => state.dasboardReducer.searchResult,
  );
  const fetchingProductSearch = useSelector(
    (state) => state.dasboardReducer.fetchingProductSearch,
  );

  const getDetailProduct = (id) => {
    dispatch({
      type: 'GET_PRODUCT_DETAIL_REQUEST',
      apiRef: apiRef,
      productId: id,
    });
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <Header />
      <ContainerSpinner active={fetchingProductSearch}>
        <Spinner active={fetchingProductSearch} viewBox="0 0 50 50">
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

        {searchResult.results && (
          <SearchContainer>
            <SearchSpace />
            {window.location.pathname.split('/')[2] ? (
              <>
                {searchResult.results[0] ? (
                  <SearchText>
                    Search Result:{' '}
                    {decodeURI(window.location.pathname.split('/')[2])}{' '}
                  </SearchText>
                ) : (
                  false
                )}
              </>
            ) : (
              <SearchText>All Products</SearchText>
            )}
            {searchResult.results[0] ? (
              <Row centered>
                {searchResult.results.map(
                  ({ data: { mainimage, url, category, name, price }, id }) => (
                    <Col lg="2" md="3" sm="4" xs="11" spaced>
                      <CardDashboard onClick={() => getDetailProduct(id)}>
                        <ContainerImage>
                          <Img src={mainimage.url} alt={url} />
                          <TextImage>{category.slug}</TextImage>
                        </ContainerImage>
                        <Text>{name}</Text>
                        <Row centered>
                          <Text top>${price}</Text>
                          <Button bottom>Add to Cart</Button>
                        </Row>
                      </CardDashboard>
                    </Col>
                  ),
                )}
              </Row>
            ) : (
              <Row centered>
                <Col lg="3" md="3" sm="12" xs="12" spaced>
                  <ContainerCenter>
                    <ImgNoFound src="https://cdn-icons-png.flaticon.com/512/6134/6134116.png" />
                  </ContainerCenter>
                </Col>
                <Col lg="12" md="12" sm="12" xs="12" spaced>
                  <SearchText>
                    There are not results for "
                    {decodeURI(window.location.pathname.split('/')[2])}"
                  </SearchText>
                </Col>
              </Row>
            )}
          </SearchContainer>
        )}
      </ContainerSpinner>
      <Footer />
    </div>
  );
};

ProductSearch.propTypes = {
  searchResult: PropTypes.string,
  fetchingProductSearch: PropTypes.bool,
  apiRef: PropTypes.string,
};

export default ProductSearch;
