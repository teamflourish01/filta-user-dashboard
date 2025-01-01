import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import qrLogoImg from "../../images/qrlogoImg.png";
const QrcodeGen = () => {
  const [url, setUrl] = useState("http://192.168.43.112:3000/left-align");
  const [qrData, setQrData] = useState("");
  const generateQrCode = () => {
    if (url) {
      setQrData(url); // Set the URL as QR code value
    } else {
      alert("Please enter a URL to generate the QR Code.");
    }
  };
  return (
    <>
      <div className="qr-code-panel">
        <p>QR Code Generator</p>

        {/* Input Fields */}
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ padding: "10px", margin: "5px" }}
          />          
          <button
            onClick={generateQrCode}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Generate QR Code
          </button>
        </div>

        {/* QR Code Section */}
        <div className="qr-imgmain">
          {qrData ? (
            <div className="qr-imgdiv">
              <QRCodeCanvas
                className="qrimg"
                value={qrData} // Pass dynamic data to QR Code
                size={200}
                bgColor="#ffffff"
                fgColor="blue"
                level="H" // Error correction level
              />
              {/* Logo Overlay */}
              <img
                className="qrlogo"
                src={qrLogoImg} // Replace with your logo path
                alt="logo-img"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "50px",
                  height: "50px",
                }}
              />
            </div>
          ) : (
            <p>No QR Code Generated Yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default QrcodeGen;
