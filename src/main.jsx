import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import './index.css'
import ErrorPage from "./errorPage";
import Home from './routes/home';
import Menu, {loader as menuLoader} from './routes/menu.jsx'
import Category, {loader as categoryLoader} from './routes/category.jsx';
import Signup from './routes/signup';
import Login from './routes/login';
import Cart from './routes/cart.jsx';
import store from './app/store'
import { Provider } from 'react-redux'
import  Success  from './routes/success.jsx';
import Cancel from './routes/cancel.jsx';
import Aboutus from './routes/aboutus.jsx';
import Terms from './routes/terms.jsx';
import PrivacyPolicy from './routes/privacyPolicy.jsx';
import Orders from './routes/ordersPage.jsx';
import Profile from './routes/profile.jsx';


const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    
    children:[
    {
      path:"/",
      element:<Home/>,
      
    },

    {
      path:"/signup",
      element:<Signup/>
    },

    {
      path:"/login",
      element:<Login/>
    },

    {
      path: "/restaurant/:id", 
      element: <Menu />,
      loader:menuLoader
    },

    {
      path: "/category/:category",
      element: <Category />,
      loader: categoryLoader,
  },

  {
    path:"/cart",
    element:<Cart/>
  },

  {
    path:"/payment/success",
    element:<Success/>
  },

  {
    path:"/payment/cancel",
    element:<Cancel/>
  },

  {
    path:"/aboutus",
    element:<Aboutus/>
  },

  {
    path:"/terms",
    element:<Terms/>
  },

  {
    path:"/privacyPolicy",
    element:<PrivacyPolicy/>
  },

  {
    path:"/ordersPage",
    element:<Orders/>
  },

  {
    path:"/profile",
    element:<Profile/>
  }

  ]
},

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);