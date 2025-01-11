import React, { useState, useEffect, useContext, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import qrLogoImg from "../../images/qrlogoImg.png";
import userContext from "../../context/userDetails";
import html2canvas from "html2canvas";

const QrcodeGen = ({ selectedColor, logo  }) => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const [qrData, setQrData] = useState("");
  const [logoUrl, setLogoUrl] = useState(null);
  const uri = process.env.REACT_APP_DEV_URL;

  const handleDownload = async () => {
    const element = document.querySelector(".qr-imgmain");
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
    setQrData("http://192.168.1.12:3000/left-align");
  }, []);
  useEffect(() => {
    if (userData?.qrcode?.qrimage) {
      setLogoUrl(`${uri}/qrcodelogo/${userData.qrcode.qrimage}`);
    } else {
      setLogoUrl(null);
    }
  }, [userData]);
  const logoSrc = logo
    ? logo // Use the logo prop if provided
    : userData?.qrcode?.qrimage
    ? `${uri}/qrcodelogo/${userData.qrcode.qrimage}` // Use logo from database if available
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
              <img
                className="qrlogo"
                src={logoSrc}
                alt="logo-img"
              />
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
