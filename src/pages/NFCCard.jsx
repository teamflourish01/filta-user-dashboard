import React from "react";
import "../styles/NFCCard.css";
import ChooseStandardNFC from "../Component/ChooseStandardNFC/ChooseStandardNFC";
import ChoosePremiumNFC from "../Component/ChoosePremiumNFC/ChoosePremiumNFC";
import Flip from "../Component/Flip/Flip";

const NFCCard = () => {
  return (
    <>
      <div className="n-f-c">
        <div className="n-f-c-scroll">
          <div className="left-n-f-c-card">
            <div className="parent-div-of-cards-choose">
              <div className="cards-l-n-f-c">
                <div className="choose-l-n-f-c">Choose Option</div>
                <div className="standard-premium-creat-flex">
                  <div className="c-s-card">
                    <ChooseStandardNFC />
                  </div>
                  <div className="c-p-card">
                    <ChoosePremiumNFC />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right-n-f-c-card">
            <div className="padding-grey-box">
              <p className="how-it-r-n-f-c">How it Works ?</p>

              <div className="grey-b-o-x-nfc-how ">
                <Flip />
              </div>
            </div>
          </div>

          <div className="every-introduction-container">
            <div className="every-introduction">
              <p className="make-every-intro">
                Make Every Introduction Memorable
              </p>
              <div className="smart-nfc-business">
                The Smart NFC Business Card is your ultimate networking
                companion. Designed for professionals who value efficiency and
                innovation, this card allows you to share your contact details,
                social media links, and more with just a single tap. Ditch the
                clutter of traditional paper cards and embrace the future of
                seamless connectivity.
              </div>
            </div>

            <div className="key-introcuction">
              <p className="key-introcuction-p">Key Benefits</p>
            </div>

            <div className="key-benefit-ui">
              <div className="div-p-li">
                <li className="build-trust-padding"></li>

                <p className="build-trust-title">
                  {" "}
                  <span className="universal-capability">
                    {" "}
                    Instant Sharing :
                  </span>
                  Share contact information effortlessly with one tap on any
                  NFC-enabled device.
                </p>
              </div>

              <div className="div-p-li">
                <li className="build-trust-padding"> </li>
                <p className="build-trust-title">
                  {" "}
                  <span className="universal-capability">
                    {" "}
                    Custom Branding :
                  </span>
                  Personalize your card to reflect your brand’s identity and
                  leave a lasting impression.
                </p>
              </div>

              <div className="div-p-li">
                <li className="build-trust-padding"></li>

                <p className="build-trust-title">
                  {" "}
                  <span className="universal-capability"> Eco-Friendly :</span>
                  Eliminate the need for disposable paper business cards.
                </p>
              </div>

              <div className="div-p-li">
                <li className="build-trust-padding"> </li>
                <p className="build-trust-title">
                  {" "}
                  <span className="universal-capability">
                    {" "}
                    Cost-Effective :{" "}
                  </span>{" "}
                  A one-time investment for endless connections.
                </p>
              </div>

              <div className="div-p-li">
                <li className="build-trust-padding"></li>
                <p className="build-trust-title">
                  {" "}
                  <span className="universal-capability">
                    {" "}
                    Universal Compatibility:{" "}
                  </span>
                  Works with most smartphones and NFC-enabled devices.
                </p>
              </div>
            </div>

            <div className="how-it-work-container">
              <div className="how-it-work-div">How It Works</div>
            </div>

            <div className="how-it-work-card">
              <div className="how-it-work-card-flex">
                <div className="design-smart-review">
                  <div className="design-smart-box"></div>
                  <div className="design-smart-box-p">
                    <p className="design-smart-inner-p">
                      Design Your NFC card :
                    </p>
                    <p className="design-smart-para">
                      Get your personalized Filta NFC card and elevate your
                      modern networking with Filta.
                    </p>
                  </div>
                </div>
                <div className="boost-trustability">
                  <div className="design-smart-box"></div>

                  <div className="design-smart-box-p">
                    <p className="design-smart-inner-p">Tap or Scan :</p>
                    <p className="design-smart-para">
                      Simply tap or scan your NFC card on any smartphone to
                      share your contacts, portfolio, or social media links
                      instantly.
                    </p>
                  </div>
                </div>
                <div className="collect-feedback">
                  <div className="design-smart-box-p">
                    <div className="design-smart-box"></div>

                    <p className="design-smart-inner-p">Update Anytime :</p>
                    <p className="design-smart-para">
                      Make real-time updates to your card, ensuring your
                      connections always have accurate information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NFCCard;
