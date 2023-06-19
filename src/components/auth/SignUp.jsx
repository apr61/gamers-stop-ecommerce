import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useAuthContext } from "../../context/AuthContext";
import { signUp } from "../../services/auth";
import "./commonStyle.css";

function SignUp() {
  const { name, email, password, cpassword, error, authDispatch } =
    useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      authDispatch({ type: "ERROR", payload: "Password's don't match" });
      return;
    }
    try {
      await signUp(email, password, name);
      navigate("/");
    } catch (err) {
      authDispatch({ type: "ERROR", payload: err.code });
    } finally {
      authDispatch({ type: "ERROR", payload: "" });
      authDispatch({ type: "NAME", payload: "" });
      authDispatch({ type: "EMAIL", payload: "" });
      authDispatch({ type: "PASSWORD", payload: "" });
      authDispatch({ type: "CPASSWORD", payload: "" });
    }
  };
  return (
    <>
      <Navbar />
      <section className="auth-page">
        <h2 className="auth-page__title">Sign up</h2>
        {error && <p className="auth-page__error-msg">{error}</p>}
        <form className="auth-page__form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name" className="input-group__label">
              Name
            </label>
            <input
              className="input-group__input"
              type="text"
              placeholder="Enter name"
              id="name"
              value={name}
              required
              onChange={(e) =>
                authDispatch({ type: "NAME", payload: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="input-group__label">
              Email
            </label>
            <input
              className="input-group__input"
              type="email"
              placeholder="Enter Email"
              id="email"
              value={email}
              required
              onChange={(e) =>
                authDispatch({ type: "Email", payload: e.target.value })
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
          <div className="input-group">
            <label htmlFor="password" className="input-group__label">
              Confirm Password
            </label>
            <input
              className="input-group__input"
              type="password"
              placeholder="Enter password again"
              id="cpassword"
              value={cpassword}
              required
              onChange={(e) =>
                authDispatch({ type: "CPASSWORD", payload: e.target.value })
              }
            />
          </div>
          <button className="auth-page__btn" disabled={loading}>
            Sign Up
          </button>
        </form>
        <p className="auth-page__info">
          Already have an account? Go <Link to="/signin">here</Link>
        </p>
      </section>
    </>
  );
}

export default SignUp;
