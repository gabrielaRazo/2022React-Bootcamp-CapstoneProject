import React, { useEffect } from 'react';
import {
  Col,
  Row,
  TopSpace,
  SectionTitle,
  ContainerSpinner,
  Spinner,
} from '../styles/Home.style';
import { Img, Text } from '../styles/Grid.style';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const GridCategorias = () => {
  const dispatch = useDispatch();
  const apiRef = useSelector((state) => state.dasboardReducer.apiRef);

  useEffect(() => {
    dispatch({ type: 'GET_LIST_CATEGORIES_REQUEST', apiRef: apiRef });
  }, [apiRef]);

  const listCategories = useSelector(
    (state) => state.dasboardReducer.listCategories,
  );
  const fetchingCategories = useSelector(
    (state) => state.dasboardReducer.fetchingCategories,
  );
  const changeCategory = (category) => {
    dispatch({
      type: 'CHANGE_SELECTED_CATEGORY',
      selectedCategory: [category],
    });
  };

  return (
    <div>
      <TopSpace />
      <TopSpace />
      <TopSpace />

      <SectionTitle>Categories</SectionTitle>
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
          <TopSpace />
        </Spinner>
        {listCategories.results && (
          <Row centered>
            {listCategories.results.map(
              ({ data: { main_image, url, name }, slugs }) => (
                <Col lg="2" md="3" sm="4" xs="11" spaced>
                  <Link
                    onClick={() => changeCategory(slugs[0].toLowerCase())}
                    to={{
                      pathname: '/products/',
                      search: `?category=${slugs[0].toLowerCase()}`,
                    }}
                    style={{ textDecoration: 'none' }}
                  >
                    <Img src={main_image.url} alt={url} />
                    <Text>{name}</Text>
                  </Link>
                </Col>
              ),
            )}
          </Row>
        )}
      </ContainerSpinner>
    </div>
  );
};

GridCategorias.propTypes = {
  listCategories: PropTypes.object,
  fetchingCategories: PropTypes.bool,
  apiRef: PropTypes.string,
};

export default GridCategorias;
