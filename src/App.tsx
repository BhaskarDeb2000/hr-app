import React, { useState } from "react";
import EmployeeList from "./Components/EmployeeList";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Alert,
} from "@mui/material";

const App: React.FC = () => {
  // State variables for user authentication and error handling
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Logs the user in if the username and password are correct
  const handleLogin = (): void => {
    if (username === "test" && password === "test1") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password.");
    }
  };

  // Logs the user out and clears the username and password fields
  const handleLogout = (): void => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  return (
    <Container>
      <Typography
        variant="h3"
        align="center"
        color="white"
        sx={{ my: "3vh", fontWeight: "bold" }}
      >
        Employee Management
      </Typography>

      {!isLoggedIn ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Paper
            elevation={8}
            sx={{
              padding: 6,
              borderRadius: 4,
              background: "#ffffffd9",
              marginTop: "15vh",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              sx={{ marginBottom: 4, color: "#333", fontWeight: "600" }}
            >
              Log In
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              placeholder="test"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              placeholder="test1"
              variant="outlined"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            {error && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              variant="contained"
              onClick={handleLogin}
              fullWidth
              sx={{
                backgroundColor: "#FF5E57",
                "&:hover": { backgroundColor: "#FF3D39" },
              }}
            >
              Log In
            </Button>
          </Paper>
        </Box>
      ) : (
        <div>
          <React.Suspense fallback={<div>Loading...</div>}>
            <EmployeeList />
          </React.Suspense>
          <Box sx={{ position: "absolute", top: 16, right: 16 }}>
            <Button
              variant="contained"
              onClick={handleLogout}
              color="error"
              sx={{
                borderColor: "black",
                "&:hover": {
                  borderColor: "white",
                  color: "white",
                },
              }}
            >
              Log Out
            </Button>
          </Box>
        </div>
      )}
    </Container>
  );
};

export default App;
