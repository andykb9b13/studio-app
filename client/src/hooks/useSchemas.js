import * as yup from "yup";

export const useSchemas = () => {
  const signInSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .trim()
      .min(8, "Passwords must be between 8 and 20 characters")
      .max(20, "Passwords must be between 8 and 20 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords don't match"),
  });

  const loginSchema = yup.object().shape({
    email: yup.string().required("Please Enter Your Email"),
    password: yup.string().required("Please Enter Your Password"),
  });

  return {
    signInSchema,
    loginSchema,
  };
};
