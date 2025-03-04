import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  TextField,
  MenuItem,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Employee } from "../types/type";
import { useNavigate } from "react-router-dom";

import ButtonComponent from "./Button";

// Props for the EmployeeCard component
interface EmployeeCardProps {
  employee: Employee;
  onPromote: (id: number) => void;
  onDemote: (id: number) => void;
  onUpdate: (id: number, updates: Partial<Employee>) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onPromote,
  onDemote,
  onUpdate,
}) => {
  const { id, name, role, startDate, department, city } = employee;
  const navigate = useNavigate();

  const handleDetailPage = () => {
    navigate(`/employee/${id}`);
  };

  // State variables to control editing mode and hold updated field values
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updatedRole, setUpdatedRole] = useState<string>(role);
  const [updatedDepartment, setUpdatedDepartment] =
    useState<string>(department);
  const [updatedCity, setUpdatedCity] = useState<string>(city);
  const [updatedStartDate, setUpdatedStartDate] = useState<Dayjs | null>(
    dayjs(startDate)
  );

  // State for years worked and displaying anniversary/probation messages
  const [yearsWorked, setYearsWorked] = useState<number>(0);
  const [anniversaryMessage, setAnniversaryMessage] = useState<string>("");

  // useEffect calculates the number of years worked and sets anniversary messages.
  useEffect(() => {
    if (!updatedStartDate) return;

    const start = updatedStartDate.toDate();
    const today = new Date();
    const years = today.getFullYear() - start.getFullYear();

    // Check if today is the work anniversary date
    const isAnniversary =
      today.getDate() === start.getDate() &&
      today.getMonth() === start.getMonth();

    // Define probation period as less than one year
    const isProbation = years < 1;

    setYearsWorked(years);

    if (isAnniversary) {
      setAnniversaryMessage("🎉 Happy Work Anniversary! 🎉");
    } else if (isProbation) {
      setAnniversaryMessage("📝 Probation period review pending.");
    } else {
      setAnniversaryMessage("");
    }
  }, [updatedStartDate]);

  // Handle saving the updated information and exit editing mode
  const handleSave = () => {
    onUpdate(id, {
      role: updatedRole,
      department: updatedDepartment,
      city: updatedCity,
      startDate: updatedStartDate ? updatedStartDate.format("YYYY-MM-DD") : "",
    });
    setIsEditing(false);
  };

  // Handle canceling edits and reset the form values
  const handleCancel = () => {
    setUpdatedRole(role || "");
    setUpdatedDepartment(department || "");
    setUpdatedCity(city || "");
    setUpdatedStartDate(dayjs(startDate));
    setIsEditing(false);
  };

  // Background colors based on the department
  const departmentColor: { [key: string]: string } = {
    HR: "#f0e68c",
    Engineering: "#add8e6",
    Marketing: "#ffb6c1",
    Sales: "#d3ffce",
    Default: "#ffffff",
  };

  return (
    <Card
      sx={{
        width: "42vh",
        boxShadow: 3,
        padding: 3,
        borderRadius: 2,
        backgroundColor: departmentColor[department || "Default"],
        transition: "transform 0.3s ease",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <CardContent>
        {/* Display employee avatar and name */}
        <Box>
          <Avatar src={`https://i.pravatar.cc/150?u=${name}`} alt={name} />
          <Typography variant="h6">{name}</Typography>
        </Box>

        {isEditing ? (
          <>
            {/* Editable fields for Role, Department, City, and Start Date */}
            <TextField
              label="Role"
              value={role}
              onChange={(e) => setUpdatedRole(e.target.value)}
              select
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              <MenuItem value="Intern">Intern</MenuItem>
              <MenuItem value="Junior Developer">Junior Developer</MenuItem>
              <MenuItem value="Developer">Developer</MenuItem>
              <MenuItem value="Senior Developer">Senior Developer</MenuItem>
              <MenuItem value="Lead Developer">Lead Developer</MenuItem>
            </TextField>
            <TextField
              label="Department"
              value={updatedDepartment}
              onChange={(e) => setUpdatedDepartment(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="City"
              value={updatedCity}
              onChange={(e) => setUpdatedCity(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Start Date"
                  value={updatedStartDate}
                  onChange={(newValue: Dayjs | null) =>
                    setUpdatedStartDate(newValue)
                  }
                  disableFuture={true}
                />
              </DemoContainer>
            </LocalizationProvider>
          </>
        ) : (
          <>
            <Typography variant="subtitle1" color="text.secondary">
              Role: {role}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Department: {department}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Location: {city}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start Date: {updatedStartDate?.format("DD-MM-YYYY")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Years Worked: {yearsWorked}
            </Typography>
            {anniversaryMessage && (
              <Typography variant="body2" color="primary" margin={1}>
                {anniversaryMessage}
              </Typography>
            )}
          </>
        )}

        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {isEditing ? (
            <>
              <ButtonComponent
                label="Save"
                color="success"
                onClick={handleSave}
              />
              <ButtonComponent
                label="Cancel"
                color="error"
                onClick={handleCancel}
              />
            </>
          ) : (
            <>
              <ButtonComponent
                label="Promote"
                color="success"
                onClick={() => onPromote(id)}
                sx={{ marginRight: 1 }} // Adjust this for spacing
              />
              <ButtonComponent
                label="Demote"
                color="error"
                onClick={() => onDemote(id)}
                sx={{ marginRight: 1 }} // Adjust this for spacing
              />
              <ButtonComponent
                label="Edit"
                color="primary"
                onClick={() => setIsEditing(true)}
                sx={{ marginRight: 1 }} // Adjust this for spacing
              />
              <ButtonComponent
                label="Detail"
                color="success"
                onClick={handleDetailPage}
                sx={{ marginRight: 1 }} // Adjust this for spacing
              />
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
