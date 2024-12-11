import React, { useState } from "react";
import "../login/login.css";
import filta from "../../images/filta.png";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import google from "../../images/google.png";

import "../signup/signup.css";
import { Link } from "react-router-dom";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                save your card by signing up below. Welcome to the Filta family
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
                  <input type="email" className="input" />
                </div>
              </div>
              <div className="email-row">
                <div className="input-field-signup pt">Password</div>
                <div className="input-group-signup password-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input-signup"
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
              <Link to="/login">
                <button type="submit" className="btn-signup">
                  Continue
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
