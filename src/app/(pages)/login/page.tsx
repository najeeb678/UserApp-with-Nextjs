"use client";

import React from "react";
//import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useFormik } from "formik";
//import { useDispatch, useSelector } from "react-redux";

import GlobalInput from "../../../components/UI/GlobalInput";
import GlobalButton from "../../../components/UI/GlobalButton";
import { loginSchema } from "../../../schemas/loginSchema";
import { useRouter } from "next/navigation";

//import { postLoginData } from "../Redux/Slices/userDetails";

const LoginForm = () => {
  const router = useRouter();
  // hooks
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();
  //   const logInError = useSelector((state) => state.userDetails.loginError);
  // console.log(error)

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
        //console.log("login");
        console.log(values);
        router.push("/home");
        // try {
        //   await dispatch(postLoginData(values));

        //   navigate("/home");
        // } catch (err) {
        //   throw err;
        // }

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
        {/* {logInError && <Typography color="error">{logInError}</Typography>} */}
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

// import { Button } from "@mui/material";
// import { useRouter } from "next/navigation";
// import React from "react";

// const LoginForm = () => {
//   const router = useRouter();
//   return (
//     <div>
//       <h1>LogIn</h1>
//       <Button
//         onClick={() => {
//           router.push("/signUp");
//         }}
//       >
//         Go to SignUp
//       </Button>
//     </div>
//   );
// };

// export default LoginForm;
