import React, { useContext, useState, useRef } from "react";
import "./VoiceMessage.css";
import voiceImg from "../../images/voice_image.png";
import uplodImg from "../../images/uploadimg.png";
import { IoMdPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import waveImg from "../../images/Waveform.png";
import dltImg from "../../images/voice_dlt.png";
import TwoButton from "./TwoButton";
import userContext from "../../context/userDetails";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { GoUnmute } from "react-icons/go";
import { GoMute } from "react-icons/go";
import axios from "axios";

const VoiceMessage = ({ onPassToMobile }) => {
  const { AuthorizationToken, getUserData } = useContext(userContext);
  const [voiceFiles, setVoiceFiles] = useState([]); // For uploaded files
  const [audioRecords, setAudioRecords] = useState([]); // For recorded audio
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [play, setPlay] = useState(false);
  const [audio, setAudio] = useState(null);
  const audioChunksRef = useRef([]);
  const uri = process.env.REACT_APP_DEV_URL;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVoiceFiles([file]);
    }
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioFile = new File([audioBlob], "recording.wav", {
          type: "audio/wav",
        });
        setAudioRecords((prevRecords) => [...prevRecords, audioFile]);
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Failed to start recording. Please check microphone permissions.");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async () => {
    if (audioRecords.length === 0 && voiceFiles.length === 0) {
      alert("Please select or record at least one voice file.");
      return;
    }

    const formData = new FormData();
    const fileToUpload = voiceFiles[0] || audioRecords[0];
    formData.append("voice", fileToUpload);

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
      setAudioRecords([]);
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      alert(error.response?.data.message ||"Subscribe Plan");
    }
  };

  const handleCancel = () => {
    setVoiceFiles([]);
    setAudioRecords([]);
    alert("Action canceled");
  };

  const handleDeleteAudio = (audioFile) => {
    setAudioRecords(audioRecords.filter((audio) => audio !== audioFile));
  };

  const handlePlayPause = (audioFile) => {
    if (play && audio) {
      audio.pause();
      setPlay(false);
    } else {
      const newAudio = new Audio(URL.createObjectURL(audioFile));
      setAudio(newAudio);
      newAudio.play();
      newAudio.onended = () => {
        setPlay(false);
      };
      setPlay(true);
    }
  };

  const handleMuteUnmute = () => {
    if (audio) {
      audio.muted = !muted;
      setMuted(!muted); // Toggle mute state
    }
  };

  return (
    <div className="vm-margin">
      <span className="mlt-title">Info : </span>
      <span className="mlt-desc">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout.
      </span>
      <div className="vm-detailbox">
        <p className="vm-upload-title">Upload or Add Voice</p>
        <div className="vm-twoimg">
          <div
            className="vm-vimg"
            onClick={isRecording ? handleStopRecording : handleStartRecording}
          >
            {isRecording ? (
              <img src={voiceImg} alt="Recording in progress" />
            ) : (
              <AiOutlineAudioMuted
                style={{ width: "25px", height: "25px", color: "#777879" }}
              />
            )}
          </div>
          <div className="vm-upimg">
            <input
              type="file"
              className="vm-infile"
              accept="audio/*"
              onChange={handleFileChange}
            />
            <img src={uplodImg} alt="Upload icon" />
          </div>
        </div>

        {audioRecords.length > 0 && (
          <div className="vm-msgbox">
            {audioRecords.map((audioFile, index) => (
              <div key={index} className="vm-record">
                <div className="vm-plyimgbox" onClick={() => handlePlayPause(audioFile)}>
                  {play ? (
                    <IoMdPause style={{ color: "white" }} />
                  ) : (
                    <FaPlay style={{ color: "white" }} />
                  )}
                </div>
                <div className="wave-audio-file">
                  <img src={waveImg} alt="wave-img" />
                </div>
                <div className="audio-time">
                  <p>0:05</p>
                </div>
                <div className="mute-unmute-audio">
                  <button onClick={handleMuteUnmute}>
                    {muted ? <GoMute /> : <GoUnmute />}
                  </button>
                </div>
                <div className="delete-audio">
                  <button onClick={() => handleDeleteAudio(audioFile)}>
                    <img src={dltImg} alt="" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <TwoButton onSave={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default VoiceMessage;
