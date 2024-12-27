import React, { useState, useRef, useEffect } from "react";
import udio from "../../images/sound.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
// import volume from "../images/volume.svg";
import { BiSolidVolumeMute } from "react-icons/bi";
import { IoMdVolumeHigh } from "react-icons/io";
import "../VoiceMessage/VoiceMessage.css";
import { IoPlaySharp } from "react-icons/io5";
import { IoPauseSharp } from "react-icons/io5";
import { MdOutlinePause } from "react-icons/md";

const VoiceMessage = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [progress, setProgress] = useState(1);
  const [isDragging, setIsDragging] = useState(false); // state to track dragging status

  // Play/Pause functionality
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Mute/Unmute functionality
  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Update duration and current time
  useEffect(() => {
    const audio = audioRef.current;

    const updateDuration = () => {
      if (audio.duration) {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        setDuration(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      }
    };

    const timeUpdateHandler = () => {
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60);
      setCurrentTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleAudioEnd = () => {
      setIsPlaying(false);
      setCurrentTime("0:00");
      setProgress(0);
    };

    // Add event listeners
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("timeupdate", timeUpdateHandler);
    audio.addEventListener("ended", handleAudioEnd);

    // Cleanup event listeners
    return () => {
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("timeupdate", timeUpdateHandler);
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, []);
  // Handle drag start
  const handleDragStart = (e) => {
    setIsDragging(true);
    // Prevent text selection during drag
    document.body.style.userSelect = "none";
  };

  // Handle dragging
  const handleDrag = (e) => {
    if (isDragging) {
      const progressBar = e.target.closest(".progress-bar-container");
      const progressBarWidth = progressBar.offsetWidth;
      const offsetX = e.clientX - progressBar.getBoundingClientRect().left;

      if (offsetX < 0) return;
      if (offsetX > progressBarWidth) return;

      const newProgress = (offsetX / progressBarWidth) * 100;
      setProgress(newProgress);
      const newTime = (audioRef.current.duration * newProgress) / 100;
      audioRef.current.currentTime = newTime;

      // Update current time as well
      const minutes = Math.floor(newTime / 60);
      const seconds = Math.floor(newTime % 60);
      setCurrentTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
    }
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    // Allow text selection again
    document.body.style.userSelect = "auto";
  };

  // Handle touch events for mobile devices
  const handleTouchMove = (e) => {
    if (isDragging) {
      const progressBar = e.target.closest(".progress-bar-container");
      const progressBarWidth = progressBar.offsetWidth;
      const offsetX =
        e.touches[0].clientX - progressBar.getBoundingClientRect().left;

      if (offsetX < 0) return;
      if (offsetX > progressBarWidth) return;

      const newProgress = (offsetX / progressBarWidth) * 100;
      setProgress(newProgress);
      const newTime = (audioRef.current.duration * newProgress) / 100;
      audioRef.current.currentTime = newTime;

      // Update current time as well
      const minutes = Math.floor(newTime / 60);
      const seconds = Math.floor(newTime % 60);
      setCurrentTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    // Prevent text selection during touch drag
    document.body.style.userSelect = "none";
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Allow text selection again
    document.body.style.userSelect = "auto";
  };
  const handleProgressClick = (e) => {
    const progressBar = e.target.closest(".progress-bar-container");
    const progressBarWidth = progressBar.offsetWidth;
    const offsetX = e.clientX - progressBar.getBoundingClientRect().left;

    const newProgress = (offsetX / progressBarWidth) * 100;
    setProgress(newProgress);

    const newTime = (audioRef.current.duration * newProgress) / 100;
    audioRef.current.currentTime = newTime;

    // Update current time display
    const minutes = Math.floor(newTime / 60);
    const seconds = Math.floor(newTime % 60);
    setCurrentTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
  };
  return (
    <div className="voice-message">
      <audio ref={audioRef} src={udio} preload="auto" />
      <div className="voice-div">
        <div className="play-pause-button">
          <button
            onClick={togglePlayPause}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {isPlaying ? (
              <MdOutlinePause style={{ color: "white" }} />
            ) : (
              <IoPlaySharp style={{ color: "white" }} />
            )}
          </button>
        </div>
        <div className="duration">
          {currentTime} / {duration}
        </div>
        <div
          className="progress-bar-container"
          style={{
            position: "relative",
            width: "100%",
            height: "5px",
            background: "#e1e1e1",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleProgressClick}
        >
          <div
            className="progress-bar"
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#595959",
              transition: "width 0.1s linear",
              margin: "0",
            }}
          ></div>
          {/* Draggable Dot */}
          <div
            className="progress-dot"
            style={{
              left: `${progress}%`, // Position the dot based on progress
            }}
          ></div>
        </div>


           <div className="frequency-container">
                    {isPlaying
                      ? // Animated bars when audio is playing
                        [...Array(5)].map((_, index) => (
                          <div
                            key={index}
                            className={`frequency-bar`}
                            style={{ animationDelay: `${index * 0.2}s` }}
                          ></div>
                        ))
                      : // Static dots when audio is not playing
                        [...Array(5)].map((_, index) => (
                          <div key={index} className="frequency-dot"></div>
                        ))}
                  </div> 
        <button
          className="volume-btn"
          onClick={toggleMute}
          style={{
            border: "none",
            background: "transparent",
            display: "flex",
            cursor: "pointer",
          }}
        >
          {isMuted ? (
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
    </div>
  );
};

export default VoiceMessage;
