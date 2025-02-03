import React, { useState, useRef, useEffect, useContext } from "react";
import { MdOutlinePause } from "react-icons/md";
import { IoPlaySharp } from "react-icons/io5";
import { BiSolidVolumeMute } from "react-icons/bi";
import { IoMdVolumeHigh } from "react-icons/io";
import userContext from "../../context/userDetails";
import "../VoiceMessage/VoiceMessage.css";

const VoiceMessage = () => {
  const audioRefs = useRef([]); // Array to store refs for multiple audio elements
  const [isPlaying, setIsPlaying] = useState([]);
  const [isMuted, setIsMuted] = useState([]);
  const [durations, setDurations] = useState([]);
  const [currentTimes, setCurrentTimes] = useState([]);
  const [progresses, setProgresses] = useState([]);
  const { userData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;

  // Initialize states for each audio
  useEffect(() => {
    if (userData?.voiceMessage?.length) {
      setIsPlaying(new Array(userData.voiceMessage.length).fill(false));
      setIsMuted(new Array(userData.voiceMessage.length).fill(false));
      setDurations(new Array(userData.voiceMessage.length).fill("0:00"));
      setCurrentTimes(new Array(userData.voiceMessage.length).fill("0:00"));
      setProgresses(new Array(userData.voiceMessage.length).fill(0));
    }
  }, [userData]);

  // Play/Pause functionality
  const togglePlayPause = (index) => {
    const audio = audioRefs.current[index];
    const newIsPlaying = [...isPlaying];

    if (newIsPlaying[index]) {
      audio.pause();
    } else {
      audio.play();
    }

    newIsPlaying[index] = !newIsPlaying[index];
    setIsPlaying(newIsPlaying);
  };

  // Mute/Unmute functionality
  const toggleMute = (index) => {
    const audio = audioRefs.current[index];
    const newIsMuted = [...isMuted];
    audio.muted = !newIsMuted[index];
    newIsMuted[index] = !newIsMuted[index];
    setIsMuted(newIsMuted);
  };

  // Update duration and current time
  const updateAudioState = (index) => {
    const audio = audioRefs.current[index];
    const newDurations = [...durations];
    const newCurrentTimes = [...currentTimes];
    const newProgresses = [...progresses];

    // Update duration
    if (audio.duration && audio.duration !== Infinity) {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60);
      newDurations[index] = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    // Update current time
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    newCurrentTimes[index] = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    newProgresses[index] = (audio.currentTime / audio.duration) * 100;

    setDurations(newDurations);
    setCurrentTimes(newCurrentTimes);
    setProgresses(newProgresses);
  };

  const handleAudioEnd = (index) => {
    const newIsPlaying = [...isPlaying];
    const newCurrentTimes = [...currentTimes];
    const newProgresses = [...progresses];

    newIsPlaying[index] = false;
    newCurrentTimes[index] = "0:00";
    newProgresses[index] = 0;

    setIsPlaying(newIsPlaying);
    setCurrentTimes(newCurrentTimes);
    setProgresses(newProgresses);
  };

  const handleProgressClick = (e, index) => {
    const progressBar = e.target.closest(".progress-bar-container");
    const progressBarWidth = progressBar.offsetWidth;
    const offsetX = e.clientX - progressBar.getBoundingClientRect().left;

    const newProgress = (offsetX / progressBarWidth) * 100;
    const audio = audioRefs.current[index];
    const newTime = (audio.duration * newProgress) / 100;

    audio.currentTime = newTime;

    const minutes = Math.floor(newTime / 60);
    const seconds = Math.floor(newTime % 60);

    const newCurrentTimes = [...currentTimes];
    newCurrentTimes[index] = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    setCurrentTimes(newCurrentTimes);
    setProgresses((prev) => {
      const updatedProgresses = [...prev];
      updatedProgresses[index] = newProgress;
      return updatedProgresses;
    });
  };

  return (
    <div className="voice-message">
      {userData?.voiceMessage?.length > 0 ? (
        userData.voiceMessage.map((voiceMessage, index) => (
          <div key={index} className="voice-div">
            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              src={`${uri}/voices/${voiceMessage.voice}`}
              preload="auto"
              onTimeUpdate={() => updateAudioState(index)}
              onLoadedMetadata={() => updateAudioState(index)}
              onEnded={() => handleAudioEnd(index)}
              onCanPlayThrough={() => updateAudioState(index)}
            />
            <div className="play-pause-button">
              <button
                onClick={() => togglePlayPause(index)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                {isPlaying[index] ? (
                  <MdOutlinePause style={{ color: "white" }} />
                ) : (
                  <IoPlaySharp style={{ color: "white" }} />
                )}
              </button>
            </div>
            <div className="duration">
              {currentTimes[index]} / {durations[index]}
            </div>
            <div
              className="progress-bar-container"
              onClick={(e) => handleProgressClick(e, index)}
            >
              <div
                className="progress-bar"
                style={{
                  width: `${progresses[index]}%`,
                }}
              ></div>
              <div
                className="progress-dot"
                style={{
                  left: `${progresses[index]}%`,
                }}
              ></div>
            </div>
            {/* Frequency Container */}
            <div className="frequency-container">
              {isPlaying[index]
                ? // Animated bars when audio is playing
                  [...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="frequency-bar"
                      style={{
                        animationDelay: `${i * 0.2}s`,
                      }}
                    ></div>
                  ))
                : // Static dots when audio is not playing
                  [...Array(5)].map((_, i) => (
                    <div key={i} className="frequency-dot"></div>
                  ))}
            </div>
            <button
              className="volume-btn"
              onClick={() => toggleMute(index)}
              style={{
                border: "none",
                background: "transparent",
                display: "flex",
                cursor: "pointer",
              }}
            >
              {isMuted[index] ? (
                <BiSolidVolumeMute
                  style={{ color: "white", width: "22px", height: "22px" }}
                />
              ) : (
                <IoMdVolumeHigh
                  style={{ color: "white", width: "22px", height: "22px" }}
                />
              )}
            </button>
          </div>
        ))
      ) : (
        <p>No voice messages available.</p>
      )}
    </div>
  );
};

export default VoiceMessage;
