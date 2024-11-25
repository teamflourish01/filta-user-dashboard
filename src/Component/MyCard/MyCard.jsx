import React, { useState } from "react";
import "../../Component/MyCard/myCard.css";
import "../../Component/MyCard/Design.css";
import profileimg from "../../images/profileimg.png";
import basicimg from "../../images/basicimg.png";
import contentimg from "../../images/contentimg.png";
import designimg from "../../images/designimg.png";
import qrcodeimg from "../../images/qrcodeimg.png";
import sharebtn from "../../images/mycardshare.png";
import blackBasiicone from "../../images/basiciconeblack.png";
import blackContent from "../../images/contentblackicon.png";
import whiteQr from "../../images/qrcode_white_icon.png";
import whitepen from "../../images/Whitepen.png";
import qrcodeImg from "../../images/qrImg.png";
import qrLogoImg from "../../images/qrlogoImg.png";
import BasicDetails from "./MycardBasicDetails";
import ContentComponent from "./MycardContent";
import DesignComponent from "./MycardDesign";
import QrcodeComponent from "./MycardQRcode";
const MyCard = () => {
  const [activeTab, setActiveTab] = useState("Basic Details");

  // Tab content components
  const renderTabContent = () => {
    switch (activeTab) {
      case "Basic Details":
        return (
          <>
            <BasicDetails />
          </>
        );
      case "Content":
        return (
          <>
            <ContentComponent />
          </>
        );
      case "Design":
        return (
          <>
            <DesignComponent />
          </>
        );
      case "QR Code":
        return (
          <>
            <QrcodeComponent />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="my-container">
        {/* Left Side */}
        <div className="my-leftside">
          <div className="my-menu">
            {["Basic Details", "Content", "Design", "QR Code"].map((tab) => (
              <div
                key={tab}
                className={`my-menuitem ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                <img
                  src={
                    activeTab === tab
                      ? tab === "Basic Details"
                        ? basicimg
                        : tab === "Content"
                        ? blackContent
                        : tab === "Design"
                        ? whitepen
                        : whiteQr
                      : tab === "Basic Details"
                      ? blackBasiicone
                      : tab === "Content"
                      ? contentimg
                      : tab === "Design"
                      ? designimg
                      : qrcodeimg
                  }
                  alt={`${tab} icon`}
                />
                <span>{tab}</span>
              </div>
            ))}
          </div>
          <hr />
          {renderTabContent()}
        </div>

        {/* Right Side */}
        <div className="my-rightside">
          <div className="e-profile">
            <img src={profileimg} alt="profile img" />
            <div className="e-sidediv">
              <p className="e-prfname">Ajay Gadhavi</p>
              <p className="e-prfemail">ajaygadhvi045@gmail.com</p>
            </div>
          </div>
          <hr className="hrline" />

          {activeTab === "QR Code" ? (
            <div className="qr-code-panel">
              <p>QR Code</p>
              <div className="qr-imgmain">
                <div className="qr-imgdiv">
                  <img className="qrimg" src={qrcodeImg} alt="qr-code" />
                  <img className="qrlogo" src={qrLogoImg} alt="logo-img" />
                </div>
              </div>
            </div>
          ) : (
            <div className="my-priviewMain">
              <p>Card live preview</p>
              <div className="my-priviewcard"></div>
              <div className="my-prwbtn">
                <span>Share your card</span>
                <img src={sharebtn} alt="sharebtn" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCard;
