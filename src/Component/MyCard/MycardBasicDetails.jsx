import React, { useContext, useState } from "react";
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
}) => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const [borderStyle, setBorderStyle] = useState(
    userData?.card?.style ? "circle" : "square"
  );
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

  //edit api
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    values: {
      name: userData?.card?.name,
      jobtitle: userData?.card?.jobtitle || "",
      company: userData?.card?.company || "",
      location: userData?.card?.location || "",
      bio: userData?.card?.bio || "",
    },
  });
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("jobtitle", data.jobtitle);
      formData.append("company", data.company);
      formData.append("location", data.location);
      formData.append("bio", data.bio);
      formData.append("profileStyle", borderStyle);

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
    } catch (error) {
      console.error("Error updating data:", error);
      alert(error.response?.data?.error || "Failed to update data");
    }
  };

  return (
    <>
      <div className="basic-detail-scroll">
        {/* Upload section */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="upload-section-container">
            <div className="upload-box">
              <p className="my-topheading">Profile Picture</p>
              <div className={`upload-area ${borderStyle}`}>
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  {...register("profileimg")}
                  onChange={handleImageUpload}
                />
                <label htmlFor="profile-upload">
                  <img
                    className="upload-icon"
                    src={uploadimg}
                    alt="upload img"
                  />
                </label>
              </div>
              <p className="my-small">(Use: 450x450 pixel)</p>
              <div className="style-options">
                <label>
                  Circle
                  <input
                    type="radio"
                    name="profileStyle"
                    value="circle"
                    checked={borderStyle === "circle"}
                    onChange={() => setBorderStyle("circle")}
                  />
                </label>
                <label>
                  Square
                  <input
                    type="radio"
                    name="profileStyle"
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
                  {...register("coverimg")}
                  onChange={handleCoverPhotoUpload}
                />
                <label htmlFor="cover-upload">
                  <img
                    className="upload-icon"
                    src={uploadimg}
                    alt="upload img"
                  />
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
                  {...register("logoimg")}
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
            <div className="my-fullwidth">
              <label>Name</label>

              <input
                type="text"
                // value={userData?.card?.name}
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
                required
              />
            </div>
            <div className="my-fullwidth">
              <label>Job Title</label>
              <input
                type="text"
                // value={userData?.card?.jobtitle}
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
                // value={userData?.card?.company}
                {...register("company", { required: "Company is required" })}
                required
              />
            </div>
            <div className="my-fullwidth">
              <label>Location</label>
              <input
                type="text"
                placeholder="Enter your location"
                // value={userData?.card?.location}
                {...register("location", { required: "Location is required" })}
                required
              />
            </div>
            <div className="my-fullwidth">
              <label>Bio</label>
              <textarea
                className="my-txtarea"
                name="bio"
                // value={formData.bio}
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
