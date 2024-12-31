
import React, { useContext, useState } from "react";
import "./Multimedia.css";
import uploadimg from "../../images/uploadimg.png";
import deltImg from "../../images/delete.png";
import userContext from "../../context/userDetails";
import axios from "axios";

const MultimediaComponent = () => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;
  const [docFiles, setDocFiles] = useState([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setDocFiles((prev) => [...prev, ...newFiles]);
    event.target.value = null;
  };
  const handleYoutubeUrlChange = (e) => {
    setYoutubeUrl(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    docFiles.forEach((doc) => {
      formData.append("video_file", doc.file);
    });
    formData.append("youtube_url", JSON.stringify([youtubeUrl]));
    try {
      const response = await axios.post(`${uri}/multimedia/add`, formData, {

        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: AuthorizationToken,
        },
      });

      alert(`${response?.data?.msg}`);
      setDocFiles([]);
      setYoutubeUrl("");
      getUserData();
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      alert("Failed to Multimedia Upload.");
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
        <p className="mlt-vdtitle">Upload Video</p>

        <form onSubmit={handleSubmit}>
          <div className="mlt-video">
            <div className="mlt-uplod">
              <input type="file" onChange={handleFileChange} />
              <img src={uploadimg} alt="upload img" />
            </div>
            <div className="mlt-uplodvideo">
              <video src=""></video>
              <div className="mlt-deltbtn">
                <img src={deltImg} alt="delet-btn" />
              </div>
            </div>
          </div>
          <hr />
          <div className="mlt-urlform">
            <p className="mlt-urltitle">YouTube Video</p>
            <p className="mlt-url">YouTube URL</p>

            <div className="mlt-inputbox">
              <input
                type="text"
                name="youtube_url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
            </div>

            <div className="mlt-btnmain">
              <div className="mlt-addmorebtn"></div>
              <div className="mlt-twobtn">
                <button className="mlt-cancel">Cancel</button>
                <button className="mlt-save">Save</button>
              </div>
            </div>
          </div>
        </form>

      </div>
    </>
  );
};

export default MultimediaComponent;
