"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import GlobalInput from "../../../components/UI/GlobalInput";
import GlobalButton from "../../../components/UI/GlobalButton";
import { loginSchema } from "../../../schemas/loginSchema";
import { useRouter } from "next/navigation";

import { postLoginData } from "@/redux/slices/userDetails";
import { AppThunkDispatch } from "@/redux/slices/userDetails";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppThunkDispatch>();
  const Error = useSelector((state: any) => state.app.loginError);

  



  // states
  const initialValues = {
    email: "",
    password: "",
  };

  // functions
  const handleSignUp = () => {
    router.push("/signUp");
  };

  const { handleChange, handleBlur, handleSubmit, touched, values, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        // console.log("login");
        // console.log(values);

        // try {
        //   await dispatch(postLoginData(values));

        //   router.push("/home");
        // } catch (err) {
        //   throw err;
        // }

        // action.resetForm();

        try {
          await dispatch(postLoginData(values));
          if (!Error) {
            setTimeout(() => {
              router.push("/home");
            }, 2000);

            // No error occurred, redirect to home
          }
        } catch (err: any) {
          // An error occurred during login
          console.error("Login error:", err);
          // Update component state with the error
          //setLogInError(err.message || "Unknown error occurred");
        }

        action.resetForm();
      },
    });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "400px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
          padding: 2,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="fontWeightBold" padding={3}>
          Login Page
        </Typography>
        {Error && Error.trim() !== "" && (
          <Typography color="error">{Error}</Typography>
        )}

        <form>
          <GlobalInput
            name="email"
            label="Email"
            type="email"
            value={values.email}
            onChangehandler={handleChange}
            onBlurHandler={handleBlur}
            values={values}
            helperText={
              touched.email && errors.email ? errors.email : undefined
            }
          />
          <GlobalInput
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChangehandler={handleChange}
            onBlurHandler={handleBlur}
            values={values}
            helperText={
              touched.password && errors.password ? errors.password : undefined
            }
          />

          <Box sx={{ display: "flex", justifyContent: "center", gap: "15px" }}>
            <GlobalButton
              variant="contained"
              color="success"
              title="Log In"
              type="submit"
              onClick={() => {
                handleSubmit();
              }}
            />

            <GlobalButton
              variant="contained"
              color="secondary"
              title="Sign Up"
              onClick={handleSignUp}
            />
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
