import React, { useState, useEffect, useContext, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import qrLogoImg from "../../images/qrlogoImg.png";
import userContext from "../../context/userDetails";
import html2canvas from "html2canvas";
import axios from "axios";

const QrcodeGen = ({ selectedColor, logo }) => {
  const { userData,getUserData,AuthorizationToken } = useContext(userContext);
  const furi = process.env.REACT_APP_FRNT_URL;
  const [qrData, setQrData] = useState(
    `${furi}/card/${userData?.username}`
  );
  const [logoUrl, setLogoUrl] = useState(null);
  const [qrPng, setQrPng] = useState(null);
  const uri = process.env.REACT_APP_DEV_URL;  

  const handleDownload = async () => {
    const element = document.querySelector(".qr-imgdiv");
    if (element) {
      try {
        const canvas = await html2canvas(element, { useCORS: true });
        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "Qrcode.png";
        link.click();
      } catch (error) {
        console.error("Error generating the image:", error);
      }
    }
  };
  useEffect(() => {
    if (userData?.qrcode?.qrimage) {
      setLogoUrl(`${uri}/qrcodelogo/${userData.qrcode.qrimage}`);
    } else {
      setLogoUrl(null);
    }
  }, [userData]);
  const generateQrPng = async () => {
    const element = document.querySelector(".qr-imgdiv");
    if (element) {
      const canvas = await html2canvas(element, { useCORS: true });
      const dataURL = canvas.toDataURL("image/png");
      setQrPng(dataURL);
      return dataURL;
    }
    return null;
  };
  useEffect(() => {
    const autoSave = async () => {
      const dataURL = await generateQrPng();
      const formData = new FormData();
      const blob = await (await fetch(dataURL)).blob();
      formData.append("qrpng", blob, "qrcode.png");
      try {
        const response = await axios.post(`${uri}/qr/addauto`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: AuthorizationToken,
          },
        });
        // alert(`API automatically called: ${response?.data?.message}`);
        getUserData();
      } catch (error) {
        console.error("Error saving QR code:", error);
        alert(error.response?.data.message || "Auto QR Not Store");
      }
    };
    if (!userData?.qrcode?.qrpng) {
      autoSave();
    }
  }, []);

  const logoSrc = logo
    ? logo
    : userData?.qrcode?.qrimage
    ? `${uri}/qrcodelogo/${userData.qrcode.qrimage}`
    : qrLogoImg;
  return (
    <>
      <div className="qr-code-panel">
        <p>QR Code </p>

        {/* QR Code Section */}
        <div className="qr-imgmain">
          {qrData ? (
            <div className="qr-imgdiv">
              <QRCodeCanvas
                className="qrimg"
                value={qrData}
                bgColor="#ffffff"
                fgColor={selectedColor || "#ffffff"}
                level="H"
              />
              {/* Logo Overlay */}
              <img className="qrlogo" src={logoSrc} alt="logo-img" />
            </div>
          ) : (
            <p>No QR Code Generated Yet</p>
          )}
        </div>
        <a href="#" className="qr-downloadbtn" onClick={handleDownload}>
          Download
        </a>
      </div>
    </>
  );
};

export default QrcodeGen;
