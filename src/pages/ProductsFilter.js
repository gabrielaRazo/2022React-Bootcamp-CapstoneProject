import React from 'react';
import { useSelector } from 'react-redux';
import AllProducts from '../components/Products/AllProducts';
import ProductSBSearch from '../components/Products/ProductSBSearch';
import ProductsCategory from '../components/Products/ProductsCategory';
import PropTypes from 'prop-types';

export const ProductsFilter = () => {
  const selectedCategory = useSelector(
    (state) => state.dasboardReducer.selectedCategory,
  );
  const searchText = useSelector((state) => state.dasboardReducer.searchText);
  const searchDone = useSelector((state) => state.dasboardReducer.searchDone);

  return (
    <div>
      {selectedCategory[0] && <ProductsCategory />}
      {searchText !== '' && searchDone === true && <ProductSBSearch />}
      {!selectedCategory[0] && searchDone === false && <AllProducts />}
    </div>
  );
};

ProductsFilter.propTypes = {
  searchText: PropTypes.string,
  selectedCategory: PropTypes.string,
  searchText: PropTypes.bool,
};

export default ProductsFilter;
