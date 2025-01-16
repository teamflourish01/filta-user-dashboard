import React, { useContext, useEffect, useState } from "react";
import "./Multimedia.css";
import uploadimg from "../../images/uploadimg.png";
import deltImg from "../../images/delete.png";
import userContext from "../../context/userDetails";
import axios from "axios";

const MultimediaComponent = () => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;
  const [docFiles, setDocFiles] = useState([]);
  const [youtubeUrls, setYoutubeUrls] = useState([""]);
  const [deletedUrls, setDeletedUrls] = useState([]);
  const [deletedVideos, setDeletedVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setDocFiles((prev) => [...prev, ...newFiles]);
    event.target.value = null;
  };
  const handleYoutubeUrlChange = (index, value) => {
    const updatedUrls = [...youtubeUrls];
    updatedUrls[index] = value;
    setYoutubeUrls(updatedUrls);
  };
  const handleAddMore = () => {
    setYoutubeUrls((prev) => [...prev, ""]);
  };
  const handleRemoveUrl = (index) => {
    setDeletedUrls((prev) => [...prev, youtubeUrls[index]]);
    setYoutubeUrls((prev) => prev.filter((_, i) => i !== index));
  };
  const handleRemoveFile = (index) => {
    setDeletedVideos((prev) => [...prev, docFiles[index].file]);
    setDocFiles((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    docFiles.forEach((doc) => {
      formData.append("video_file", doc.file);
    });
    // const processedYoutubeUrls = youtubeUrls
    //   .filter((url) => url.trim() !== "")
    //   .map((url) => {
    //     const parts = url.split("=");
    //     return parts.length > 1 ? parts[1] : "";
    //   });
    const filteredYoutubeUrls = youtubeUrls.filter((url) => url.trim() !== "");
    formData.append("youtube_url", JSON.stringify(filteredYoutubeUrls));    
    formData.append("deleted_urls", JSON.stringify(deletedUrls));
    formData.append("deleted_videos", JSON.stringify(deletedVideos));
    try {
      const response = await axios.post(`${uri}/multimedia/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: AuthorizationToken,
        },
      });

      alert(`${response?.data?.msg}`);
      setDocFiles([]);
      setYoutubeUrls([""]);
      setDeletedUrls([]);
      setDeletedVideos([]);
      getUserData();
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      alert(error.response.data.msg || "Failed to Multimedia Upload.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData && userData.multimedia && userData.multimedia.length > 0) {
      const multimediaData = userData.multimedia[0];
      const videoFiles = multimediaData.video_file.map((file) => ({
        file,
        preview: `${uri}/multimedia/${file}`,
      }));
      setDocFiles(videoFiles);

      setYoutubeUrls(multimediaData.youtube_url || [""]);
    }
  }, [userData, uri]);
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
            {docFiles.map((doc, index) => (
              <div key={index} className="mlt-uplodvideo">
                <video src={doc.preview}></video>
                <div
                  className="mlt-deltbtn"
                  onClick={() => handleRemoveFile(index)}
                >
                  <img src={deltImg} alt="delet-btn" />
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div className="mlt-urlform">
            <p className="mlt-urltitle">YouTube Video</p>
            <p className="mlt-url">YouTube URL</p>
            {youtubeUrls.map((url, index) => (
              <div key={index} className="mlt-inputbox">
                <input
                  type="text"
                  name="youtube_url_${index}"
                  value={url}
                  onChange={(e) =>
                    handleYoutubeUrlChange(index, e.target.value)
                  }
                />
                {youtubeUrls.length > 1 && (
                  <button
                    type="button"
                    className=""
                    onClick={() => handleRemoveUrl(index)}
                  >
                    <img src={deltImg} alt="delet-btn" />
                  </button>
                )}
              </div>
            ))}
            <div className="mlt-btnmain">
              <div className="mlt-addmorebtn" onClick={handleAddMore}></div>
              <div className="mlt-twobtn">
                <button
                  type="button"
                  className="mlt-cancel"
                  onClick={() => {
                    setDocFiles([]);
                    setYoutubeUrls([""]);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="mlt-save" disabled={loading}>
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MultimediaComponent;
