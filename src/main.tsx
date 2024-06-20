import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store/store";
import { fetchCategory } from "./features/products/productSlice";
import App from "./app";
import './index.css';

store.dispatch(fetchCategory());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
