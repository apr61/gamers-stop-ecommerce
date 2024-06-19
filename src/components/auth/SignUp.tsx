import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { signUp } from "../../services/auth";
import "./commonStyle.css";
import { UserData } from "../../utils/types";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";

interface SignUpFormType {
  name: string;
  email: string;
  password: string;
  cpassword: string;
}

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
    setError,
  } = useForm<SignUpFormType>();
  const navigate = useNavigate();

  const password = watch("password", "");

  const onSubmit: SubmitHandler<SignUpFormType> = async (data) => {
    try {
      const newUser: UserData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      await signUp(newUser);
    } catch (err) {
      if (err instanceof Error) {
        setError("root", { message: err.message });
      }
    }
    if (errors) {
      navigate("/");
    }
  };
  return (
    <>
      <Navbar />
      <section className="auth-page">
        <h2 className="auth-page__title">Sign up</h2>
        <form className="auth-page__form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p role="alert" className="form-errors">
              {errors.name.message}
            </p>
          )}
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email must be a valid",
              },
            })}
          />
          {errors.email && (
            <p role="alert" className="form-errors">
              {errors.email.message}
            </p>
          )}
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be atleast 8 characters",
              },
              maxLength: 10,
            })}
          />
          {errors.password && (
            <p role="alert" className="form-errors">
              {errors.password.message}
            </p>
          )}
          <Input
            label="Confirm Password"
            placeholder="Enter your password again"
            type="password"
            {...register("cpassword", {
              required: "Confirm password is required",
              validate: (value) =>
                password === value || "The passwords doesn't match!!!",
            })}
          />
          {errors.cpassword && (
            <p role="alert" className="form-errors">
              {errors.cpassword.message}
            </p>
          )}
          <Button
            text={isSubmitting ? "Loading..." : "Sign Up"}
            isDisabled={!isValid || isSubmitting}
          />
          {errors.root && (
            <p role="alert" className="form-errors">
              {errors.root.message}
            </p>
          )}
        </form>
        <p className="auth-page__info">
          Already have an account? Go{" "}
          <Link to="/signin" className="auth-page__link">
            here
          </Link>
        </p>
      </section>
    </>
  );
}

export default SignUp;
