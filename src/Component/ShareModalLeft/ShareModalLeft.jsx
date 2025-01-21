import React, { useContext, useEffect, useRef } from "react";
import { CgClose } from "react-icons/cg";
import "../ShareModalLeft/ShareModalLeft.css";
import scannerpic from "../../images/scannerpic.svg";
import { IoShareOutline } from "react-icons/io5";
import userContext from "../../context/userDetails";
import gsap from "gsap";

const ShareModalLeft = ({ onClose, isShareModalOpen }) => {
  const {
    userData,
    AuthorizationToken,
    getUserData,
    userDetails,
    getLoginEmail,
  } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;

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
    const inputValue = `${uri}/card/${userData?.username}`;
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
        height: "665px",
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
        className={`modal-content-sharedCard-l ${
          isShareModalOpen ? "active" : ""
        }`}
        ref={modalRef}
      >
        <div className="close-btn-flex-l">
          <div className="share-card-title-l">Share Card</div>
          <div className="close-btn-animation-l">
            <CgClose onClick={onClose} />
          </div>
        </div>
        <div className="scan-download-qr-l">
          <p className="scan-qr-code-title-l">Scan QR Code</p>
          <img
            style={{ width: "262px", height: "260px" }}
            src={`${uri}/qrcodelogo/${userData?.qrcode?.qrpng}`}
            alt=""
          />
          {/* <div className="scanner-download-s-c">Download QR Code</div> */}
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

          <div className="scanner-download-s-c-l" onClick={downloadQRCode}>
            Download QR Code
          </div>
        </div>
        <div className="copy-link-flex-s-c-l">
          <p className="copy-link-text-l">Copy Link and Share it with anyone.</p>
          <div className="flex-input-copy-l">
            <input
              type="text"
              name="name"
              value={`${uri}/card/${userData?.username}`}
              readOnly
            />
            <button className="copy-btn-l" onClick={copyToClipboard}>
              Copy
            </button>
          </div>
          <div className="or-bg-w-l">Or</div>
        </div>
        <div className="btn-center-flex-share-l">
          <div className="share-via-btn-l">
            <p className="share-via-txt-l">Share Via</p>
          </div>
          <div className="share-arrow-l">
            <IoShareOutline />
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default ShareModalLeft;
