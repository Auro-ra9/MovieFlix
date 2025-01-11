import "./Login.css";
import logo from "../../assets/logo.png";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { login, signup } from "../../firebase";
import netfix_spinner from "../../assets/netflix_spinner.gif";
import { Eye, EyeClosed } from "lucide-react";

const Login: React.FC = () => {
  const [signState, setSignState] = useState<"Sign In" | "Sign Up">("Sign In");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [togglePassword, setTogglePassword] = useState(false);

  const validateInputs = (): boolean => {
    if (signState === "Sign Up") {
      if (!name) {
        toast.error("Please enter your name.");
        return false;
      } else if (!/^[A-Za-z\s]+$/.test(name)) {
        toast.error("Name must only contain letters.");
        return false;
      } else if (name.length < 2) {
        toast.error("Name must be at least 2 characters long.");
        return false;
      }
    }

    if (!email) {
      toast.error("Please enter your email address.");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error(
        "Please enter a valid email address. Example: email@example.com."
      );
      return false;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return false;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    } else if (!/(?=.*[0-9])(?=.*[A-Z])(?=.*\W)/.test(password)) {
      toast.error(
        "Password must include at least one number, one uppercase letter, and one special character."
      );
      return false;
    }

    return true; // If all validations pass
  };

  const user_auth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return; // Prevent form submission if validation fails

    setLoading(true);
    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (error) {
      toast.error("Authentication failed!"); // Handle authentication errors
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="login-spinner">
      <img src={netfix_spinner} alt="Loading..." />
    </div>
  ) : (
    <div className="login">
      <img src={logo} alt="Logo" className="login-logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === "Sign Up" && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
          <div className="password-container">
            <input
              type={togglePassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <span
              className="toggle-password"
              onClick={() => setTogglePassword((curr) => !curr)}
            >
              {togglePassword ? <Eye /> : <EyeClosed />}
            </span>
          </div>
          <button type="submit">{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
