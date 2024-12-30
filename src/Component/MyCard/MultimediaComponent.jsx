import React, { useContext, useEffect, useState } from "react";
import "./Multimedia.css";
import uploadimg from "../../images/uploadimg.png";
import deltImg from "../../images/delete.png";
import axios from "axios";
import userContext from "../../context/userDetails";

const MultimediaComponent = () => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const [video, setVideo] = useState({});
  const [dataUrl, setDataUrl] = useState("");
  const [youtube, setYoutube] = useState("");
  
  const [data, setData] = useState([]);

  let url = process.env.REACT_APP_DEV_URL;

  const handleAdd = async (formData) => {
    try {
      let data = await axios.post(`${url}/multimedia/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: AuthorizationToken,
        },
      });
      console.log(data.data.data, "data");
      getUserData()
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (formData) => {
    try {
      let data = await axios.post(`${url}/multimedia/edit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: AuthorizationToken,
        },
      });
      console.log(data.data, "updated");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete=async(id)=>{
    try {
      let data=await fetch(`${url}/multimedia/delete/${id}`,{
        method: 'DELETE',
        headers:{
          Authorization: AuthorizationToken,
        }
      })
      data=await data.json()
      console.log(data,"deleted");
      getUserData()
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    console.log(video, "video");

      formData.append("multimedia", video);

    formData.append("youtube_url", youtube);

    handleAdd(formData)
    // if (userData?.multimedia?._id) {
    //   handleEdit(formData);
    // } else {
    //   handleAdd(formData);
    // }
  };

  const handleVideoChange = (e) => {
    let file = e.target.files[0];
    console.log(file, "file");
    setVideo(file);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setDataUrl( reader.result);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  useEffect(() => {
    getUserData();
    if(video){
    handleSubmit()

    }
  }, [video]);

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
        <div className="mlt-video">
          <div className="mlt-uplod">
            <input
              type="file"
              name="multimedia"
              onChange={(e) => handleVideoChange(e)}
            />
            <img src={uploadimg} alt="upload img" />
          </div>
          {userData?.multimedia?.map((e) => (
            <div className="mlt-uplodvideo">
              <div className="mlt-flex"></div>
              <video>
                <source src={`${url}/multimedia/${e.video_file}`} type="video/mp4" />
              </video>
              
              <div className="mlt-deltbtn" onClick={()=>handleDelete(e?._id)}>
                <img src={deltImg} alt="delet-btn" />
              </div>
            </div>
          ))}
        </div>
        <hr />
        <div className="mlt-urlform">
          <p className="mlt-urltitle">YouTube Video</p>
          <p className="mlt-url">YouTube URL</p>

          <div className="mlt-inputbox">
            <input type="text" required />
          </div>

          <div className="mlt-btnmain">
            <div className="mlt-addmorebtn"></div>
            <div className="mlt-twobtn">
              <button className="mlt-cancel">Cancel</button>
              <button className="mlt-save" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultimediaComponent;
