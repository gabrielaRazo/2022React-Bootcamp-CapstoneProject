import React, { useEffect } from 'react';
import logoSideBar from '../assets/logo-responsive.png';
import { Link, useNavigate } from 'react-router-dom';
import { Col, ContainerSpinner, Row, Spinner } from '../styles/Home.style';
import { useDispatch, useSelector } from 'react-redux';
import {
  SSidebar,
  LogoSBar,
  Divider,
  SLinkContainer,
  SLink,
  SLinkIcon,
  SLinkLabel,
  SSearchIcon,
  SSearch,
  SFooter,
  IconContainer,
  IconContainerCart,
  IconCartSB,
  TextSBIcon,
  IconSBQuantity,
  IconSBSubQuantity,
} from '../styles/SideBar.style';
import PropTypes from 'prop-types';
import { IconCart, IconSubQuantity } from '../styles/Navbar.style';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlPath = window.location.href.split('=')[1];
  const apiRef = useSelector((state) => state.dasboardReducer.apiRef);
  const selectedCategory = useSelector(
    (state) => state.dasboardReducer.selectedCategory,
  );
  const categoriesPage = useSelector(
    (state) => state.dasboardReducer.categoriesPage,
  );
  const searchText = useSelector((state) => state.dasboardReducer.searchText);
  const shoppingCartList = useSelector(
    (state) => state.dasboardReducer.shoppingCartList,
  );

  useEffect(() => {
    dispatch({
      type: 'GET_LIST_CATEGORIES_REQUEST',
      apiRef: apiRef,
      page: categoriesPage,
    });
    dispatch({
      type: 'GET_SHOPPING_CART_REQUEST',
      shoppingCartList: shoppingCartList,
    });
  }, [apiRef, shoppingCartList]);

  const searchClickHandler = (element) => {
    if (element.target.value) {
      dispatch({
        type: 'CHANGE_SEARCH_VALUE',
        searchText: element.target.value,
      });
    } else {
      dispatch({
        type: 'CHANGE_SEARCH_VALUE',
        searchText: '',
      });
    }
  };

  const selectCategories = (category) => {
    let listURL = selectedCategory.slice(0);
    let categories = selectedCategory.slice(0);
    categories.push(category);
    listURL.push(category);

    dispatch({
      type: 'CHANGE_SELECTED_CATEGORY',
      selectedCategory: categories,
    });

    for (let i = 0; i < selectedCategory.length; i++) {
      if (category === selectedCategory[i]) {
        const deleted = selectedCategory.filter((item) => item !== category);
        dispatch({
          type: 'CHANGE_SELECTED_CATEGORY',
          selectedCategory: deleted,
        });
        listURL = deleted;
      }
    }

    navigate(`/products/?category=${listURL}?page=${categoriesPage}`);
  };

  const listCategories = useSelector(
    (state) => state.dasboardReducer.listCategories,
  );
  const fetchingCategories = useSelector(
    (state) => state.dasboardReducer.fetchingCategories,
  );
  const totalProductsCart = useSelector(
    (state) => state.dasboardReducer.totalProductsCart,
  );

  console.log('totalProductsCart', totalProductsCart);

  const searchInput = () => {
    if (searchText) {
      dispatch({
        type: 'GET_PRODUCT_SEARCH_REQUEST',
        apiRef: apiRef,
        searchText: searchText,
      });
      dispatch({
        type: 'CHANGE_SELECTED_CATEGORY',
        selectedCategory: [],
      });
      navigate(`/products/${searchText}`);
    }
  };

  const onSubmitEnter = (event) => {
    if (event.key === 'Enter') {
      dispatch({
        type: 'GET_PRODUCT_SEARCH_REQUEST',
        apiRef: apiRef,
        searchText: searchText,
      });
      dispatch({
        type: 'CHANGE_SELECTED_CATEGORY',
        selectedCategory: [],
      });
      navigate(`/products/${searchText}`);
    }
  };

  const resetSelectedCategory = () => {
    dispatch({
      type: 'CHANGE_SELECTED_CATEGORY',
      selectedCategory: [],
    });
    dispatch({ type: 'GET_PRODUCT_SEARCH_FAILURE' });
    dispatch({ type: 'CHANGE_CATEGORIES_PAGE', categoriesPage: 1 });
    dispatch({
      type: 'GET_LIST_PRODUCTS_REQUEST',
      apiRef: apiRef,
      selectedCategory: [],
      page: 1,
    });
    dispatch({
      type: 'CHANGE_SEARCH_VALUE',
      searchText: '',
    });

    navigate('/products');
  };

  return (
    <SSidebar isOpen={true}>
      <Row centered>
        <LogoSBar>
          <Link to="/">
            <img src={logoSideBar} alt="logo" onClick={resetSelectedCategory} />
          </Link>
        </LogoSBar>
      </Row>
      <SSearch>
        <SSearchIcon type="submit" value="Submit" onClick={searchInput}>
          <img src="https://img.icons8.com/ios-glyphs/30/undefined/search--v1.png" />
          <input
            onChange={(e) => searchClickHandler(e)}
            placeholder="Search"
            onKeyDown={onSubmitEnter}
            value={searchText}
          />
        </SSearchIcon>
      </SSearch>
      <br />
      <br />
      <Row>
        <Col lg={10} md={10} sm={9} xs={9}>
          <Row>
            <Col lg={3} md={5} sm={6} xs={6}>
              <IconContainerCart onClick={() => navigate(`/cart`)}>
                <IconCartSB />
                {totalProductsCart > 0 && (
                  <IconSBSubQuantity>
                    <span>{''}</span>
                  </IconSBSubQuantity>
                )}
              </IconContainerCart>
            </Col>
            <Col lg={9} md={7} sm={6} xs={6}>
              <TextSBIcon>Cart</TextSBIcon>
            </Col>
          </Row>
        </Col>
        <Col lg={2} md={2} sm={3} xs={3}>
          {totalProductsCart > 0 && (
            <IconSBQuantity onClick={() => navigate(`/cart`)}>
              X{totalProductsCart}
            </IconSBQuantity>
          )}
        </Col>
      </Row>
      <Divider />
      <ContainerSpinner active={fetchingCategories}>
        <Spinner active={fetchingCategories} viewBox="0 0 50 50">
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
        {listCategories.results && (
          <>
            {listCategories.results.map(
              ({ data: { main_image, name }, slugs }) => (
                <SLinkContainer
                  style={{
                    backgroundColor: urlPath
                      ? urlPath
                          .split('?')[0]
                          .split(',')
                          .includes(slugs[0].toLowerCase())
                        ? '#e6e6e6'
                        : 'white'
                      : selectedCategory.includes(slugs[0].toLowerCase())
                      ? '#e6e6e6'
                      : 'white',
                  }}
                  onClick={() => selectCategories(slugs[0].toLowerCase())}
                >
                  <SLink>
                    <SLinkIcon>
                      {main_image.alt === 'Bath' && (
                        <img
                          src={
                            'https://img.icons8.com/dotty/80/undefined/shower-and-tub.png'
                          }
                        />
                      )}
                      {main_image.alt === 'Lighting' && (
                        <img
                          src={
                            'https://img.icons8.com/dotty/80/undefined/light.png'
                          }
                        />
                      )}
                      {main_image.alt === 'Kitchen' && (
                        <img
                          src={
                            'https://img.icons8.com/ios/50/undefined/kitchenwares.png'
                          }
                        />
                      )}
                      {main_image.alt === 'Furniture' && (
                        <img
                          src={
                            'https://img.icons8.com/cotton/64/undefined/bath--v2.png'
                          }
                        />
                      )}
                      {main_image.alt === 'Decorate' && (
                        <img
                          src={
                            'https://img.icons8.com/ios/50/undefined/home-decorations.png'
                          }
                        />
                      )}

                      <SLinkLabel>{name}</SLinkLabel>
                    </SLinkIcon>
                  </SLink>
                </SLinkContainer>
              ),
            )}
          </>
        )}
      </ContainerSpinner>
      <Divider />
      <IconContainer onClick={resetSelectedCategory}>
        <img src="https://img.icons8.com/ios/50/undefined/empty-filter.png" />
        <span>No Filters</span>
      </IconContainer>
      <Divider />
      <SFooter>
        <p>Ecommerce created during Wizeline’s Academy React Bootcamp</p>
      </SFooter>
    </SSidebar>
  );
};

Sidebar.propTypes = {
  searchText: PropTypes.string,
  listCategories: PropTypes.object,
  fetchingCategories: PropTypes.bool,
  urlPath: PropTypes.string,
  selectedCategory: PropTypes.string,
  categoriesPage: PropTypes.number,
  apiRef: PropTypes.string,
};

export default Sidebar;
