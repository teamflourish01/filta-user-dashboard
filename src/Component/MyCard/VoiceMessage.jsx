import React from "react";
import "./VoiceMessage.css";
import voiceImg from "../../images/voice_image.png";
import uplodImg from "../../images/uploadimg.png";
import playImg from "../../images/play.svg";
import waveImg from "../../images/Waveform.png";
import spikrImg from "../../images/spiker.png";
import dltImg from "../../images/voice_dlt.png";
import TwoButton from "./TwoButton";

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
              <input type="file" className="vm-infile" />
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
          <TwoButton />
        </div>
      </div>
    </>
  );
};
export default VoiceMessage;
