# HR-App

## Overview

HR-App is a simple and interactive web application designed to manage employees, departments, and job roles efficiently. The app provides a user-friendly interface to view, update, and manage employee details dynamically.

## Features

- **EmployeeCard Component:**
  - Displays each employee’s name, role, location and start date.
- **EmployeeList Component:**
  - Renders multiple EmployeeCard components by passing employee details as props.
- **Promotion & Demotion Functionality:**
  - Employees can be promoted or demoted through buttons, following a predefined hierarchy:
    - Intern → Junior Developer → Developer → Senior Developer → Lead Developer.
- **State Management:**
  - Employee roles are managed dynamically using React state.
- **Employee Data Management:**
  - [Backend data](https://bch-hr-backend.vercel.app/):
    - `name`: Full name of the employee.
    - `role`: Job role.
    - `location`: Office location.
    - `startDate`: Date of joining.
    - `department`

- **Dynamic Employee List:**
  - Renders the employee list as individual cards displaying:
    - Name
    - Role
    - Location
    - Start Date
    - Department
    - Years Worked (calculated dynamically)
- **Log In Functionality:**
  - Added a "Log In" button that toggles between:
    - Employee list view (default when logged in).
    - A login message when logged out.
- **Years Worked Calculation:**
  - Uses JavaScript’s `Date` object to dynamically calculate and display years worked.
- **Anniversary & Probation Reminders:**
  - Displays a "Happy Anniversary!" message if the current date matches an employee’s start date.
  - Shows a probation reminder for employees with less than 1 year of experience.
- **Props Destructuring:**
  - Improved readability and maintainability by destructuring props in all components.
- **Reusable Button Component:**
  - Created a customizable Button component with support for:
    - `label`
    - `onClick`
    - `color`
  - Ensures consistency in UI and follows Material-UI styling standards.
- **Editable Employee Details:**
  - Added an "Edit" button to EmployeeCard to allow users to:
    - Change an employee's role.
    - Update the department.
    - Modify location.
- **Dynamic Department-Based Styling:**
  - Employee cards visually adapt based on department assignments.
  - Uses a mapping object to define styles per department, enhancing user experience.

## Deployment

Live Demo: [hr-app](https://hr-app-three.vercel.app/)

## Technologies Used

- Vite + React
- TypeScript
- Material UI

## Installation & Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repository/hr-app.git
   ```

2. Navigate to the project folder:

   ```sh
   cd hr-app
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Run the application:

   ```sh
   npm start
   ```
