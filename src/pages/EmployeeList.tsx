import React, { useState, useEffect, useMemo } from "react";
import EmployeeCard from "../Components/EmployeeCard";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import Loader from "../Components/Loader";
import { Employee } from "../types/type";
import { useEmployeeContext } from "../contexts/EmployeeContext"; // Importing the context

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

  const { employees: contextEmployees } = useEmployeeContext(); // Use the context data

  // Combine contextEmployees and local employees, memoizing to avoid unnecessary recalculation
  const combinedEmployees = useMemo(() => {
    return [...contextEmployees, ...employees];
  }, [contextEmployees, employees]);

  // Fetch employees from the backend API
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

  useEffect(() => {
    // If the contextEmployees array changes, sync it with local state (employees)
    setEmployees(contextEmployees);
  }, [contextEmployees]);

  // Promote an employee to the next role
  const promoteEmployee = (id: number): void => {
    const updatedEmployees = employees.map((emp) =>
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
    );

    // Update both local state and context
    setEmployees(updatedEmployees);
    // Assuming updateEmployeeInContext updates the context
  };

  // Demote an employee to the previous role
  const demoteEmployee = (id: number): void => {
    const updatedEmployees = employees.map((emp) =>
      emp.id === id
        ? {
            ...emp,
            role: rolesHierarchy[
              Math.max(rolesHierarchy.indexOf(emp.role) - 1, 0)
            ],
          }
        : emp
    );

    // Update both local state and context
    setEmployees(updatedEmployees);
    // Assuming updateEmployeeInContext updates the context
  };

  // Update an employee's details
  const updateEmployee = (id: number, updates: Partial<Employee>): void => {
    const updatedEmployees = employees.map((emp) =>
      emp.id === id ? { ...emp, ...updates } : emp
    );

    setEmployees(updatedEmployees); // Update context as well
  };

  // Display a message when no employees are found
  const NoEmployees: React.FC = () => (
    <Box sx={{ textAlign: "center", marginTop: 4 }}>
      <Typography variant="h6">No employees found!</Typography>
    </Box>
  );

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : combinedEmployees.length === 0 ? (
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
          {combinedEmployees.map((employee) => (
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
