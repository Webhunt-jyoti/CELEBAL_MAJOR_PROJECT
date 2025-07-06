
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { CartProvider } from "./context/CartContext";





ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* <BrowserRouter> */}
            <App />
          {/* </BrowserRouter> */}
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);