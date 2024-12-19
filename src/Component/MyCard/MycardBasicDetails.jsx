import React, { useState } from "react";
import uploadimg from "../../images/uploadimg.png";
import TwoButton from "./TwoButton";

const BasicDetails = ({
  onFormDataChange,
  onProfileImageChange,
  onCoverPhotoChange,
  onLogoChange,
}) => {
  const [borderStyle, setBorderStyle] = useState("circle");
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    company: "",
    location: "",
    bio: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    onFormDataChange({ [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onProfileImageChange(reader.result); // Notify parent of the new image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onCoverPhotoChange(reader.result); // Notify parent of the new cover photo
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onLogoChange(reader.result); // Notify parent of the new logo
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
    <div className="basic-detail-scroll">
      {/* Upload section */}
      <div className="upload-section-container">
        <div className="upload-box">
          <p className="my-topheading">Profile Picture</p>
          <div className={`upload-area ${borderStyle}`}>
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <label htmlFor="profile-upload">
              <img className="upload-icon" src={uploadimg} alt="upload img" />
            </label>
          </div>
          <p className="my-small">(Use: 450x450 pixel)</p>
          <div className="style-options">
            <label>
              Circle
              <input
                type="radio"
                name="borderStyle"
                value="circle"
                checked={borderStyle === "circle"}
                onChange={() => setBorderStyle("circle")}
              />
            </label>
            <label>
              Square
              <input
                type="radio"
                name="borderStyle"
                value="square"
                checked={borderStyle === "square"}
                onChange={() => setBorderStyle("square")}
              />
            </label>
          </div>
        </div>
        <div className="upload-box">
          <p className="my-topheading">Cover Photo</p>
          <div className="upload-area rectangle">
            <input
              type="file"
              id="cover-upload"
              accept="image/*"
              onChange={handleCoverPhotoUpload}
            />
            <label htmlFor="cover-upload">
              <img className="upload-icon" src={uploadimg} alt="upload img" />
            </label>
          </div>

          <p className="my-small">(Use: 780x300 pixel)</p>
        </div>
        <div className="upload-box">
          <p className="my-topheading">Company Logo</p>
          <div className="upload-area">
            <input
              type="file"
              id="logo-upload"
              onChange={onLogoChange}
              accept="image/*"
            />
            <label htmlFor="logo-upload">
              <img
                className="upload-icon"
                src={uploadimg}
                alt="upload img"
                accept="image/*"
                onChange={handleLogoUpload}
              />
            </label>
          </div>

          <p className="my-small">(Use: 440x440 pixel)</p>
        </div>{" "}
      </div>
      <hr />
      <div className="my-allfiled">
        <form>
          <div className="my-fullwidth">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              name="name"
              required
            />
          </div>
          <div className="my-fullwidth">
            <label>Job Title</label>
            <input
              type="text"
              placeholder="Enter your job title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="my-fullwidth">
            <label>Company</label>
            <input
              type="text"
              placeholder="Enter your company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="my-fullwidth">
            <label>Location</label>
            <input
              type="text"
              placeholder="Enter your location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="my-fullwidth">
            <label>Bio</label>
            <textarea
              className="my-txtarea"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Enter your Bio"
            />
          </div>
          <div className="btnmargin-20">
            <TwoButton />
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default BasicDetails;
