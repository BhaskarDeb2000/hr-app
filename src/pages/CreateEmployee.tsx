import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEmployeeContext } from "../contexts/EmployeeContext";
import { Employee } from "../types/type";

const CreateEmployee: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(null));
  const { addEmployee } = useEmployeeContext();
  const today = dayjs();

  const [department, setDepartment] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const navigate = useNavigate();

  const handleCreateEmployee = () => {
    const newEmployee: Employee = {
      id: Date.now(), // Using current timestamp as unique ID
      name,
      role,
      startDate: startDate
        ? startDate.format("YYYY-MM-DD")
        : today.format("YYYY-MM-DD"),
      department,
      city,
      workHistory: [
        {
          jobTitle: "Intern Developer",
          company: "TechCorp",
          startDate: "2021-06-01",
          endDate: "2022-01-15",
        },
        {
          jobTitle: "Junior Developer",
          company: "InnovateX",
          startDate: "2022-02-01",
          endDate: "2023-01-14",
        },
      ],
    };

    // Add employee to context
    addEmployee(newEmployee);
    navigate("/home");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <Card sx={{ width: 400, padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", marginBottom: 3 }}
          >
            Create Employee
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Role"
                variant="outlined"
                select
                fullWidth
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <MenuItem value="Intern">Intern</MenuItem>
                <MenuItem value="Junior Developer">Junior Developer</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Senior Developer">Senior Developer</MenuItem>
                <MenuItem value="Lead Developer">Lead Developer</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
                  disableFuture={true}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Department"
                variant="outlined"
                fullWidth
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCreateEmployee}
                sx={{
                  marginTop: 2,
                  padding: "10px",
                  fontWeight: "bold",
                }}
              >
                Create Employee
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateEmployee;
