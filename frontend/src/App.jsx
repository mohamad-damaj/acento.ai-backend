import { useState } from "react";
import "./App.css";
import { useAuth } from "./services/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import HomePage from "./Home/Home";

function App() {
  const [count, setCount] = useState(0);
  const { currentUser, loading } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth"
          element={
            currentUser ? <Navigate to="/dashboard" /> : <div>hello</div>
          }
        />
        <Route
          path="/dashboard"
          element={currentUser ? <Dashboard /> : <Navigate to="/auth" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
