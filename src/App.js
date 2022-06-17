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
import { useDispatch, useSelector } from 'react-redux';

function App() {
  // /products?category={categorySlug}
  // /product/{productId}
  // { path: '*', element: <Navigate replace to="/" /> },

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:selectedCategory" element={<ProductList />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
