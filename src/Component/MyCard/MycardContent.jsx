import React, { useState } from "react";
import plus from "../../images/qr_plus.png";
import insta from "../../images/instagram 1.svg";
import "../MyCard/Content.css";
import deltImg from "../../images/delete.png";
import dotImg from "../../images/dot_round.png";
import fbImg from "../../images/facebook 1.svg";
import lnkImg from "../../images/linkedin 1.svg";
import twtrImg from "../../images/twitter_X.svg";
import snapImg from "../../images/snapchat 1.svg";
import pintImg from "../../images/pinterest 1.svg";
import teligImg from "../../images/telegram 1.svg";
import ytImg from "../../images/youtube 1.svg";
import msgImg from "../../images/number 2.svg";
import callImg from "../../images/call.svg";
import emailImg from "../../images/email.svg";
import contactImg from "../../images/contactcard.svg";
import wappImg from "../../images/whatsapp 1.svg";
import mapImg from "../../images/address.svg";
import gogleImg from "../../images/Google.svg";
import payplImg from "../../images/paypal 1.svg";
import thrdsImg from "../../images/threads 1.svg";
import DropdownComponent from "./DropdownComponent";
import MultimediaComponent from "./MultimediaComponent";
import ContactForm from "./ContactFrom";
import VoiceMessage from "./VoiceMessage";
import About from "./About";
import TeamMember from "./TeamMember";
import SocialProof from "./SocialProof";
import Documents from "./Documents";
import Photos from "./Photos";
import ProductGallery from "./ProductGallery";
import Automated from "./Automated";
import TimeSensitive from "./TimeSensitive";
const ContentComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };
  const handlePlatformSelect = (platform) => {
    if (!selectedPlatforms.includes(platform)) {
      setSelectedPlatforms((prev) => [...prev, platform]);
    }
    toggleModal();
  };
  const handleDeletePlatform = (platform) => {
    setSelectedPlatforms((prev) => prev.filter((item) => item !== platform));
  };
  return (
    <>
      <DropdownComponent title="Clickable links">
        <div className="ct-addmore">
          <div className="ct-addmoreflex" onClick={toggleModal}>
            <img src={plus} alt="add icone" />
            <p>Add More</p>
          </div>
          {selectedPlatforms &&
            selectedPlatforms.map((platform, index) => (
              <div className="ct-addlinkmain" key={index}>
                <div className="ct-addlink">
                  <img src={platform.icon} alt={platform.name} />
                  <p>{platform.name}</p>
                </div>
              </div>
            ))}
        </div>
        <hr />
        <div className="ct-margin">
          <div className="ct-tworadio">
            <div className="ct-orignal">
              <label>
                Original
                <input type="radio" />
              </label>
            </div>
            <div className="ct-outline">
              <label>
                Outline
                <input type="radio" />
              </label>
            </div>
          </div>
          {selectedPlatforms.map((platform, index) => (
            <div className="ct-linkbox" key={index}>
              <div className="ct-titlemain">
                <div className="ct-logotitle">
                  <img src={platform.icon} alt={platform.name} />
                  <p>{platform.name}</p>
                </div>
                <div className="ct-twobtnmain">
                  <div
                    className="ct-deltbtn"
                    onClick={() => handleDeletePlatform(platform)}
                  >
                    <img src={deltImg} alt="delt-img" />
                  </div>
                  <div className="ct-dotbtn">
                    <img src={dotImg} alt="dot-img" />
                  </div>
                </div>
              </div>
              <div className="ct-linkform">
                <form>
                  <div className="ct-fwidth">
                    <label>Title</label>
                    <input type="text" required />
                  </div>
                  <div className="ct-fwidth">
                    <label>URL</label>
                    <input type="text" required />
                  </div>
                  <div className="my-buttons">
                    <button className="my-cancel">Cancel</button>
                    <button className="my-save">Save</button>
                  </div>
                </form>
              </div>
            </div>
          ))}
        </div>
        {/* Modal Component */}
        {isModalVisible && (
          <div className="modal-AllLink">
            <div className="modal-content">
              <div className="md-title">
                <p>Social Media </p>
              </div>
              <div className="s-alllink">
                {[
                  { name: "Instagram", icon: insta },
                  { name: "Facebook", icon: fbImg },
                  { name: "LinkedIn", icon: lnkImg },
                  { name: "X (Twitter)", icon: twtrImg },
                  { name: "Snapchat", icon: snapImg },
                  { name: "Threads", icon: thrdsImg },
                  { name: "Pinterest", icon: pintImg },
                  { name: "Telegram", icon: teligImg },
                  { name: "You tube", icon: ytImg },
                ].map((platform) => (
                  <div
                    className="s-link"
                    key={platform.name}
                    onClick={() => handlePlatformSelect(platform)}
                  >
                    <div className="s-imgtitle">
                      <img src={platform.icon} alt={platform.name} />
                      <p>{platform.name}</p>
                    </div>
                    <div className="s-plusbtn">
                      <img src={plus} alt="plus" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="md-title">
                <p>Contact</p>
              </div>
              <div className="s-alllink">
                {[
                  { name: "Text", icon: msgImg },
                  { name: "Call", icon: callImg },
                  { name: "Email", icon: emailImg },
                  { name: "Contact ", icon: contactImg },
                  { name: "WhatsApp", icon: wappImg },
                  { name: "Address", icon: mapImg },
                ].map((platform) => (
                  <div
                    className="s-link"
                    key={platform.name}
                    onClick={() => handlePlatformSelect(platform)}
                  >
                    <div className="s-imgtitle">
                      <img src={platform.icon} alt={platform.name} />
                      <p>{platform.name}</p>
                    </div>
                    <div className="s-plusbtn">
                      <img src={plus} alt="plus" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="md-title">
                <p>Other</p>
              </div>
              <div className="s-alllink">
                {[
                  { name: "Review", icon: gogleImg },
                  { name: "PayPal", icon: payplImg },
                ].map((platform) => (
                  <div
                    className="s-link"
                    key={platform.name}
                    onClick={() => handlePlatformSelect(platform)}
                  >
                    <div className="s-imgtitle">
                      <img src={platform.icon} alt={platform.name} />
                      <p>{platform.name}</p>
                    </div>
                    <div className="s-plusbtn">
                      <img src={plus} alt="plus" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DropdownComponent>
      <DropdownComponent title="Multimedia">
        <MultimediaComponent />
      </DropdownComponent>
      <DropdownComponent title="Contact Form">
        <ContactForm />
      </DropdownComponent>
      <DropdownComponent title="Voice Message">
        <VoiceMessage />
      </DropdownComponent>
      <DropdownComponent title="About (introduction of company)">
        <About />
      </DropdownComponent>
      <DropdownComponent title="Documents">
        <Documents />
      </DropdownComponent>

      <DropdownComponent title="Team member details">
        <TeamMember />
      </DropdownComponent>

      <DropdownComponent title="Time sensitive offer/ slider form">
        <TimeSensitive />
      </DropdownComponent>
      <DropdownComponent title="Automated">
        <Automated />
      </DropdownComponent>
      <DropdownComponent title="Social Proof">
        <SocialProof />
      </DropdownComponent>
      <DropdownComponent title="Photos">
        <Photos />
      </DropdownComponent>
      <DropdownComponent title="Product Gallery">
        <ProductGallery />
      </DropdownComponent>
    </>
  );
};

export default ContentComponent;
