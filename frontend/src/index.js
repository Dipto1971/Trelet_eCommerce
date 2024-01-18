import { Provider } from 'react-redux';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AdminRoute from './Components/AdminRoute';
import PrivateRoute from './Components/PrivateRoute';
import './index.css';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';
import {HelmetProvider} from 'react-helmet-async';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App /> }>
     <Route index={true} path = "/" element={<HomeScreen />} />
     <Route path = "/search/:keyword" element={<HomeScreen />} />
     <Route path = "/page/:pageNumber" element={<HomeScreen />} />
     <Route path = "/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
      <Route path = "/product/:id" element={<ProductScreen />} />
      <Route path = "/cart" element={<CartScreen />} />
      <Route path = "/login" element={<LoginScreen />} />
      <Route path = "/register" element={<RegisterScreen />} />
      {/* Private Routes */}
      <Route path= "" element={<PrivateRoute />} >
      <Route path = "/shipping" element={<ShippingScreen />} />
      <Route path = "/payment" element={<PaymentScreen />} />
      <Route path = "/placeorder" element={<PlaceOrderScreen />} />
      <Route path = "/order/:id" element={<OrderScreen />} />
      <Route path = "/profile" element={<ProfileScreen />} />
      </ Route>
      {/* Admin Routes */}
      <Route path= "" element={<AdminRoute />} >
      <Route path = "/admin/orderlist" element={<OrderListScreen />} />
      <Route path = "/admin/productlist" element={<ProductListScreen />} />
      <Route path = "/admin/productlist/:pageNumber" element={<ProductListScreen />} />
      <Route path = "/admin/product/:id/edit" element={<ProductEditScreen />} />
      <Route path = "/admin/userlist" element={<UserListScreen />} />
      <Route path = "/admin/user/:id/edit" element={<UserEditScreen />} />
      </ Route>
    </Route>
  )
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

