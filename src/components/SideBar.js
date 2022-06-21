import React, { useEffect, useState } from 'react';
import logoSideBar from '../assets/logo-responsive.png';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row } from '../styles/Home.style';
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
} from '../styles/SideBar.style';

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

  useEffect(() => {
    dispatch({
      type: 'GET_LIST_CATEGORIES_REQUEST',
      apiRef: apiRef,
      page: categoriesPage,
    });
  }, [apiRef]);

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
      <Divider />
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
      <Divider />
      <IconContainer onClick={resetSelectedCategory}>
        <img src="https://img.icons8.com/ios/50/undefined/empty-filter.png" />
        <span>Limpiar filtros</span>
      </IconContainer>
      <Divider />
      <SFooter>
        <p>Ecommerce created during Wizeline’s Academy React Bootcamp</p>
      </SFooter>
    </SSidebar>
  );
};

export default Sidebar;
