import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string().min(2).max(20).required("please Enter your Name "),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please Enter your Email"),
  phone: Yup.string()
    .test("is-number", "Please enter a valid phone number", (value) => {
      // Check if the value is a valid number
      return !isNaN(value);
    })
    .required("Please enter your phone number"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "Password must contain at least one alphabet and one number"
    )
    .required("Please enter your password"),
});
