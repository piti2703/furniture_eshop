import styles from "./Register.module.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Button from "../../components/UI/Button/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useCallback, useMemo } from "react";
import Input from "../../components/UI/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";

const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = useMemo(
    () =>
      yup.object({
        email: yup
          .string()
          .email("Please enter a valid email address!")
          .required("The field cannot be empty!"),
        password: yup
          .string()
          .required("The field cannot be empty!")
          .min(8, "The minimum password length is 8")
          .max(20, "The maximum password length is 20")
          .matches(/[0-9]/, "The password must contain a number")
          .matches(/[a-z]/, "The password must contain a lowercase letter")
          .matches(/[A-Z]/, "The password must contain a uppercase letter"),
        repeatPassword: yup
          .string()
          .required("The field cannot be empty!")
          .oneOf(
            [yup.ref("password")],
            "The entered passwords are not identical!"
          ),
      }),
    []
  );
  const resolver = useYupValidationResolver(validationSchema);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver });

  const handleRegister = (data, e) => {
    e.preventDefault();
    console.log(data.email);

    const email = data.email;
    const password = data.password;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        toast.success("User registered successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.log(`${error.message}, ${error.code}`);
        toast.error(error.message);
        // ..
      });
  };

  

  return (
    <div className={styles.register}>
      <h3>Sign up</h3>
      <span>Don&apos;t have an account? Register below!</span>
      <form
        className={styles.register__form}
        onSubmit={handleSubmit(handleRegister)}
      >
        <Input
          type="email"
          placeholder="Email"
          name="email"
          register={register}
          error={errors.email?.message}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          register={register}
          error={errors.password?.message}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          name="repeatPassword"
          register={register}
          error={errors.repeatPassword?.message}
        />
        <Button type="submit" className={styles["register__form-btn"]}>
          Register
        </Button>
        <p className={styles.register__register}>
          Aleready an account?
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
