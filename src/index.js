import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from "./utils/store";
import Browse from "./components/Browse";
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },

  {
    path:"/browse",
    element:<Browse/>
  }

])


root.render(
    <Provider store={store}>
       <RouterProvider router={appRouter}/>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
