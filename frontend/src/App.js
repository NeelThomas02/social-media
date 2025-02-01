import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import Navbar from "./components/Navbar"; // Import Navbar component
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const user = useSelector((state) => state.auth.user); // Get user from Redux

  return (
    <Router>
      {/* {user && <Navbar />} Navbar only shown when 'user' exists */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
