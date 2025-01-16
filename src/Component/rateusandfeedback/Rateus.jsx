import React, { useContext, useState } from "react";
import "../rateusandfeedback/rateus.css";
import { useForm } from "react-hook-form";
import userContext from "../../context/userDetails";
import axios from "axios";
export const Rateus = () => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${uri}/feedback/send-email`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
      });
      alert(`${response?.data?.message}`);
      getUserData();
      reset();
    } catch (error) {
      console.error("Error sending email:", error);
      alert(
        error.response.data.message ||
          "Failed Email Send ,Plz try agin later..!"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="rateus-overflow">
        <div className="rateus-container">
          <div className="rate-us-feedback-main">
            <div className="rate-us">
              <h2>Rate Us</h2>
              <div className="req-bottom-border"></div>

              <div className="rate-innercontainer">
                <div className="google-logo">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                    alt="Google"
                  />
                </div>
                <div className="rating">
                  <span>⭐⭐⭐⭐⭐</span>
                  <p className="rate-us-para">
                    5/5 Rating From Over 50 Reviews
                  </p>
                </div>
              </div>
              <div className="req-bottom-border"></div>

              <a href="#" className="view-reviews">
                View All Reviews
              </a>
            </div>
            <div className="feedback-form">
              <h2>Feedback</h2>
              <div className="req-bottom-border"></div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="feed-back-form">
                  <label htmlFor="" className="rate-us-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="feedback-input"
                    {...register("title")}
                  />
                  <label htmlFor="" className="rate-us-label">
                    Describe Your Request
                  </label>
                  <textarea
                    className="feedback-textarea"
                    {...register("describe")}
                  ></textarea>
                </div>
                <div className="req-bottom-border"></div>

                <button
                  type="submit"
                  className="submit-button-rateus"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
