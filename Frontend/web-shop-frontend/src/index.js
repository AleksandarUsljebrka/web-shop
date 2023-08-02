import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContext, { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { OrderContextProvider } from "./context/OrderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <OrderContextProvider>
        <App />
      </OrderContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
