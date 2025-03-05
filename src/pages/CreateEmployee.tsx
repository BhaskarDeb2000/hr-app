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
  const today = dayjs();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [startDate, setStartDate] = useState<Dayjs | null>(today);
  const { addEmployee } = useEmployeeContext();
  const [department, setDepartment] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [errors, setErrors] = useState({
    name: "",
    role: "",
    department: "",
    city: "",
  });

  const validateForm = () => {
    const formErrors = { ...errors };
    let isValid = true;

    if (!name) {
      formErrors.name = "Name is required";
      isValid = false;
    } else {
      formErrors.name = "";
    }

    if (!role) {
      formErrors.role = "Role is required";
      isValid = false;
    } else {
      formErrors.role = "";
    }

    if (!department) {
      formErrors.department = "Department is required";
      isValid = false;
    } else {
      formErrors.department = "";
    }

    if (!city) {
      formErrors.city = "City is required";
      isValid = false;
    } else {
      formErrors.city = "";
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleCreateEmployee = () => {
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    const newEmployee: Employee = {
      id: Date.now(), // Generate unique ID
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
                error={!!errors.name}
                helperText={errors.name}
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
                error={!!errors.role}
                helperText={errors.role}
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
                  defaultValue={today}
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
                error={!!errors.department}
                helperText={errors.department}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                error={!!errors.city}
                helperText={errors.city}
              >
                <MenuItem value="Helsinki">Helsinki</MenuItem>
                <MenuItem value="Oulu">Oulu</MenuItem>
                <MenuItem value="Tampere">Tampere</MenuItem>
                <MenuItem value="Kuopio">Kuopio</MenuItem>
                <MenuItem value="Pori">Pori</MenuItem>
              </TextField>
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
