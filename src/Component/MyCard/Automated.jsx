import React, { useContext, useState } from "react";
import "../../Component/MyCard/Automated.css";
import TwoButton from "./TwoButton";
import userContext from "../../context/userDetails";
import axios from "axios";

const Automated = () => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const [formData, setFormData] = useState({
    text: userData?.automated?.text || "",
  });
  const uri = process.env.REACT_APP_DEV_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleRadioChange = (text) => {
    setFormData((prevData) => ({
      ...prevData,
      text,
    }));
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${uri}/automated/add`,
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthorizationToken,
          },
        }
      );
      alert(`${response?.data?.message}`);
      getUserData();
    } catch (error) {
      console.error("Error saving About Data:", error);
    }
  };

  return (
    <>
      <div className="mlt-margin">
        <div className="mlt-info">
          <span className="mlt-title">Info : </span>
          <span className="mlt-desc">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </span>
        </div>
        <div className="auto-suggst-container">
          <p>Suggested</p>
          <div className="auto-divBoxies">
            {[
              "Thanks for connecting! Looking forward to your response",
              "Happy to connect with you!",
              "Welcome to my digital business card",
              "Explore my digital profile here!",
            ].map((message, index) => (
              <div key={index} className={`auto-box${index + 1}`}>
                <label>
                  <input
                    type="radio"
                    name="suggestedMessage"
                    value={message}
                    checked={formData.text === message}
                    onChange={() => handleRadioChange(message)}
                  />
                  {message}
                </label>
              </div>
            ))}
            {/* <div className="auto-box1">
              <p>Thanks for connecting! Looking forward for your response</p>
            </div>
            <div className="auto-box2">
              <p>Happy to connect with you!</p>
            </div>
            <div className="auto-box3">
              <p>Welcome to my digital business card</p>
            </div>
            <div className="auto-box4">
              <p>Explore my digital profile here!</p>
            </div> */}
          </div>
        </div>
        <hr />
        <form onSubmit={handleSave}>
          <div className="auto-customize padding">
            <label>Customize</label>
            <textarea
              className="auto-txtarea"
              name="text"
              value={formData.text}
              onChange={handleInputChange}
            />
          </div>
          <div className="auto-btnpadding">
            <TwoButton />
          </div>
        </form>
      </div>
    </>
  );
};

export default Automated;
