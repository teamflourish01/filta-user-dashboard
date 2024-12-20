import React, { useContext, useEffect, useState } from "react";
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
import thrdsImg from "../../images/threads 1.svg";
import GooPlyImg from "../../images/GooglePlay.svg";
import PhonpyImg from "../../images/phonePay.svg";
import PaytmImg from "../../images/Paytm.svg";
import GoolDriImg from "../../images/GoogleDrive.svg";
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

import userContext from "../../context/userDetails";

import Ctabutton from "./Ctabutton";

const ContentComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [platformLinks, setPlatformLinks] = useState({});
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };
  const handlePlatformSelect = (platform) => {
    const uniquePlatform = { ...platform, id: Date.now() };
    setSelectedPlatforms((prev) => [...prev, uniquePlatform]);
    toggleModal();
  };

  const handleLinkChange = (platformId, field, value) => {
    setPlatformLinks((prev) => ({
      ...prev,
      [platformId]: {
        ...prev[platformId],
        [field]: value,
      },
    }));
  };
  const handleDeleteLink = async (linkId) => {
    console.log("platfrom id", linkId);

    try {
      const response = await fetch(`${uri}/link/deletelink/${linkId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
      });

      const data = await response.json();
      if (response.ok) {
        // Remove the deleted link from the state
        setSelectedPlatforms((prev) =>
          prev.filter((platform) => platform.id !== linkId)
        );
        setPlatformLinks((prev) => {
          const newLinks = { ...prev };
          delete newLinks[linkId];
          return newLinks;
        });
        alert(`${data?.message}`);
        getUserData();
      } else {
        alert(data.message || "Failed to delete link.");
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };
  useEffect(() => {
    if (userData && userData.socialLinks) {
      const initialLinks = {};
      userData.socialLinks.forEach((link) => {
        initialLinks[link._id] = {
          title: link.text,
          url: link.url,
        };
      });
      setPlatformLinks(initialLinks);

      const selected = userData.socialLinks.map((link) => ({
        name: link.platform,
        icon: getPlatformIcon(link.platform),
        id: link._id,
      }));
      setSelectedPlatforms(selected);
    }
  }, [userData]);
  const getPlatformIcon = (platformName) => {
    switch (platformName) {
      case "Instagram":
        return insta;
      case "Facebook":
        return fbImg;
      case "LinkedIn":
        return lnkImg;
      case "X (Twitter)":
        return twtrImg;
      case "Snapchat":
        return snapImg;
      case "Threads":
        return thrdsImg;
      case "Pinterest":
        return pintImg;
      case "Telegram":
        return teligImg;
      case "Youtube":
        return ytImg;
      case "Text":
        return msgImg;
      case "Call":
        return callImg;
      case "Email":
        return emailImg;
      case "Contact":
        return contactImg;
      case "WhatsApp":
        return wappImg;
      case "Address":
        return mapImg;
      case "Google Pay":
        return GooPlyImg;
      case "Phone Pay":
        return PhonpyImg;
      case "Paytm":
        return PaytmImg;
      case "Review":
        return gogleImg;
      case "Google Drive":
        return GoolDriImg;
      default:
        return emailImg;
    }
  };
  const handleAddLink = async (platformName, title, url) => {
    if (!title || !url) {
      alert("Please fill in both title and URL.");
      return;
    }
    try {
      const response = await fetch(`${uri}/link/addlink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
        body: JSON.stringify({
          userId: userData._id,
          platform: platformName,
          text: title,
          url: url,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setPlatformLinks((prev) => ({
          ...prev,
          [platformName]: { title, url },
        }));
        if (!selectedPlatforms.some((item) => item.name === platformName)) {
          setSelectedPlatforms((prev) => [
            ...prev,
            { name: platformName, icon: getPlatformIcon(platformName) },
          ]);
        }
        alert("Data Add Successfuly");
        getUserData();
      } else {
        alert(data.message || "Failed to add link.");
      }
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };
  return (
    <>
      <div className="drpBox-container">
        <div className="drpbox-set">
          <DropdownComponent title="Clickable links">
            <div className="ct-addmore">
              <div className="ct-addmoreflex" onClick={toggleModal}>
                <img src={plus} alt="add icone" />
                <p>Add More</p>
              </div>
              {selectedPlatforms &&
                selectedPlatforms.map((platform) => (
                  <div className="ct-addlinkmain" key={platform.id}>
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
              {selectedPlatforms.map((platform) => (
                <div className="ct-linkbox" key={platform.id}>
                  <div className="ct-titlemain">
                    <div className="ct-logotitle">
                      <img src={platform.icon} alt={platform.name} />
                      <p>{platform.name}</p>
                    </div>
                    <div className="ct-twobtnmain">
                      <div
                        className="ct-deltbtn"
                        onClick={() => handleDeleteLink(platform.id)}
                      >
                        <img src={deltImg} alt="delt-img" />
                      </div>
                      <div className="ct-dotbtn">
                        <img src={dotImg} alt="dot-img" />
                      </div>
                    </div>
                  </div>
                  <div className="ct-linkform">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const title = platformLinks[platform.id]?.title || "";
                        const url = platformLinks[platform.id]?.url || "";
                        handleAddLink(platform.name, title, url);
                      }}
                    >
                      <div className="ct-fwidth">
                        <label>Title</label>
                        <input
                          type="text"
                          value={platformLinks[platform.id]?.title || ""}
                          onChange={(e) =>
                            handleLinkChange(
                              platform.id,
                              "title",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                      <div className="ct-fwidth">
                        <label>URL</label>
                        <input
                          type="text"
                          value={platformLinks[platform.id]?.url || ""}
                          onChange={(e) =>
                            handleLinkChange(platform.id, "url", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="my-buttons">
                        <button className="my-cancel">Cancel</button>
                        <button type="submit" className="my-save link-padd">
                          Add Link
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ))}
            </div>
            {/* Modal Component */}
            {isModalVisible && (
              <div
                className="modal-AllLink"
                onClick={(e) => {
                  if (e.target.className === "modal-AllLink") {
                    setIsModalVisible(false);
                  }
                }}
              >
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="md-title md-topmargin">
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
                      { name: "Youtube", icon: ytImg },
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
                    <p>Payment</p>
                  </div>
                  <div className="s-alllink">
                    {[
                      { name: "Google Pay", icon: GooPlyImg },
                      { name: "Phone Pay", icon: PhonpyImg },
                      { name: "Paytm", icon: PaytmImg },
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
                  <div className="s-alllink s-othermargin">
                    {[
                      { name: "Review", icon: gogleImg },
                      { name: "Google Drive", icon: GoolDriImg },
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
          <DropdownComponent title="CTA Button">
            <Ctabutton />
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
        </div>
      </div>
    </>
  );
};

export default ContentComponent;
