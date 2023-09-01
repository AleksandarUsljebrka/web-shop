import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContext, { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { OrderContextProvider } from "./context/OrderContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <OrderContextProvider>
        <GoogleOAuthProvider clientId="40212839770-kdmco4dcg8a9i83dbmvh6iesi3m1tcie.apps.googleusercontent.com">
        <App />
        </GoogleOAuthProvider>
      </OrderContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
