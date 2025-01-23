import React, { useContext, useEffect, useRef } from "react";
import { CgClose } from "react-icons/cg";
import "../ShareCardModal/ShareCardModal.css";
import scannerpic from "../../images/scannerpic.svg";
import { IoShareOutline } from "react-icons/io5";
import userContext from "../../context/userDetails";
import gsap from "gsap";

const ShareCardModal = ({ onClose, isShareModalOpen }) => {
  const {
    userData,
    AuthorizationToken,
    getUserData,
    userDetails,
    getLoginEmail,
  } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;
  const furi= process.env.REACT_APP_FRNT_URL;

  const modalRef = useRef(null); // Reference to modal element
  const canvasRef = useRef(null); // Reference for the canvas

  // Function to download QR code using canvas
  const downloadQRCode = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Create a new image
    const img = new Image();
    img.crossOrigin = "anonymous"; // To avoid CORS issues
    img.src = `${uri}/qrcodelogo/${userData?.qrcode?.qrpng}`;

    img.onload = () => {
      // Set canvas size to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0);

      // Convert the canvas content to a data URL
      const dataURL = canvas.toDataURL("image/png");

      // Create a temporary <a> element to trigger the download
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = `QR_Code_${userData?.username || "card"}.png`;

      // Trigger the download
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  };
  // Handle outside click to close modal
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-container-sharedCard")) {
      onClose();
    }
  };

  // Copy link to clipboard
  const copyToClipboard = () => {
    const inputValue = `${furi}/card/${userData?.username}`;
    navigator.clipboard
      ?.writeText(inputValue)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  // Animate modal height based on modal open/close state
  useEffect(() => {
    if (isShareModalOpen) {
      gsap.to(modalRef.current, {
        height: "535px",
        duration: 1,
        ease: "power3.out",
      });
    } else {
      gsap.to(modalRef.current, {
        height: "0px",
        duration: 1,
        ease: "power3.in",
      });
    }
  }, [isShareModalOpen]);

  return (
    <>
      {/* <div className="modal-po-re"> */}
      <div
        className={`modal-content-sharedCard ${
          isShareModalOpen ? "active" : ""
        }`}
        ref={modalRef}
      >
        <div className="close-btn-flex">
          <div className="share-card-title">Share Card</div>
          <div className="close-btn-animation">
            <CgClose onClick={onClose} />
          </div>
        </div>
        <div className="scan-download-qr">
          <p className="scan-qr-code-title">Scan QR Code</p>
          <img
            style={{ width: "262px", height: "260px" }}
            src={`${uri}/qrcodelogo/${userData?.qrcode?.qrpng}`}
            alt=""
          />
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          <div className="scanner-download-s-c" onClick={downloadQRCode}>
            Download QR Code
          </div>{" "}
        </div>
        <div className="copy-link-flex-s-c">
          <p className="copy-link-text">Copy Link and Share it with anyone.</p>
          <div className="flex-input-copy">
            <input
              type="text"
              name="name"
              value={`${furi}/card/${userData?.username}`}
              readOnly
            />
            <button className="copy-btn" onClick={copyToClipboard}>
              Copy
            </button>
          </div>
          <div className="or-bg-w">Or</div>
        </div>
        <div className="btn-center-flex-share">
          <div className="share-via-btn">
            <p className="share-via-txt">Share Via</p>
          </div>
          <div className="share-arrow">
            <IoShareOutline />
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default ShareCardModal;
