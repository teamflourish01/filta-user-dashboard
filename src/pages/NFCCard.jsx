import React from "react";
import "../styles/NFCCard.css";
import ChooseStandardNFC from "../Component/ChooseStandardNFC/ChooseStandardNFC";
import ChoosePremiumNFC from "../Component/ChoosePremiumNFC/ChoosePremiumNFC";

const NFCCard = () => {
  return (
    <>
      <div className="n-f-c">
        <div className="left-n-f-c-card">
          <div className="choose-l-n-f-c">Choose Option</div>
          <div className="cards-l-n-f-c">
          <div className="c-s-card">
          <ChooseStandardNFC/>
          </div>
          <div className="c-p-card">
            <ChoosePremiumNFC/>
          </div>
        </div>
        </div>
        
        <div className="right-n-f-c-card">
          <p className="how-it-r-n-f-c">How it Works ?</p>
          <div className="grey-b-o-x"></div>
        </div>
      </div>
    </>
  );
};

export default NFCCard;