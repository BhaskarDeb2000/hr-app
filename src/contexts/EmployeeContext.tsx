// EmployeeContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
export interface WorkHistory {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
}

export interface Employee {
  id: number;
  name: string;
  role: string;
  startDate: string;
  department: string;
  city: string;
  workHistory: WorkHistory[];
}

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
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

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};
