import React from 'react';
import { createHashRouter, Outlet } from 'react-router-dom';

import NavBar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import ErrorPage from './components/ErrorPage';
const Layout = () => (
  <div>
    <NavBar />
    <main>      <Outlet />
    </main>
  </div>
)


export const router = createHashRouter([
  {
    path: `/`,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: `/`,
        element: <ProductList />,
      },
      {
        path: `product/:title`,
        element: <ProductDetail />
      },
      {
        path: `cart`,
        element: <Cart />
      },
      {
        path: `profile`,
        element: <Profile />
      },
      {
        path: `login`,
        element: <Login />
      },
      {
        path: `register`,
        element: <Register />
      }
    ]
  }]);