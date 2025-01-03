import React, { useContext, useEffect, useState } from "react";
import uploadimg from "../../images/uploadimg.png";
import TwoButton from "./TwoButton";
import userContext from "../../context/userDetails";
import { useForm } from "react-hook-form";
import axios from "axios";

const BasicDetails = ({
  onFormDataChange,
  onProfileImageChange,
  onCoverPhotoChange,
  onLogoChange,
  borderStyle,
  setBorderStyle,
  profileImages,
  coverPhoto,
  logo,
  register,
  handleSubmit,
  error,
}) => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;
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

  const onSubmit = async (data) => {
    try {
      debugger;
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("jobtitle", data.jobtitle);
      formData.append("company", data.company);
      formData.append("location", data.location);
      formData.append("bio", data.bio);
      formData.append("style", borderStyle);
      console.log(borderStyle, "borderStyle bhhn");

      if (data.profileimg[0]) {
        formData.append("profileimg", data.profileimg[0]);
      }
      if (data.coverimg[0]) {
        formData.append("coverimg", data.coverimg[0]);
      }
      if (data.logoimg[0]) {
        formData.append("logoimg", data.logoimg[0]);
      }

      const response = await axios.patch(`${uri}/card/editcard`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: AuthorizationToken,
        },
      });

      alert(response.data.msg || "Data updated successfully!");
      getUserData();
      console.log(userData.card.style, "vddf");
    } catch (error) {
      console.error("Error updating data:", error);
      alert(error.response?.data?.error || "Failed to update data");
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="basic-detail-scroll">
        {/* Upload section */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="upload-section-container">
            <div className="upload-box">
              <p className="my-topheading">Profile Picture</p>
              <div
                className={`upload-area ${borderStyle ? "circle" : "square"}`}
              >
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  {...register("profileimg")}
                  onChange={handleImageUpload}
                />
                {userData?.card?.profileimg ? (
                  <img
                    className="bsd-profile-img"
                    src={
                      profileImages
                        ? profileImages
                        : `${uri}/card/${userData?.card?.profileimg}`
                    }
                    alt="Profile-img"
                  />
                ) : (
                  <img
                    className="upload-icon "
                    src={profileImages ? profileImages : uploadimg}
                    alt="Upload Imag"
                  />
                )}
              </div>
              <p className="my-small">(Use: 450x450 pixel)</p>
              <div className="style-options">
                <label>
                  Circle
                  <input
                    type="radio"
                    name="style"
                    value={true}
                    checked={borderStyle}
                    onChange={() => setBorderStyle(true)}
                  />
                </label>
                <label>
                  Square
                  <input
                    type="radio"
                    name="style"
                    value={false}
                    checked={!borderStyle}
                    onChange={() => setBorderStyle(false)}
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
                  {...register("coverimg")}
                  onChange={handleCoverPhotoUpload}
                />

                {userData?.card?.coverimg ? (
                  <img
                    className="bsd-cover-img"
                    src={
                      coverPhoto
                        ? coverPhoto
                        : `${uri}/card/${userData?.card?.coverimg}`
                    }
                    alt="Profile Imag"
                  />
                ) : (
                  <img
                    className="upload-icon "
                    src={coverPhoto ? coverPhoto : uploadimg}
                    alt="Upload Imag"
                  />
                )}
                {/* </label> */}
              </div>

              <p className="my-small">(Use: 780x300 pixel)</p>
            </div>
            <div className="upload-box">
              <p className="my-topheading">Company Logo</p>
              <div className="upload-area">
                <input
                  type="file"
                  id="logo-upload"
                  accept="image/*"
                  {...register("logoimg")}
                  onChange={handleLogoUpload}
                />

                {userData?.card?.logoimg ? (
                  <img
                    className="bsd-logo-img"
                    src={logo ? logo : `${uri}/card/${userData?.card?.logoimg}`}
                    alt="Profile Imag"
                  />
                ) : (
                  <img
                    className="upload-icon "
                    src={logo ? logo : uploadimg}
                    alt="Upload Imag"
                  />
                )}
                {/* </label> */}
              </div>

              <p className="my-small">(Use: 440x440 pixel)</p>
            </div>{" "}
          </div>
          <hr />
          <div className="my-allfiled">
            <div className="my-fullwidth">
              <label>Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
                required
              />
            </div>
            <div className="my-fullwidth">
              <label>Job Title</label>
              <input
                type="text"
                placeholder="Enter your job title"
                {...register("jobtitle", { required: "Job title is required" })}
                required
              />
            </div>
            <div className="my-fullwidth">
              <label>Company</label>
              <input
                type="text"
                placeholder="Enter your company"
                {...register("company", { required: "Company is required" })}
                required
              />
            </div>
            <div className="my-fullwidth">
              <label>Location</label>
              <input
                type="text"
                placeholder="Enter your location"
                {...register("location", { required: "Location is required" })}
                required
              />
            </div>
            <div className="my-fullwidth">
              <label>Bio</label>
              <textarea
                className="my-txtarea"
                name="bio"
                {...register("bio")}
                onChange={handleInputChange}
                placeholder="Enter your Bio"
              />
            </div>
            <div className="btnmargin-20">
              <TwoButton />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BasicDetails;
