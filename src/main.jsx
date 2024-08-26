import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import './index.css'
import ErrorPage from "./errorPage";
import Home, {loader as homeLoader} from './routes/home';
import Menu, {loader as menuLoader} from './routes/menu.jsx'
import Signup from './routes/signup';
import Login from './routes/login';
import store from './app/store'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    
    children:[
    {
      path:"/",
      element:<Home/>,
      loader:homeLoader
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