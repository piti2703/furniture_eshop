import Button from "../../components/UI/Button/Button";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useCallback, useMemo } from "react";
import Input from "../../components/UI/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
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

const Login = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        login: yup
          .string()
          .email("Please enter a valid email address!")
          .required("The field cannot be empty!"),
        password: yup.string().required("The field cannot be empty!"),
      }),
    []
  );
  const resolver = useYupValidationResolver(validationSchema);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver });
  
  const navigate = useNavigate();

  const loginHandler = (data, e) => {
    e.preventDefault();
    const email = data.login;
    const password = data.password;
    console.log(data);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        toast.success("Login successfully!");
        navigate('/')
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };


  const provider = new GoogleAuthProvider();
  const loginWithGoogleHandler = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
    .then((result) => {
     
      const user = result.user;
      console.log(user);
      toast.success("Login successfully!");
      navigate('/')
    }).catch((error) => {
      toast.error(error.message)
      
    });
  }

  return (
    <div className={styles.login}>
      <h3>Sign in</h3>
      <span>Already have an account? Enter your details below!</span>
      <form
        className={styles.login__form}
        onSubmit={handleSubmit(loginHandler)}
      >
        <Input
          type="email"
          placeholder="Email"
          name="login"
          register={register}
          error={errors.login?.message}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          register={register}
          error={errors.password?.message}
        />
        <Link to="/reset" className={styles.login__reset}>
          Reset password
        </Link>
        <Button type="submit" className={styles["login__form-btn"]}>
          Login
        </Button>
        <Button className={styles["login__form-btn2"]} onClick={loginWithGoogleHandler}>
          <AiFillGoogleCircle size={20} />
          <span>Login with Google</span>
        </Button>
        <p className={styles.login__register}>
          Don&apos;t have an account?
          <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
