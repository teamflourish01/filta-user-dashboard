import React, { useContext, useRef, useState } from "react";
import clrpiker from "../../images/desigin_clrpiker.png";
import qrplus from "../../images/qr_plus.png";
import axios from "axios";
import userContext from "../../context/userDetails";
import html2canvas from "html2canvas";

const QrcodeComponent = ({ selectedColor, onColorChange, onLogoChange }) => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qrPng, setQrPng] = useState(null);
  const ColorRef = useRef(null);
  const handleClrEdit = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleLogoChange = (file) => {
    setLogo(file);
    onLogoChange(file);
  };
  const generateQrPng = async () => {
    const element = document.querySelector(".qr-imgmain");
    if (element) {
      const canvas = await html2canvas(element, { useCORS: true });
      const dataURL = canvas.toDataURL("image/png");
      setQrPng(dataURL);
      return dataURL;
    }
    return null;
  };
  const handleSave = async () => {
    setLoading(true);
    const dataURL = await generateQrPng();
    const formData = new FormData();
    formData.append("qrcolor", selectedColor);
    formData.append("qrimage", logo);
    const blob = await (await fetch(dataURL)).blob();
    formData.append("qrpng", blob, "qrcode.png");

    console.log("FormData contains:", formData.get("qrcode"));
    console.log("qrPng", qrPng);

    try {
      const response = await axios.post(`${uri}/qr/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: AuthorizationToken,
        },
      });
      alert(`${response?.data?.message}`);
      getUserData();
    } catch (error) {
      console.error("Error saving QR code:", error);
      alert("An error occurred while saving QR code.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="di-margin delthight">
        <div className="di-seconedbox rmvmargin35">
          <div className="di-sectitle">
            <p>Edit QR Code</p>
          </div>
          <hr />
          <div className="di-secinfo">
            <p>Color</p>
            <form>
              <div className="di-fltbox">
                <div class="color-picker-container">
                  <div className="di-twoinput">
                    <input
                      type="text"
                      id="color-code"
                      placeholder="#000000"
                      value={selectedColor}
                      onChange={(e) => onColorChange(e.target.value)}
                    />

                    <input
                      type="color"
                      id="color-picker"
                      ref={ColorRef}
                      value={selectedColor}
                      onChange={(e) => onColorChange(e.target.value)}
                    />
                  </div>

                  <div
                    id="search-button"
                    onClick={() => handleClrEdit(ColorRef)}
                  >
                    <img src={clrpiker} alt="color piker" />
                  </div>
                </div>
              </div>
              <p>Add Logo </p>
              <div className="qr-logobox">
                <div className="qr-addlogo">
                  <input
                    type="file"
                    className="qr-logoinput"
                    accept="image/*"
                    onChange={(e) => handleLogoChange(e.target.files[0])}
                  />
                  <img src={qrplus} alt="qrplus" />
                  <p>Add Logo</p>
                </div>
              </div>
              <div className="di-buttons delpadding">
                <button type="button" className="di-cancel">
                  Cancel
                </button>
                <button
                  className="di-save"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Wait..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default QrcodeComponent;
