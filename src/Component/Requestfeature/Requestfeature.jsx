import React, { useContext, useState } from "react";
import "../Requestfeature/requestfeature.css";
import { useForm } from "react-hook-form";
import userContext from "../../context/userDetails";
import axios from "axios";
import { logDOM } from "@testing-library/react";
const Requestfeature = () => {
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
      const response = await axios.post(`${uri}/feature/send-email`, data, {
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
      <div className="req-outer-white-color">
        <div className="req-outer-box">
          <div className="req-inner-width-box">
            <h2 className="req-heading">Request a Feature</h2>
            <div className="req-bottom-border"></div>
            <form className=" req-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="req-padding">
                <label className="req-label">Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  className="req-input"
                  {...register("title")}
                />
                <label className="req-label">Select Modul</label>
                <select className="req-select" {...register("module")}>
                  <option value="my-card">My Card</option>
                  <option value="nfc-card">NFC Card</option>
                  <option value="email-signature">Email Signature</option>
                  <option value="virtual-background">Virtual Background</option>
                </select>
                <label className="req-label">Describe Your Request</label>
                <textarea
                  placeholder="Describe Your Request"
                  className="req-textarea"
                  {...register("describe")}
                />
              </div>
              <div className="req-bottom-border"></div>
              <button type="submit" className="req-button" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Requestfeature;
