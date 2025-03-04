import React from "react";
import EmployeeList from "./EmployeeList";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Alert,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const SignIn: React.FC = () => {
  const {
    isLoggedIn,
    username,
    password,
    error,
    setUsername,
    setPassword,
    handleLogin,
  } = useAuth();

  return (
    <Container>
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
        </div>
      )}
    </Container>
  );
};

export default SignIn;
