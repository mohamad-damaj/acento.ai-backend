// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
// import HomePage from "./Home/Home.jsx";
// import { BrowserRouter, Routes, Route } from "react-router";
// import Test from "./Test.jsx";
// import { AuthProvider } from "./services/AuthContext.jsx";
import App from "./App.jsx";
import { AuthProvider } from "./services/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
