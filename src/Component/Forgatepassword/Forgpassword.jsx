import React, { useState } from "react";
import "../Forgatepassword/forgpassword.css";
import farrow from "../../images/farrow.png";
import filta from "../../images/filta.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Forgpassword = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    otp: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const uri = process.env.REACT_APP_DEV_URL;
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
      const response = await axios.post(`${uri}/user/forgot`, {
        email: signupData.email,
      });
      if (response.status === 200) {
        alert(response.data.message);
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
      const signupResponse = await axios.post(`${uri}/user/forgot`, signupData);

      if (signupResponse.status === 200) {
        alert(signupResponse.data.message || "reset link send");
        setSignupData({
          email: "",
          otp: "",
          password: "",
        });
        navigate("/login");
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
    <div className="f-password-container">
      <div className="forgate-container">
        <div className="forgate-container-in">
          <div className="forgate-logo-arrow">
            <Link to="/login">
              <img src={farrow} alt="" srcset="" className="forgate-arrow" />
            </Link>
            <img src={filta} alt="" srcset="" className="forgate-logo" />
          </div>
          <div className="forgate-contain">
            We all forget sometimes. Submit your email and we will send you
            instructions to reset your password.
          </div>
          {!otpSent ? (
            <>
              <div className="forgate-email">
                <div className="forgate-contain">Email</div>
                <input
                  type="email"
                  className="forgate-input"
                  name="email"
                  value={signupData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleSendOtp}
                className="btn-login"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "OTP Send your Email"}
              </button>
            </>
          ) : (
            <>
              <div className="forgate-email">
                <div className="forgate-contain">OTP</div>
                <input
                  type="text"
                  className="forgate-input"
                  name="otp"
                  value={signupData.otp}
                  onChange={handleInputChange}
                  placeholder="Enter OTP"
                  required
                />
              </div>
              <div className="forgate-email">
                <div className="forgate-contain">New Password</div>
                <input
                  type="password"
                  className="forgate-input"
                  name="password"
                  value={signupData.password}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleSignup}
                className="btn-login"
                disabled={loading || !signupData.otp}
              >
                {loading ? "Loading..." : "Verify Email"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forgpassword;
