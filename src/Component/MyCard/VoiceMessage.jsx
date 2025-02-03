import React, { useContext, useState, useRef, useEffect } from "react";
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
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const [voiceFiles, setVoiceFiles] = useState([]); // For uploaded files
  const [audioRecords, setAudioRecords] = useState([]); // For recorded audio
  const [audioDurations, setAudioDurations] = useState({});
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
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioRecords((prevRecords) => [...prevRecords, { file: audioFile, url: audioUrl }]);
        fetchAudioDuration(audioUrl, audioFile.name);
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
    const fileToUpload = voiceFiles[0] || audioRecords[0]?.file;
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
      alert(error.response?.data.message || "Subscribe Plan");
    }
  };

  const handleCancel = () => {
    setVoiceFiles([]);
    setAudioRecords([]);
    alert("Action canceled");
  };

  const handleDeleteAudio = (audioFile) => {
    setAudioRecords((prevAudioRecords) =>
      prevAudioRecords.filter((audio) => audio.file !== audioFile)
    );
  };
  const handleDeleteAudioDB = async (id) => {
    try {
      const response = await fetch(`${uri}/voice/deletevoice/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        alert(`${data?.message}`);
        getUserData();
      }
    } catch (error) {
      console.error("Error Voice Deliting", error);
    }
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
  const fetchAudioDuration = (url, id) => {
    const audioElement = new Audio(url);
  audioElement.preload = "metadata"; 
  audioElement.onloadedmetadata = () => {
    if (audioElement.duration === Infinity) {
      
      audioElement.currentTime = 1e101;
      audioElement.ontimeupdate = () => {
        audioElement.ontimeupdate = null;
        const duration = audioElement.duration;
        if (!isNaN(duration)) {
          setAudioDurations((prev) => ({
            ...prev,
            [id]: formatDuration(duration),
          }));
        }
        audioElement.currentTime = 0; 
      };
    } else {
      const duration = audioElement.duration;
      setAudioDurations((prev) => ({
        ...prev,
        [id]: formatDuration(duration),
      }));
    }
  };
  };
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  useEffect(() => {
    if (userData?.voiceMessage?.length > 0) {
      userData.voiceMessage.forEach((voiceMessage) => {
        const url = `${uri}/voices/${voiceMessage.voice}`;
        fetchAudioDuration(url, voiceMessage._id);
      });
    }
  }, [userData]);
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
            {audioRecords.map((audioRecord, index) => (
              <div key={index} className="vm-record">
                <div
                  className="vm-plyimgbox"
                  onClick={() => handlePlayPause(audioRecord.file)}
                >
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
                <p>{audioDurations[audioRecord.file.name] || "0:05"}</p>
                </div>
                <div className="mute-unmute-audio">
                  <button onClick={handleMuteUnmute}>
                    {muted ? <GoMute /> : <GoUnmute />}
                  </button>
                </div>
                <div className="delete-audio">
                  <button onClick={() => handleDeleteAudio(audioRecord.file)}>
                    <img src={dltImg} alt="" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {userData?.voiceMessage?.length > 0 && (
          <div className="vm-msgbox">
            {userData.voiceMessage.map((voiceMessage, index) => (
              <div key={index} className="vm-record">
                <div
                  className="vm-plyimgbox"
                  onClick={() => {
                    const audioUrl = `${uri}/voices/${voiceMessage.voice}`;
                    if (audio && audio.src === audioUrl) {
                      if (play) {
                        audio.pause();
                        setPlay(false);
                      } else {
                        audio.play();
                        setPlay(true);
                      }
                    } else {
                      if (audio) {
                        audio.pause();
                      }

                      const newAudio = new Audio(audioUrl);
                      setAudio(newAudio);
                      newAudio.play();
                      newAudio.onended = () => {
                        setPlay(false);
                      };
                      setPlay(true);
                    }
                  }}
                >
                  {audio &&
                  audio.src === `${uri}/voices/${voiceMessage.voice}` &&
                  play ? (
                    <IoMdPause style={{ color: "white" }} />
                  ) : (
                    <FaPlay style={{ color: "white" }} />
                  )}
                </div>
                <div className="wave-audio-file">
                  <img src={waveImg} alt="wave-img" />
                </div>
                <div className="audio-time">
                  <p>{audioDurations[voiceMessage._id] || "0:05"}</p>
                </div>
                <div className="mute-unmute-audio">
                  <button onClick={handleMuteUnmute}>
                    {muted ? <GoMute /> : <GoUnmute />}
                  </button>
                </div>
                <div className="delete-audio">
                  <button onClick={() => handleDeleteAudioDB(voiceMessage._id)}>
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
