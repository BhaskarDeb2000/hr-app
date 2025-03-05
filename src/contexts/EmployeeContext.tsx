import React, { createContext, useState, useContext, ReactNode } from "react";
import { Employee } from "../types/type";

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: number, updatedEmployee: Partial<Employee>) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useEmployeeContext = (): EmployeeContextType => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error(
      "useEmployeeContext must be used within a EmployeeProvider"
    );
  }
  return context;
};

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const addEmployee = (employee: Employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, employee]);
  };

  const updateEmployee = (id: number, updatedEmployee: Partial<Employee>) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, ...updatedEmployee } : emp
      )
    );
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
