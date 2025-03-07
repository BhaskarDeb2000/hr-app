import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { Employee, WorkHistory } from "../types/type";
import { useEmployeeContext } from "../contexts/EmployeeContext";

const EmployeeDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees: contextEmployees } = useEmployeeContext(); // Use the context data

  console.log(contextEmployees);

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch employee details from API
  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      setError(null); // Reset error state on each request
      try {
        const response = await axios.get(
          `https://bch-hr-backend.vercel.app/${id}`
        );
        // Assuming the entire response is the employee object
        setEmployee(response.data);
      } catch (_) {
        setError(`No work history found of this employee.`);
        console.error("No work history found.", _);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  // If data is loading
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // If there is an error fetching the data
  if (error) {
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/")}
          sx={{ textTransform: "none", marginTop: 2 }}
        >
          Back to Employee List
        </Button>
      </Box>
    );
  }

  // If employee data is not found
  if (!employee) {
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h5" color="textSecondary">
          Employee not found.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{ textTransform: "none", marginTop: 2 }}
        >
          Back to Employee List
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      {/* Employee Details */}
      <Paper
        sx={{ padding: 3, marginBottom: 3, borderRadius: 2, boxShadow: 3 }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 1 }}>
          {employee.name}
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 1 }}>
          Role: {employee.role}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ marginBottom: 1 }}
        >
          Start Date: {employee.startDate}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ marginBottom: 1 }}
        >
          Department: {employee.department}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          City: {employee.city}
        </Typography>
      </Paper>

      {/* Work History Section */}
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", marginBottom: 2, color: "white" }}
      >
        Work History
      </Typography>

      {employee.workHistory.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No work history available.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {employee.workHistory.map((history: WorkHistory, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {history.jobTitle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Company: {history.company}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Duration: {history.startDate} - {history.endDate}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ marginTop: 3, textAlign: "center" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{ textTransform: "none" }}
        >
          Back to Employee List
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeDetail;
