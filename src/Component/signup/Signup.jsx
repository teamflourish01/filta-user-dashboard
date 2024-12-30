import React, { useContext, useState } from "react";
import "../login/login.css";
import filta from "../../images/filta.png";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import google from "../../images/google.png";
import axios from "axios";
import digitalphoto from "../../images/digitalphoto.png";
import emailicon from "../../images/email.svg";
import digitalphone from "../../images/phonecolor.svg";

import "../signup/signup.css";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../context/userDetails";

function Signup({ onSignupSuccess ,digitalCardData }) {
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
        alert("Login Success")
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
          
            <div className="back-arrow" onClick={() => navigate("/")}>
              <FaArrowLeft />
            </div>
        
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
        {/* <div className="signup-card-pre">
          <div className="card-for-preview">
            <p className="text-preview">{digitalCardData?.name || "N/A"} </p>
            <p className="text-preview"> {digitalCardData?.company}</p>
            <p className="text-preview"> {digitalCardData?.email}</p>
            <p className="text-preview">{digitalCardData?.jobtitle} </p>
            <p className="text-preview">{digitalCardData?.location}</p>
            <p className="text-preview"> {digitalCardData?.phoneNumber}</p>
          </div>
        </div> */}
        <div className="card-preview-flex">
      <div className="card-for-preview">
      <div className="card-digital-prev-flex">
            <div className="card-prev-digital"> </div>
            <div className="digitalcard-profile">
              <img src={digitalphoto} alt="" className="digital-card-photo" />
            </div>
            <div className="card-inner-preview-digital">
              <div className="digital-card-text-preview">
                <p className="text-preview-name">{digitalCardData?.name.toUpperCase()}</p>
                <p className="text-preview-field">{digitalCardData?.jobtitle}</p>
                <p className="text-preview-field">{digitalCardData?.company}</p>
                <p className="text-preview-field text-preview-last-padding">
                  {digitalCardData?.location}
                </p>
              </div>
            </div>
          </div>

  <div className="digital-card-link">
    <div className="digital-card-clickable">Clickable Links</div>
    <div className="digital-email-icon-flex">
     
        <div className="digital-email-icon">
          <img
            src={emailicon}
            alt="email icon"
            className="digital-email-image"
          />
          <p className="digital-email-p">Email</p>
        </div>
    

      
        <div className="digital-email-icon">
          <img
            src={digitalphone}
            alt="phone icon"
            className="digital-email-image"
          />
          <p className="digital-email-p">Phone</p>
        </div>
      
    </div>
  </div>



          <div className="digital-last-button">
            <div className="digital-buttons">
              <button>Share Card</button>
              <button>Contact Me</button>
            </div>
          </div>
         
        </div>
      </div>
        
      </div>
    </div>
  );
}

export default Signup;
