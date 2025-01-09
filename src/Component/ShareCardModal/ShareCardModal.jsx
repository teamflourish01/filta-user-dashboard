import React from "react";
import { CgClose } from "react-icons/cg";
import "../ShareCardModal/ShareCardModal.css";
import scannerpic from "../../images/scannerpic.svg";

const ShareCardModal = ({ onClose }) => {
  return (
    <>
      <div className="modal-container-sharedCard">
        <div className="modal-content-sharedCard">
          <div className="close-btn-flex">
            <div className="share-card-title">Share Card</div>
            {/* Modal content here */}
            <CgClose onClick={onClose} />
          </div>
          <div className="scan-download-qr">
            <p className="scan-qr-code-title">Scan QR Code</p>
            <img src={scannerpic} alt="" />
            <div className="scanner-download-s-c">Download QR Code</div>
          </div>
          <div className="copy-link-flex-s-c">
            <p className="copy-link-text">
              Copy Link and Share it with anyone.
            </p>
            <div className="flex-input-copy">
              <input type="text" name="name" />
              <button className="copy-btn">Copy</button>
            </div>
            <div className="or-bg-w">Or</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareCardModal;
