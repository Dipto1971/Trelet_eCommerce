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
import './index.css';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App /> }>
     <Route index={true} path = "/" element={<HomeScreen />} />
      <Route path = "/product/:id" element={<ProductScreen />} />
      <Route path = "/cart" element={<CartScreen />} />
    </Route>
  )
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

