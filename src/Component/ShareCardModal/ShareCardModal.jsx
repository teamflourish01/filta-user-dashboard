import React, { useContext } from "react";
import { CgClose } from "react-icons/cg";
import "../ShareCardModal/ShareCardModal.css";
import scannerpic from "../../images/scannerpic.svg";
import { IoShareOutline } from "react-icons/io5";
import userContext from "../../context/userDetails";

const ShareCardModal = ({ onClose }) => {
  const {
    userData,
    AuthorizationToken,
    getUserData,
    userDetails,
    getLoginEmail,
  } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-container-sharedCard")) {
      onClose();
    }
  };
  return (
    <>
      {/* <div className="modal-container-sharedCard" onClick={handleOutsideClick}> */}
        <div className="modal-content-sharedCard">
          <div className="close-btn-flex">
            <div className="share-card-title">Share Card</div>
            {/* Modal content here */}
            <CgClose onClick={onClose} />
          </div>
          <div className="scan-download-qr">
            <p className="scan-qr-code-title">Scan QR Code</p>
            {/* <img src={scannerpic} alt="" /> */}
            <img style={{width:"262px",height:"260px"}} src={`${uri}/qrcodelogo/${userData?.qrcode?.qrpng}`} alt="" />
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
