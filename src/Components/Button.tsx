import React from "react";
import { Button } from "@mui/material";

interface ButtonComponentProps {
  label: string;
  color: "inherit" | "primary" | "secondary" | "success" | "error";
  onClick: () => void;
  variant?: "text" | "outlined" | "contained";
  sx?: object;
  justifyContent?: "space-between" | "space-around" | "space-evenly";
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  label,
  color,
  onClick,
  variant = "outlined",
  sx,
  justifyContent,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      sx={{
        ...sx,
        textTransform: "none",
        justifyContent: justifyContent,
      }}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
