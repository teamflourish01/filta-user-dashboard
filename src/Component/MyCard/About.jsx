import React, { useContext, useState } from "react";
import TwoButton from "./TwoButton";
import axios from "axios";
import userContext from "../../context/userDetails";

const About = () => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const [formData, setFormData] = useState({
    title: userData?.about?.title || "",
    description: userData?.about?.description || "",
  });
  const uri = process.env.REACT_APP_DEV_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${uri}/about/addabout`,
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
      <div className="vm-margin" style={{ padding: 0 }}>
        <div className="mlt-info">
          <span className="mlt-title">Info : </span>
          <span className="mlt-desc">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </span>
        </div>
        <div className="cont-formdiv">
          <form onSubmit={handleSave}>
            <div className="cont-forminput">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="cont-forminput">
              <label>Description</label>
              <textarea
                className="cont-txtarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="cont-btnmargin">
              <TwoButton />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default About;
