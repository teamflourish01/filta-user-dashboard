import React, { useContext, useState } from "react";
import "../../Component/MyCard/Photos.css";
import uploadimg from "../../images/uploadimg.png";
import deltImg from "../../images/delete.png";
import sampleImg from "../../images/photos-uplodimg.png";
import TwoButton from "./TwoButton";
import { SlArrowDown } from "react-icons/sl";
import userContext from "../../context/userDetails";
import axios from "axios";

const Photos = () => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [docFiles, setDocFiles] = useState([]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setDocFiles((prev) => [...prev, ...newFiles]);
    event.target.value = null;
  };
  const handleDeleteDbimg = async (photoId, imageUrl) => {
    try {
      const response = await axios.delete(`${uri}/photo/delete`, {
        params: { photoId, imageUrl },
      });

      alert(`${response?.data?.msg}`);
      getUserData();
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      alert(error.response.data.msg ||"Failed to delete photo.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    docFiles.forEach((doc) => {
      formData.append("image", doc.file);
    });

    try {
      const response = await axios.post(`${uri}/photo/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: AuthorizationToken,
        },
      });
      alert(`${response?.data?.msg}`);
      setDocFiles([]);
      getUserData();
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      alert("Failed to Img Upload.");
    }
  };
  const handleRemoveFile = (index) => {
    setDocFiles((prev) => prev.filter((_, i) => i !== index));
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

        <p className="ph-vdtitle">Upload Photos</p>
        <form onSubmit={handleSubmit}>
          <div className="ph-imagesUpload">
            <div className="ph-up-fixed">
              <div className="ph-uplod">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <img src={uploadimg} alt="upload img" />
              </div>
            </div>
            {/* <div className="ph-uploadimg-scroll"> */}
            <div className="ph-uploadimg-scroll">
              {docFiles.length > 0 &&
                docFiles.map((doc, index) => (
                  <div key={index} className="ph-uplodimg">
                    <img
                      src={doc.preview || sampleImg}
                      alt={`Preview ${index + 1}`}
                    />
                    <div
                      className="ph-deltbtn"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <img src={deltImg} alt="delete-btn" />
                    </div>
                  </div>
                ))}
              {userData?.photos?.length > 0 &&
                userData.photos.map((photo, index) => (
                  <div key={index} className="ph-uploadimg-flex">
                    {photo.image.map((imageUrl, imgIndex) => (
                      <div key={imgIndex} className="ph-uplodimg">
                        <img
                          src={`${uri}/photo/${imageUrl}`}
                          alt={`Uploaded ${imgIndex + 1}`}
                          className="img-photos-ph"
                        />
                        <div
                          className="ph-deltbtn"
                          onClick={() => handleDeleteDbimg(photo._id, imageUrl)}
                        >
                          <img src={deltImg} alt="delete-btn" />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
          <div className="ph-btnpadding">
            <TwoButton />
          </div>
        </form>
      </div>
    </>
  );
};

export default Photos;
