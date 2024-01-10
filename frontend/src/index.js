import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App /> }>
     <Route index={true} path = "/" element={<HomeScreen />} />
      <Route path = "/product/:id" element={<ProductScreen />} />
    </Route>
  )
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

