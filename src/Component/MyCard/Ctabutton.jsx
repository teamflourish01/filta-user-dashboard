import React, { useContext, useEffect, useState } from "react";
import "./ctabutton.css";
import TwoButton from "./TwoButton";
import userContext from "../../context/userDetails";
import userEvent from "@testing-library/user-event";

const Ctabutton = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const [data, setData] = useState("");
  const [text, setText] = useState("");
  const [cta, setCta] = useState({
    btn_type: "",
    btn_text: "",
    mobile: "",
    url: "",
    mail: "",
  });
  const url = process.env.REACT_APP_DEV_URL;
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setCta({ ...cta, btn_type: event.target.value });
  };

  const handleInputChange = (e) => {
    setData(e.target.value);
    let { name, value } = e.target;
    setCta({ ...cta, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      let data = await fetch(`${url}/cta/add`, {
        body: JSON.stringify(cta),
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: AuthorizationToken,
        },
      });
      data = await data.json();
      console.log(data);
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
    setCta({
      btn_type: userData?.cta?.btn_type,
      btn_text: userData?.cta?.btn_text,
      mail: userData?.cta?.mail,
      url: userData?.cta?.url,
      mobile: userData?.cta?.mobile,
    });
    setSelectedOption(userData?.cta?.btn_type);
    setText(userData?.cta?.btn_text);
    setData(userData?.cta?.mobile || userData?.cta?.mail || userData?.cat?.url);
  }, []);
  return (
    <>
      <div className="cta-container">
        <div className="cta-info">
          <span>Info :</span> It is a long-established fact that a reader will
          be distracted by the readable content of a page when looking at its
          layout.
        </div>
        <div className="cta-option">
          <label htmlFor="cta-select" className="cta-button-label">
            Button Type
          </label>
          <select
            name="Choose Button"
            id="cta-select"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">Choose Button Type</option>
            <option value="Contact">Contact Me</option>
            <option value="Mail">Mail Me</option>
            <option value="Visit">Visit My Website</option>
          </select>
        </div>
        <div className="cta-url">
          <label htmlFor="cta-button-text" className="cta-button-label">
            Button Text
          </label>
          <input
            type="text"
            id="cta-button-text"
            className="cta-mobileno"
            onChange={(e) => {
              setCta({ ...cta, btn_text: e.target.value });
              setText(e.target.value);
            }}
            value={text}
            placeholder={
              selectedOption === "Mail"
                ? "Mail Me"
                : selectedOption === "Visit"
                ? "Visit My Website"
                : "Contact Me"
            }
          />
        </div>
        <div className="cta-url">
          <label htmlFor="cta-field" className="cta-button-label">
            {selectedOption === "Mail"
              ? "Email"
              : selectedOption === "Visit"
              ? "URL"
              : "Mobile Number"}
          </label>
          <input
            type="text"
            id="cta-field"
            value={data}
            onChange={(e) => handleInputChange(e)}
            className="cta-mobileno"
            name={
              selectedOption === "Mail"
                ? "mail"
                : selectedOption === "Visit"
                ? "url"
                : "mobile"
            }
          />
        </div>
        <TwoButton onSave={handleSubmit} />
      </div>
    </>
  );
};

export default Ctabutton;
