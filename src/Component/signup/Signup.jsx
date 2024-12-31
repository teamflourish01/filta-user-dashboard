import React, { useContext, useState } from "react";
import "../login/login.css";
import filta from "../../images/filta.png";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import google from "../../images/google.png";
import axios from "axios";

import "../signup/signup.css";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../context/userDetails";

function Signup({ onSignupSuccess, digitalCardData }) {
  const [showPassword, setShowPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const uri = process.env.REACT_APP_DEV_URL;
  const { storeTokenLS } = useContext(userContext);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      // Step 1: Signup API
      const signupResponse = await axios.post(`${uri}/user/signup`, signupData);

      if (signupResponse.status === 201) {
        const token = signupResponse.data.token;
        storeTokenLS(token);
        onSignupSuccess(token);
        alert("Login Success");
        navigate("/my-card/");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(
          error.response.data.message || "An error occurred. Please try again."
        );
      } else {
        console.error("Error:", error);
        alert("Failed to save digital card. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-scontainer">
      <div className="signup-with-prev">
        <div className="signup-container">
          <Link to="/">
            <div className="back-arrow">
              <FaArrowLeft />
            </div>
          </Link>
          <div className="signup-page">
            <div className="signup-form-container">
              <div className="logo-container-signup">
                <img src={filta} alt="filta-logo" className="filta-logo" />
              </div>

              <div className="signup-title">Sign Up</div>
              <div className="signup-tabs">
                <div className="sign-up-top-text">
                  Well done, your digital business card is looking great. Now,
                  save your card by signing up below. Welcome to the Filta
                  family
                </div>
                <div className="continue-with">
                  <img src={google} alt="" srcset="" />
                  <p className="login-google">Continue with Google</p>
                </div>
                <div className="divider">
                  <span className="line"></span>
                  <span className="or-text">OR</span>
                  <span className="line"></span>
                </div>
                <div className="email-row">
                  <div className="input-field-signup">Email</div>
                  <div className="input-group-signup">
                    <input
                      type="email"
                      className="input"
                      name="email"
                      value={signupData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="email-row">
                  <div className="input-field-signup pt">Password</div>
                  <div className="input-group-signup password-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input-signup"
                      name="password"
                      value={signupData.password}
                      onChange={handleInputChange}
                    />
                    <span
                      className="eye-icon-signup"
                      onClick={togglePasswordVisibility}
                    >
                      <span className="eyes-signup">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </span>
                  </div>
                </div>
                <Link>
                  <button
                    type="submit"
                    onClick={handleSignup}
                    className="btn-signup"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Continue"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="signup-card-pre">
          <div className="card-for-preview">
            <p className="text-preview"> </p>
            <p className="text-preview"> </p>
            <p className="text-preview"> </p>
            <p className="text-preview"> </p>
            <p className="text-preview"></p>
            <p className="text-preview"> </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
