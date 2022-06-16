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
  const changeCategory = (name) => {
    dispatch({ type: 'CHANGE_SELECTED_CATEGORY', selectedCategory: name });
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
              ({ data: { main_image, url, name } }) => (
                <Col lg="2" md="3" sm="4" xs="11" spaced>
                  <Link to="/products" onClick={() => changeCategory(name)}>
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

export default GridCategorias;
