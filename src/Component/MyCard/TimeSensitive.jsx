import React, { useContext, useState } from "react";
import TwoButton from "./TwoButton";
import userContext from "../../context/userDetails";
import axios from "axios";
import uploadimg from "../../images/uploadimg.png";
import deltImg from "../../images/delete.png";
import sampleImg from "../../images/photos-uplodimg.png";
const TimeSensitive = () => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;
  const [docFiles, setDocFiles] = useState([]);
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
      const response = await axios.delete(`${uri}/timesoffer/delete`, {
        params: { photoId, imageUrl },
      });

      alert(`${response?.data?.msg}`);
      getUserData();
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      alert("Failed to Times photo delete.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    docFiles.forEach((doc) => {
      formData.append("image", doc.file);
    });
    try {
      const response = await axios.post(`${uri}/timesoffer/add`, formData, {
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
      alert(
        error.response?.data.msg || "Subscribe Plan | Failed to Img Upload."
      );
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
        <p className="ph-vdtitle">Upload Image</p>
        <form onSubmit={handleSubmit}>
          <div className="ph-imagesUpload">
            <div className="ph-uplod to-uploddiv">
              <input type="file" onChange={handleFileChange} accept="image/*" />
              <img src={uploadimg} alt="upload img" />
            </div>
            <div className="ph-uplodimg">
              {docFiles.length > 0 &&
                docFiles.map((doc, index) => (
                  <div key={index} className="ph-uplodimg to-uplod">
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
              {userData?.timeoffer?.length > 0 &&
                userData.timeoffer.map((photo, index) => (
                  <div key={index} className="ph-uplodimg">
                    {photo.image.map((imageUrl, imgIndex) => (
                      <div key={imgIndex} className="ph-uplodimg to-uplod">
                        <img
                          src={`${uri}/timesoffer/${imageUrl}`}
                          alt={`Uploaded ${imgIndex + 1}`}
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

          <div style={{ borderTop: "1px solid #0000000D" }}></div>
          <div style={{ padding: "15px" }}>
            <TwoButton />
          </div>
        </form>
      </div>
    </>
  );
};

export default TimeSensitive;
