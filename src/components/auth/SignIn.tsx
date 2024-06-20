import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../navbarApp/Navbar";
import { signInService } from "../../services/auth";
import "./commonStyle.css";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import { FirebaseError } from "firebase/app";

type SignInFormType = {
  email: string;
  password: string;
};

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, isSubmitting, errors },
  } = useForm<SignInFormType>();

  const onSubmit: SubmitHandler<SignInFormType> = async (data) => {
    try {
      await signInService(data.email, data.password);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError("root", { message: err.code });
      }
    }
    if (errors) {
      navigate(from, { replace: true });
    }
  };

  const handleLoginAsGuest = async () => {
    await signInService("guest@dev.com", "Guest@1234");
    if (errors) {
      navigate(from, { replace: true });
    }
  };

  return (
    <>
      <Navbar />
      <section className="auth-page">
        <h2 className="auth-page__title">Sign In</h2>
        <form className="auth-page__form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            placeholder="you@example.com"
            type="email"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (value) =>
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
            type="password"
            placeholder="Your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be 8 characters",
              },
            })}
          />
          {errors.password && (
            <p role="alert" className="form-errors">
              {errors.password.message}
            </p>
          )}
          <Button
            text={isSubmitting ? "Loading..." : "Sign In"}
            isDisabled={isSubmitting || !isValid}
          />
          <Button
            text={isSubmitting ? "Loading..." : "Login as guest"}
            type="button"
            isDisabled={isSubmitting}
            btnType="ghost"
            onClick={handleLoginAsGuest}
          />
          {errors.root && (
            <p role="alert" className="form-errors">
              {errors.root.message}
            </p>
          )}
        </form>
        <p className="auth-page__info">
          Don't have a account? Create{" "}
          <Link to="/signup" className="auth-page__link">
            here
          </Link>
        </p>
      </section>
    </>
  );
}

export default SignIn;
