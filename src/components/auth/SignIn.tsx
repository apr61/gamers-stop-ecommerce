
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useAuthContext } from "../../context/AuthContext";
import { signInService } from "../../services/auth";
import "./commonStyle.css";
import { User } from "../../utils/types";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { email, password, error, authDispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user: Partial<User> = {
        email: email,
        password: password
      }
      await signInService(user);
    } catch (err) {
      if (err.code === "auth/user-not-found")
        authDispatch({ type: "ERROR", payload: "User not found" });
      else if (err.code === "auth/wrong-password")
        authDispatch({ type: "ERROR", payload: "Wrong password" });
      else authDispatch({ type: "ERROR", payload: err.code });
      return
    } finally {
      authDispatch({ type: "EMAIL", payload: "" });
      authDispatch({ type: "PASSWORD", payload: "" });
      navigate(from, { replace: true });
    }
  };

  const handleLoginAsGuest = async () => {
    authDispatch({ type: "EMAIL", payload: "guest@dev.com" });
    authDispatch({ type: "PASSWORD", payload: "Guest@1234" });

    try {
      await signInService("guest@dev.com", "Guest@1234");
    } finally {
      authDispatch({ type: "EMAIL", payload: "" });
      authDispatch({ type: "PASSWORD", payload: "" });
      navigate(from, { replace: true });
    }
  }
  return (
    <>
      <Navbar />
      <section className="auth-page">
        <h2 className="auth-page__title">Sign In</h2>
        {error && <p className="auth-page__error-msg">{error}</p>}
        <form className="auth-page__form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email" className="input-group__label">
              Email
            </label>
            <input
              className="input-group__input"
              type="email"
              placeholder="Enter email"
              id="email"
              value={email}
              required
              onChange={(e) =>
                authDispatch({ type: "EMAIL", payload: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-group__label">
              Password
            </label>
            <input
              className="input-group__input"
              type="password"
              placeholder="Enter password"
              id="password"
              value={password}
              required
              onChange={(e) =>
                authDispatch({ type: "PASSWORD", payload: e.target.value })
              }
            />
          </div>
          <button className="auth-page__btn">Sign In</button>
          <button type="button" className="auth-page__btn auth-page__btn--ghost" onClick={handleLoginAsGuest}>Login as guest</button>
        </form>
        <p className="auth-page__info">
          Don't have a account? Create <Link to="/signup">here</Link>
        </p>
      </section>
    </>
  );
}

export default SignIn;
