"use client";
import { Button } from "@mui/material";
import React from "react";

interface GlobalButtonProps {
  color?:
    | "primary"
    | "inherit"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  size?: "small" | "medium" | "large";
  variant?: "text" | "outlined" | "contained";
  title?: string;
  onClick?: () => void;
  type?: "submit" | "button";
}
const GlobalButton: React.FC<GlobalButtonProps> = ({
  color = "primary",
  size = "medium",
  variant = "contained",
  title = "Button",
  onClick = () => {},
}) => {
  return (
    <Button onClick={onClick} color={color} size={size} variant={variant}>
      {title}
    </Button>
  );
};

export default GlobalButton;
