import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./Home/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Test from "./Test.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/testing" element={<Test></Test>} />
    </Routes>
  </BrowserRouter>
);
