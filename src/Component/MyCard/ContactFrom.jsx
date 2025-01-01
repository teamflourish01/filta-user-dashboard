import React, { useContext, useEffect, useState } from "react";
import "./ContactForm.css";
import TwoButton from "./TwoButton";
import { useForm } from "react-hook-form";
import axios from "axios";
import userContext from "../../context/userDetails";

const ContactForm = ({ onSelectedFieldsChange }) => {
  const { AuthorizationToken } = useContext(userContext);
  const [formData, setFormData] = useState({
    loginemail: "",
    loginmessage: "",
  });


  const [selectedFields, setSelectedFields] = useState({
    name: false,
    email: true,
    number: false,
    // address: false,
    message: false,
  });

  // const handleCheckboxChange = (e) => {
  //   const { name, checked } = e.target;
  //   setSelectedFields((prevFields) => ({
  //     ...prevFields,
  //     [name]: checked,
  //   }));
  //   onSelectedFieldsChange({ ...selectedFields, [name]: checked });
  // };


  const [checkboxStates, setCheckboxStates] = useState({
    name: true,
    email: true,
    number: true,
    message: true,
  });


  const uri = process.env.REACT_APP_DEV_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCheckboxChange = async (field) => {
    const updatedState = !checkboxStates[field];
    setCheckboxStates((prevState) => ({
      ...prevState,
      [field]: updatedState,
    }));

    try {
      const response = await axios.post(
        `${uri}/email/add`,
        { [field]: updatedState },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthorizationToken,
          },
        }
      );
      alert(`${response?.data?.message}`);
    } catch (error) {
      console.error("Error toggling checkbox state:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${uri}/email/add`,
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthorizationToken,
          },
        }
      );
      alert(`${response?.data?.message}`);
    } catch (error) {
      console.error("Error saving About Data:", error);
    }
  };

  useEffect(() => {
    const getEmailMessage = async () => {
      try {
        const response = await fetch(`${uri}/email/gatemailmsg`, {
          method: "GET",
          headers: {
            Authorization: AuthorizationToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            loginemail: data.data[0]?.loginemail || "",
            loginmessage: data.data[0]?.loginmessage || "",
          });
          setCheckboxStates({
            name: data.data[0]?.name ?? true,
            email: data.data[0]?.email ?? true,
            number: data.data[0]?.number ?? true,
            message: data.data[0]?.message ?? true,
          });
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEmailMessage();
  }, [AuthorizationToken, uri]);
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

        <form onSubmit={handleSave}>
          <div className="cont-reqfiled">
            <p>Required Field </p>
            <div className="cont-chkbox">
              <div className="cont-chk">
                <input
                  type="checkbox"
                  checked={checkboxStates.name}
                  onChange={() => handleCheckboxChange("name")}
                />
                <label>Name</label>
              </div>
              <div className="cont-chk">
                <input
                  type="checkbox"
                  checked={checkboxStates.email}
                  onChange={() => handleCheckboxChange("email")}
                />
                <label>Email</label>
              </div>
              <div className="cont-chk">
                <input
                  type="checkbox"
                  checked={checkboxStates.number}
                  onChange={() => handleCheckboxChange("number")}
                />
                <label>Number</label>
              </div>
              {/* <div className="cont-chk">
                <input type="checkbox" />
                <label>Address</label>
              </div> */}
              <div className="cont-chk">
                <input
                  type="checkbox"
                  checked={checkboxStates.message}
                  onChange={() => handleCheckboxChange("message")}
                />
                <label>Message</label>
              </div>
            </div>
          </div>
          <hr />
          <div className="mlt-info">
            <span className="mlt-title">Responce : </span>
            <span className="mlt-desc">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </span>
          </div>
          <div className="cont-formdiv">

            <div className="cont-forminput">
              <label>Email</label>
              <input
                type="text"
                name="loginemail"
                value={formData.loginemail}
                onChange={handleInputChange}
              />
            </div>
            <div className="cont-forminput">
              <label>Message</label>
              <textarea
                className="cont-txtarea"
                name="loginmessage"
                value={formData.loginmessage}
                onChange={handleInputChange}
              />
            </div>
            <div className="cont-btnmargin">
              <TwoButton />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
