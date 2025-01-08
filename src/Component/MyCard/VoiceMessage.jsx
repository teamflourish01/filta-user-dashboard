import React, { useContext, useState, useRef } from "react";
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
  const [voiceFiles, setVoiceFiles] = useState([]); // For uploaded files
  const [audioRecords, setAudioRecords] = useState([]); // For recorded audio URLs
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const uri = process.env.REACT_APP_DEV_URL;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVoiceFiles([file]);
  };

  // Start recording audio
  const handleStartRecording = async () => {
    // Reset previous audio chunks
    audioChunksRef.current = [];

    // Request microphone access
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // If there's an existing mediaRecorder, stop it
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }

    // Reinitialize the MediaRecorder instance
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);

      // Save the new audio URL in the records array
      setAudioRecords((prevRecords) => [...prevRecords, audioUrl]);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  // Stop recording audio
  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Submit the audio file (via file input or recorded file)
  const handleSubmit = async () => {
    if (audioRecords.length === 0 && voiceFiles.length === 0) {
      alert("Please select or record at least one voice file.");
      return;
    }

    const formData = new FormData();
    // Use the first file in the voiceFiles array
    const file = voiceFiles.length > 0 ? voiceFiles[0] : audioRecords[0];
    formData.append("voice", file);

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
      alert("Failed to upload voice files.");
    }
  };

  const handleCancel = () => {
    setVoiceFiles([]);
    setAudioRecords([]);
    alert("Action canceled");
  };

  const handleDeleteAudio = (audioUrl) => {
    // Remove the deleted audio from the state
    setAudioRecords(audioRecords.filter((audio) => audio !== audioUrl));
  };

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
            <div
              className="vm-vimg"
              onClick={handleStartRecording} 
            >
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
          {isRecording && (
            <button onClick={handleStopRecording}>Stop Recording</button>
          )}

          {/* Display the list of all recorded audios */}
          {audioRecords.length > 0 && (
            <div className="vm-msgbox">
              {audioRecords.map((audioUrl, index) => (
                <div key={index} className="vm-record">
                  <div className="vm-plyimgbox">
                    <img src={playImg} alt="ply-img" />
                  </div>
                  <img src={waveImg} alt="wave-img" />
                  <p className="vm-time">0:05</p>
                  <div className="vm-spkbox">
                    <audio controls>
                      <source src={audioUrl} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <div
                    className="vm-spkbox"
                    onClick={() => handleDeleteAudio(audioUrl)}
                  >
                    <img src={dltImg} alt="dlt-img" />
                  </div>
                </div>
              ))}
            </div>
          )}

          <TwoButton onSave={handleSubmit} onCancel={handleCancel} />
        </div>
      </div>
    </>
  );
};

export default VoiceMessage;
