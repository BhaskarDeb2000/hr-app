import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth to access the context

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth(); // Access the handleLogout function from context

  // Handle Logout using context
  const handleLogoutClick = () => {
    handleLogout(); // Call the logout function from context
    navigate("/"); // Redirect to the login page (SignIn)
  };

  // Navigate to Create New Employee Page
  const handleCreateEmployee = () => {
    navigate("/createEmployee"); // Navigate to create new employee page
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
          onClick={() => navigate("/home")}
        >
          Employee Management System
        </Typography>
        <Box>
          <Button
            color="inherit"
            onClick={handleCreateEmployee}
            sx={{ marginRight: 2 }}
          >
            Create New Employee
          </Button>
          <Button color="inherit" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
