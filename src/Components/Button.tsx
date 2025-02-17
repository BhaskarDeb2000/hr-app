import React from "react";
import { Button } from "@mui/material";

interface ButtonComponentProps {
  label: string;
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  onClick: () => void;
  variant?: "text" | "outlined" | "contained";
  sx?: object;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  label,
  color,
  onClick,
  variant = "outlined",
  sx,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      sx={{
        ...sx,
        textTransform: "none",
      }}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
