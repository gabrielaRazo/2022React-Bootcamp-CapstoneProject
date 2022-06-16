import './App.css';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Home from './pages/Home';

function App() {
  const AppRoutes = () =>
    useRoutes([
      { path: '/home', element: <Home /> },
      { path: '/', element: <Home /> },
      { path: '/products', element: <ProductList /> },
    ]);
  return (
    <div>
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
