import { TextField, Typography } from "@mui/material";
import React, { ChangeEvent, FocusEvent } from "react";

interface GlobalInputProps {
  color?: "primary" | "secondary";
  name?: string;
  label?: string;
  type?: string;
  onChangehandler?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlurHandler?: (event: FocusEvent<HTMLInputElement>) => void;
  value?: string | number;
  helperText?: string;
  autocomplete?: string;
  values?: {
    [key: string]: string;
  };
}
const GlobalInput: React.FC<GlobalInputProps> = ({
  color = "primary",
  name = "textfield",
  label = "TextField",
  type = "text",
  onChangehandler,
  onBlurHandler,
  value,
  helperText,
  autocomplete = "off",
}) => {
  return (
    <>
      <TextField
        autoComplete={autocomplete}
        name={name}
        value={value}
        type={type}
        label={label}
        color={color}
        onChange={onChangehandler}
        onBlur={onBlurHandler}
        helperText={
          <Typography sx={{ fontSize: "15px", color: "#f84d4d" }}>
            {helperText}
          </Typography>
        }
        sx={{ width: "100%", marginBottom: 2 }}
      />
    </>
  );
};

export default GlobalInput;
