import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EmployeeList from "./pages/EmployeeList";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeDetail from "./pages/EmployeeDetail";
import { EmployeeProvider } from "./contexts/EmployeeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Import useAuth
import Navbar from "./Components/NavBar";

// A wrapper component to conditionally render Navbar
const AppWithNavbar: React.FC = () => {
  const { isLoggedIn } = useAuth(); // Get the isLoggedIn state from context

  return (
    <Router>
      {/* Only render Navbar if the user is logged in */}
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<EmployeeList />} />
        <Route path="/createEmployee" element={<CreateEmployee />} />
        <Route path="/employee/:id" element={<EmployeeDetail />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <AppWithNavbar /> {/* Wrap everything inside AppWithNavbar */}
      </EmployeeProvider>
    </AuthProvider>
  );
};

export default App;
