import './App.css';
import {
  BrowserRouter,
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import ProductList from './pages/ProductList';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import ProductSearch from './pages/ProductSearch';
import ShoppingCartPage from './pages/ShoppingCartPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/products/:selectedCategory" element={<ProductList />} />
          <Route path="/products/:searchTerm" element={<ProductList />} />
          <Route path="/products/:page" element={<ProductList />} />
          <Route path="/search/:searchTerm" element={<ProductSearch />} />
          <Route path="/search" element={<ProductSearch />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
