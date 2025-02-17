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
import ButtonComponent from "./Button";

interface Employee {
  id: number;
  name: string;
  role: string;
  startDate: string;
  department?: string;
  city?: string;
}

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
  const { id, name, role, startDate, department } = employee;
  const avatarUrl = `https://api.multiavatar.com/${name}.svg`;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updatedRole, setUpdatedRole] = useState<string>(role);
  const [updatedDepartment, setUpdatedDepartment] = useState<string>(
    department || ""
  );
  const [updatedcity, setUpdatedcity] = useState<string>(employee.city || "");
  const [updatedStartDate, setUpdatedStartDate] = useState<string>(startDate);

  const [yearsWorked, setYearsWorked] = useState<number>(0);
  const [anniversaryMessage, setAnniversaryMessage] = useState<string>("");

  useEffect(() => {
    const start = new Date(startDate);
    const today = new Date();
    const years = today.getFullYear() - start.getFullYear();

    const formattedStartDate = `${start
      .getDate()
      .toString()
      .padStart(2, "0")}-${(start.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${start.getFullYear()}`;
    setUpdatedStartDate(formattedStartDate);

    const isAnniversary =
      today.getDate() === start.getDate() &&
      today.getMonth() === start.getMonth();
    const isProbation = years < 1;

    setYearsWorked(years);

    if (isAnniversary) {
      setAnniversaryMessage("Happy Anniversary!");
    } else if (isProbation) {
      setAnniversaryMessage("Probation period review pending.");
    } else {
      setAnniversaryMessage("");
    }
  }, [startDate]);

  const handleSave = () => {
    onUpdate(id, {
      role: updatedRole,
      department: updatedDepartment,
      city: updatedcity,
      startDate: updatedStartDate,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUpdatedRole(role);
    setUpdatedDepartment(department || "");
    setUpdatedcity(employee.city || "");
    setIsEditing(false);
  };

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
        width: "30vh",
        boxShadow: 3,
        padding: 3,
        borderRadius: 2,
        backgroundColor: departmentColor[department || "Default"],
        transition: "transform 0.3s ease",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <Avatar
            src={avatarUrl}
            alt={name}
            sx={{ width: 56, height: 56, marginRight: 2 }}
          />
          <Typography variant="h6">{name}</Typography>
        </Box>
        {isEditing ? (
          <>
            <TextField
              label="Role"
              value={updatedRole}
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
              label="city"
              value={updatedcity}
              onChange={(e) => setUpdatedcity(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Start Date"
              value={updatedStartDate}
              onChange={(e) => setUpdatedStartDate(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          </>
        ) : (
          <>
            <Typography variant="subtitle1" color="text.secondary">
              Role: {role}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Department: {department || "N/A"}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Location: {employee.city || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start Date: {updatedStartDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Years Worked: {yearsWorked}
            </Typography>
            {anniversaryMessage && (
              <Typography variant="body2" color="primary">
                {anniversaryMessage}
              </Typography>
            )}
          </>
        )}
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "space-between",
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
              />
              <ButtonComponent
                label="Demote"
                color="error"
                onClick={() => onDemote(id)}
              />
              <ButtonComponent
                label="Edit"
                color="primary"
                onClick={() => setIsEditing(true)}
              />
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
