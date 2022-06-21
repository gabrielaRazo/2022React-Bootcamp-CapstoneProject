import React from 'react';
import { useSelector } from 'react-redux';
import AllProducts from '../components/Products/AllProducts';
import ProductSBSearch from '../components/Products/ProductSBSearch';
import ProductsCategory from '../components/Products/ProductsCategory';

export const ProductsFilter = () => {
  const selectedCategory = useSelector(
    (state) => state.dasboardReducer.selectedCategory,
  );
  const searchText = useSelector((state) => state.dasboardReducer.searchText);
  const listProductSearch = useSelector(
    (state) => state.dasboardReducer.listProductSearch,
  );

  return (
    <div>
      {selectedCategory[0] && <ProductsCategory />}
      {searchText !== '' && listProductSearch[0] && <ProductSBSearch />}
      {!selectedCategory[0] && !listProductSearch[0] && <AllProducts />}
    </div>
  );
};

export default ProductsFilter;
