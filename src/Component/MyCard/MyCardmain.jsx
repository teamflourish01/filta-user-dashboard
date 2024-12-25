import React, { useContext, useEffect, useState } from "react";
import "../../Component/MyCard/MyEditCard.css";
import pfImg from "../../images/card_profile.svg";
import { Link } from "react-router-dom";
import userContext from "../../context/userDetails";
const MyCardmain = () => {
  const { userData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;

  return (
    <>
      <div className="card-bg">
        <div className="card-img">
          <div className="card-pfimg">
            <img
              src={`${uri}/card/${userData?.card?.profileimg}`}
              alt="pf-img"
              onError={(e) => {
                console.error("Image failed to load", e);
              }}
            />
          </div>
          <div className="card-line"></div>
        </div>
        <div className="card-info">
          <p className="card-name">{userData?.card?.name || "Ajay Gadhvi"}</p>
          <p className="card-design">
            {userData?.card?.jobtitle || "UI/Ux Designer"}{" "}
          </p>
          <p className="card-compny">
            {userData?.card?.company || "Flourish Creations Privat Limited"}
          </p>
        </div>
        <div className="card-btn">
          <Link to="/my-card/edit" className="card-editbtn">
            Edit
          </Link>
          <button className="card-sharbtn">Share</button>
        </div>
      </div>
    </>
  );
};

export default MyCardmain;
