import "./App.css";
import { useAuth } from "./services/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import HomePage from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard";
import UserAuthenticate from "./UserAuthenticate/UserAuthenticate";
import Test from "./Test";
import LogIn from "./Login";
import SignUp from "./SignUp";

function App() {
  const { currentUser, loading } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            currentUser ? <Navigate to="/dashboard" /> : <UserAuthenticate />
          }
        />
        <Route
          path="/dashboard"
          element={currentUser ? <Dashboard /> : <Navigate to="/auth" />}
        />
        <Route path="/testing" element={<Test />} />
        {/* <Route path="/login" element={<LogIn />} /> */}
        {/* <Route path="/sign-up" element={<SignUp />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
