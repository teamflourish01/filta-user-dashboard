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
import { useAuth0 } from "@auth0/auth0-react";
import { useGoogleLogin } from "@react-oauth/google";
function Signup({ onSignupSuccess, digitalCardData }) {
  const [showPassword, setShowPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const uri = process.env.REACT_APP_DEV_URL;
  const { storeTokenLS } = useContext(userContext);
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

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
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${uri}/user/signup`, {
        email: signupData.email,
        password: signupData.password, // Send password as well for OTP step
      });
      if (response.status === 200) {
        alert(response.data.message); // OTP sent message
        setOtpSent(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
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
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google
        if (tokenResponse?.access_token) {
          const { access_token } = tokenResponse;

          const userInfoResponse = await axios.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );

          const userInfo = userInfoResponse.data;
          console.log("Google User Info:", userInfo);

          // Extract email from Google response
          const { email } = userInfo;

          // DB Save email to backend
          const backendResponse = await axios.post(`${uri}/user/googlesignup`, {
            email,
          });

          if (backendResponse.status === 201) {
            const token = backendResponse.data.token;
            storeTokenLS(token);
            onSignupSuccess(token);

            alert("Login Successful");
            navigate("/my-card/");
          } else {
            alert(backendResponse.data.message || "User alredy exist");
          }
        } else {
          throw new Error("No access token found in response");
        }
      } catch (error) {
        console.error("Error during Google login:", error);
        alert(
          error.response.data.message ||
            "Failed to login with Google. Please try again."
        );
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
      alert("Failed to login with Google. Please try again.");
    },
  });
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

                {!otpSent ? (
                  <>
                    <div className="continue-with" onClick={handleGoogleLogin}>
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
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="btn-signup"
                      disabled={
                        loading || !signupData.email || !signupData.password
                      }
                    >
                      {loading ? "Sending OTP..." : "Verify Email"}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="email-row">
                      <div className="input-field-signup"></div>
                      <div className="input-group-signup">
                        <input
                          type="text"
                          className="input"
                          name="otp"
                          value={signupData.otp}
                          onChange={handleInputChange}
                          placeholder="Enter OTP"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      onClick={handleSignup}
                      className="btn-signup"
                      disabled={loading || !signupData.otp}
                    >
                      {loading ? "Processing..." : "Continue"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="card-preview-flex">
          <div className="card-for-preview">
            <div className="card-digital-prev-flex">
              <div className="card-prev-digital"> </div>
              <div className="digitalcard-profile">
                <img src={digitalphoto} alt="" className="digital-card-photo" />
              </div>
              <div className="card-inner-preview-digital">
                <div className="digital-card-text-preview">
                  <p className="text-preview-name">
                    {digitalCardData?.name.toUpperCase()}
                  </p>
                  <p className="text-preview-field">
                    {digitalCardData?.jobtitle}
                  </p>
                  <p className="text-preview-field">
                    {digitalCardData?.company}
                  </p>
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
