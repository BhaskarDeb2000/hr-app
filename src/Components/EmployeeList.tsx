import React, { useState, useEffect } from "react";
import EmployeeCard from "./EmployeeCard";
import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";

interface Employee {
  id: number;
  name: string;
  role: string;
  startDate: string;
  department?: string;
  city?: string;
}

const rolesHierarchy: string[] = [
  "Intern",
  "Junior Developer",
  "Developer",
  "Senior Developer",
  "Lead Developer",
];

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://bch-hr-backend.vercel.app/");
        setEmployees(response.data.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const promoteEmployee = (id: number): void => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              role: rolesHierarchy[
                Math.min(
                  rolesHierarchy.indexOf(emp.role) + 1,
                  rolesHierarchy.length - 1
                )
              ],
            }
          : emp
      )
    );
  };

  const demoteEmployee = (id: number): void => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              role: rolesHierarchy[
                Math.max(rolesHierarchy.indexOf(emp.role) - 1, 0)
              ],
            }
          : emp
      )
    );
  };

  const updateEmployee = (id: number, updates: Partial<Employee>): void => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updates } : emp))
    );
  };

  const Loader: React.FC = () => (
    <Box sx={{ textAlign: "center", marginTop: 4 }}>
      <CircularProgress />
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Loading employees...
      </Typography>
    </Box>
  );

  const NoEmployees: React.FC = () => (
    <Box sx={{ textAlign: "center", marginTop: 4 }}>
      <Typography variant="h6">No employees found!</Typography>
    </Box>
  );

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : employees.length === 0 ? (
        <NoEmployees />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
            justifyItems: "center",
            alignItems: "center",
            marginTop: 3,
          }}
        >
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onPromote={promoteEmployee}
              onDemote={demoteEmployee}
              onUpdate={updateEmployee}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default EmployeeList;
