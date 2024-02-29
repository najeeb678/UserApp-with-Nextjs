"use client";
import React from "react";

import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";

import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";

import GlobalButton from "../../../components/UI/GlobalButton";
import { signupSchema } from "../../../schemas/signupSchema";
import image from "../../../../public/assets/image.jpg";
import GlobalInput from "../../../components/UI/GlobalInput";
import Image from "next/image";
import { postUserData } from "@/redux/slices/userDetails";
//import { RootState } from "@/redux/slices/userDetails";
import { AppThunkDispatch } from "@/redux/slices/userDetails";

const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppThunkDispatch>();
  const error = useSelector((state: any) => state.app.signupError);

  const { handleChange, handleBlur, handleSubmit, touched, values, errors } =
    useFormik({
      initialValues: { name: "", email: "", phone: "", password: "" },
      validationSchema: signupSchema,
      onSubmit: async (values, action) => {
        try {
          await dispatch(postUserData(values));
          if (!error) {
            setTimeout(() => {
              router.push("/home");
            }, 2000);
          }
        } catch (err) {
          console.error("Error signing up:", err);
        }
        console.log(values);
        router.push("/");
      },
    });

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper
        sx={{ maxWidth: "80%", maxHeight: "100%", borderRadius: 3, padding: 0 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box sx={{ padding: 4 }}>
              {error && (
                <Typography variant="body1" sx={{ color: "error.main" }}>
                  {error}
                </Typography>
              )}
              {/* {error && console.log("Error:", error)} */}
              <Box sx={{ marginBottom: 1 }}>
                <Typography variant="h5" fontWeight="bold">
                  Welcome!
                </Typography>
                <Typography variant="h6">To the User Web APP</Typography>
              </Box>

              <form>
                <GlobalInput
                  name="name"
                  label="Name"
                  value={values.name}
                  onChangehandler={handleChange}
                  onBlurHandler={handleBlur}
                  values={values}
                  helperText={
                    touched.name && errors.name ? errors.name : undefined
                  }
                />
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
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                />
                <GlobalInput
                  name="phone"
                  label="Phone Number"
                  value={values.phone}
                  onChangehandler={handleChange}
                  onBlurHandler={handleBlur}
                  values={values}
                  helperText={
                    touched.phone && errors.phone ? errors.phone : undefined
                  }
                />
                <GlobalButton
                  variant="contained"
                  color="success"
                  title="Sign Up"
                  type="submit"
                  onClick={() => {
                    handleSubmit();
                  }}
                />
              </form>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                  padding: 0,
                }}
              >
                <Typography style={{ fontSize: "15px" }}>
                  Already Have An Account?
                </Typography>
                <a
                  href="/"
                  style={{
                    fontSize: "15px",
                    marginLeft: 1,
                    cursor: "pointer",
                  }}
                >
                  Login Now
                </a>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Image
              src={image}
              alt="my image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderTopRightRadius: "10px", // Adjust the value as needed
                borderBottomRightRadius: "10px",
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignUp;
