import styles from './Reset.module.scss'
import Button from "../../components/UI/Button/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useCallback, useMemo } from "react";
import Input from "../../components/UI/Input/Input";
import { auth } from '../../firebase/config'
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

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

const Reset = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        email: yup
        .string()
        .email("Please enter a valid email address!")
        .required("The field cannot be empty!"),
      }),
    []
  );
  const resolver = useYupValidationResolver(validationSchema);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver });

  const navigate = useNavigate()
  const resetPasswordHandler = (data, e) => { 
    e.preventDefault();
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        toast.success("Check your email for a reset link");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        // ..
      });

   }


  return (
    <div className={styles.reset}>
      <h3>Reset password</h3>
      <span>Have you forgotten your password? Reset them!</span>
      <form
        className={styles.reset__form}
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <Input
          type="email"
          placeholder="Email"
          name="email"
          register={register}
          error={errors.email?.message}
        />
        <Button type="submit" className={styles["reset__form-btn"]} onClick={handleSubmit(resetPasswordHandler)}>
          Reset
        </Button>
      </form>
    </div>
  );
};

export default Reset;
