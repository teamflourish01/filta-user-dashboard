import React, { useContext, useState } from "react";
import "./VoiceMessage.css";
import voiceImg from "../../images/voice_image.png";
import uplodImg from "../../images/uploadimg.png";
import playImg from "../../images/play.svg";
import waveImg from "../../images/Waveform.png";
import spikrImg from "../../images/spiker.png";
import dltImg from "../../images/voice_dlt.png";
import TwoButton from "./TwoButton";
import userContext from "../../context/userDetails";
import axios from "axios";


const VoiceMessage = () => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const [voiceFiles, setVoiceFiles] = useState([]);
  const uri = process.env.REACT_APP_DEV_URL;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVoiceFiles([file]);
  };

  const handleSubmit = async () => {
    if (voiceFiles.length === 0) {
      alert("Please select at least one voice file.");
      return;
    }

    const formData = new FormData();
    formData.append("voice", voiceFiles[0]);

    try {
      const response = await axios.post(`${uri}/voice/addvoice`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: AuthorizationToken,
        },
      });
      alert(`${response?.data?.message}`);
      getUserData();
      setVoiceFiles([]);
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      alert("Failed to upload voice files.");
    }
  };
  const handleCancel = () => {
    setVoiceFiles([]);
    alert("Action canceled");
  };
  const handleDeleteLink = async (linkId) => {
    console.log("platfrom id", linkId);

    try {
      const response = await fetch(`${uri}/voice/deletevoice/${linkId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
      });

      const data = await response.json();
      if (response.ok) {
        // Remove the deleted link from the state
        
        alert(`${data?.message}`);
        getUserData();
      } else {
        alert(data.message || "Failed to delete voice.");
      }
    } catch (error) {
      console.error("Error deleting voice:", error);
    }
  };

const   VoiceMessage = () => {

  return (
    <>
      <div className="vm-margin">
        <span className="mlt-title">Info : </span>
        <span className="mlt-desc">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </span>
        <div className="vm-detailbox">
          <p className="vm-upload-title">Upload Or add voice</p>
          <div className="vm-twoimg">
            <div className="vm-vimg">
              <input type="file" className="vm-infile" />
              <img src={voiceImg} alt="vs-img" />
            </div>
            <div className="vm-upimg">
              <input
                type="file"
                className="vm-infile"
                accept="audio/*"
                onChange={handleFileChange}
              />
              <img src={uplodImg} alt="up-img" />
            </div>
          </div>
          <div className="vm-msgbox">
            <div className="vm-plyimgbox">
              <img src={playImg} alt="ply-img" />
            </div>
            <img src={waveImg} alt="wave-img" />
            <p className="vm-time">0:05</p>
            <div className="vm-spkbox">
              <img src={spikrImg} alt="spk-img" />
            </div>
            <div className="vm-spkbox">
              <img src={dltImg} alt="dlt-img" />
            </div>
          </div>
          <TwoButton onSave={handleSubmit} onCancel={handleCancel} />
        </div>
      </div>
    </>
  );
};
export default VoiceMessage;
