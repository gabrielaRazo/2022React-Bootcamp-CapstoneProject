import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Logo,
  NavbarContainer,
  SearchInput,
  IconCart,
  LogoResp,
  StyledInput,
  SearchBtn,
  IconContainer,
  IconSubQuantity,
} from '../styles/Navbar.style';

import LogoImg from '../assets/logoHorizontal.png';
import LogoResponsive from '../assets/logo-responsive.png';

import { Link, useNavigate } from 'react-router-dom';
import { Col, Row } from '../styles/Home.style';
import PropTypes from 'prop-types';

const Navbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchText = useSelector((state) => state.dasboardReducer.searchText);
  const apiRef = useSelector((state) => state.dasboardReducer.apiRef);
  const totalProductsCart = useSelector(
    (state) => state.dasboardReducer.totalProductsCart,
  );
  const shoppingCartList = useSelector(
    (state) => state.dasboardReducer.shoppingCartList,
  );

  const searchInput = () => {
    dispatch({
      type: 'GET_PRODUCT_SEARCH_REQUEST',
      apiRef: apiRef,
      searchText: searchText,
    });
    if (searchText) {
      navigate(`/search/${searchText}`);
    }
  };

  useEffect(() => {
    if (searchText) {
      dispatch({
        type: 'GET_PRODUCT_SEARCH_REQUEST',
        apiRef: apiRef,
        searchText: searchText,
      });
    } else if (window.location.pathname.split('/')[2]) {
      dispatch({
        type: 'GET_PRODUCT_SEARCH_REQUEST',
        apiRef: apiRef,
        searchText: window.location.pathname.split('/')[2],
      });
    }
    dispatch({
      type: 'GET_SHOPPING_CART_REQUEST',
      shoppingCartList: shoppingCartList,
    });
  }, [apiRef, shoppingCartList]);

  const handleChange = (event) => {
    dispatch({
      type: 'CHANGE_SEARCH_VALUE',
      searchText: event.target.value,
    });
  };

  const clearInput = () => {
    dispatch({
      type: 'CHANGE_SEARCH_VALUE',
      searchText: '',
    });
    dispatch({
      type: 'GET_PRODUCT_SEARCH_REQUEST',
      apiRef: apiRef,
      searchText: '',
    });
    navigate(`/search`);
  };

  return (
    <div>
      <NavbarContainer>
        <Row centered>
          <Col lg="2" md="2" sm="2" collapse="xs">
            <Link to="/">
              <Logo onClick={clearInput} src={LogoImg} alt="logoEccomerce" />
            </Link>
          </Col>
          <Col xs="2" collapse="lg" spaced>
            <Link to="/">
              <LogoResp
                onClick={clearInput}
                src={LogoResponsive}
                alt="logoResponsive"
              />
            </Link>
          </Col>
          <Col lg="8" md="7" sm="5" xs="5">
            <StyledInput>
              <form onSubmit={searchInput}>
                <SearchInput
                  value={searchText}
                  onChange={handleChange}
                  placeholder="What are you looking for?"
                />
                {searchText !== '' && (
                  <SearchBtn type="submit" value="Submit">
                    <img
                      onClick={clearInput}
                      src="https://img.icons8.com/ios-glyphs/30/undefined/macos-close.png"
                    />
                  </SearchBtn>
                )}
              </form>
            </StyledInput>
          </Col>
          <Col lg="1" md="2" sm="3" xs="4">
            <IconContainer onClick={() => navigate(`/cart`)}>
              <IconCart />
              {totalProductsCart > 0 && (
                <IconSubQuantity>{totalProductsCart}</IconSubQuantity>
              )}
            </IconContainer>
          </Col>
        </Row>
      </NavbarContainer>
    </div>
  );
};

Navbar.propTypes = {
  searchText: PropTypes.string,
  apiRef: PropTypes.string,
};

export default Navbar;
