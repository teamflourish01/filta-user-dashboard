import React, { useContext, useState } from "react";
import "../login/login.css";
import filta from "../../images/filta.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import google from "../../images/google.png";
import facebook from "../../images/facebook.png";
import lock from "../../images/lock.png";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../context/userDetails";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;
  const { storeTokenLS } = useContext(userContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/user/signin`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        storeTokenLS(data.token);
        // localStorage.setItem("token", data.token);
        alert("Login Success");
        navigate("/my-card/");
      } else {
        const errorData = await response.json();
        alert(`error login ${errorData.message}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="login-container">
        <div className="login-page">
          <div className="login-form-container">
            <div className="logo-container">
              <img src={filta} alt="filta-logo" className="filta-logo" />
            </div>
            <div className="login-title">Log in</div>

            <div className="login-tabs">
              <form onSubmit={handleSubmit}>
                <div className="email-row">
                  <div className="lgn-input-field">Email</div>
                  <div className="input-group">
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      className="input"
                    />
                  </div>
                </div>
                <div className="email-row">
                  <div className="lgn-input-field pt">Password</div>
                  <div className="input-group password-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                    />
                    <span
                      className="eye-icon"
                      onClick={togglePasswordVisibility}
                    >
                      <span className="eyes">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="forget-me-container">
                  <div className="checkbox-row">
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe" className="remember-me">
                      Remember me
                    </label>
                  </div>
                  <div className="forget-content">
                    <Link to="/forgatepass" className="forget-text">
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-login"
                  disabled={isLoading}
                >
                  {isLoading ? "Wait..." : "Sign in"}
                  {/* Sign in */}
                </button>
              </form>
              <div className="divider">
                <span className="line"></span>
                <span className="or-text">OR</span>
                <span className="line"></span>
              </div>
              {/* <Glogin /> */}
              <div className="continues-with">
                <img src={google} alt="" srcset="" />
                <p className="login-google">Continue with Google</p>
              </div>
              <div className="continues-with continue-padding">
                <img src={facebook} alt="" srcset="" />
                <p className="login-google">Continue with Facebook</p>
              </div>
              <div className="continues-with">
                <img src={lock} alt="" srcset="" />
                <p className="login-google">Continue with SSO</p>
              </div>
              <div className="new-to-filta">
                <p className="text-center">
                  <span className="new-text">New to filta ? </span>
                  <Link to="/" className="create-account">
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
