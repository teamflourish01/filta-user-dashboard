// import React, { useEffect, useState } from "react";
// import "../Flip/Flip.css";
// import logo from "../../images/whiteFilta.svg";

// const Flip = () => {
//   const [showBlackCard, setShowBlackCard] = useState(false);
//   const [isTransitioning, setIsTransitioning] = useState(true);

//   useEffect(() => {
//     const toggleCards = () => {
//       setIsTransitioning(false); // Start transition phase

//       // setTimeout(() => {
//       setShowBlackCard((prev) => !prev); // Toggle card after transition phase
//       setIsTransitioning(true); // End transition phase
//       // }, 000); // Match this with the CSS transition duration
//       // setTimeout(()=>{
//       //   console.log(1);

//       // },[4000])
//     };

//     const interval = setInterval(toggleCards, 2450);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flip-container">
//       {/* Flipping Card */}
//       <div className="flip-card">
//         <div className="front">Front Card</div>
//         <div className="back">Back Card</div>
//       </div>
//       {/* Black Card */}
//       <div className="bottom-content">
//         <div className="center-card">
//           <div
//             className={`card black-card ${
//               showBlackCard ? "visible" : "hidden"
//             } ${isTransitioning ? "transitioning" : ""}`}
//           >
//             <img src={logo} alt="Logo" className="f-logo-flip" />
//           </div>
//         </div>
//         <div
//           className={`card white-card ${
//             !showBlackCard ? "visible" : "hidden"
//           } ${isTransitioning ? "transitioning" : ""}`}
//         >
//           <p className="user-name">Rina Bhalani</p>
//           <p className="designation">Web Developer</p>
//           <p className="designation">Flourish Creations Pvt. Ltd.</p>
//           <p className="designation">Ahmedabad</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Flip;

import React, { useEffect, useState } from "react";
import "../Flip/Flip.css";
import logo from "../../images/whiteFilta.svg";
import "../Flip/CardDesign.css";
import UserProfile from "../../images/user-flip-img.svg";
import userLogo from "../../images/flourishLogoOld.svg";
import scanner from "../../images/scanner.svg";

const Flip = () => {
  const [showBlackCard, setShowBlackCard] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const flipCardData = {
    name: "Ajay Gadhavi",
    designation: "UI/UX Designer",
    company: "Flourish Creations Pvt. Ltd.",
    location: "Ahmedabad",
    email: "ajaygadhavi9847@gmail.com",
    phone: "6353123096",
    profileImg: "path-to-profile-img.svg",
  };

  useEffect(() => {
    const toggleCards = () => {
      setIsTransitioning(false); // Start transition phase

      // setTimeout(() => {
      setShowBlackCard((prev) => !prev); // Toggle card after transition phase
      setIsTransitioning(true); // End transition phase
      // }, 000); // Match this with the CSS transition duration
      // setTimeout(()=>{
      //   console.log(1);

      // },[4000])
    };

    const interval = setInterval(toggleCards, 2450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flip-container">
      {/* Flipping Card */}
      <div className="flip-card">
        {/* <--- Top Front Card ---> */}
        <div className="front">
          <div className="flip-front-logo-c">
            <img src={userLogo} alt="" className="user-logo-f-f" />
          </div>
          <div className="hr-line-l1-flip"></div>
          <div className="user-card-name-mobile-flip">
            <p className="u-n-flip-bold">Ajay Gadhavi</p>
            <p className="u-n-flip-semiBold">UI/UX Designer</p>
          </div>
        </div>
        {/* <--- Top Back Card ---> */}
        <div className="back">
          <div className="scanner-img-lay1">
            <img src={scanner} alt="" className="scanner-lay1-size" />
          </div>
          <div className="hr-line-l1-horizontal-flip"></div>
          <div className="user-email-regular-SemiBold">
            <p>ajaygadhavi9847@gmail.com</p>
            <p>6353123096</p>
          </div>
        </div>
      </div>
      {/* Black Card */}
      <div className="bottom-content">
        <div className="center-card">
          <div
            className={`card black-card ${
              showBlackCard ? "visible" : "hidden"
            } ${isTransitioning ? "transitioning" : ""}`}
          >
            <img src={logo} alt="Logo" className="f-logo-flip" />
          </div>
        </div>
        <div className="center-card">
        <div
          className={`card white-card ${
            !showBlackCard ? "visible" : "hidden"
          } ${isTransitioning ? "transitioning" : ""}`}
        >
          {/* <div className="card white-card visible"> */}
          <div className="user-profile-flip-content">
            <img src={UserProfile} alt="" className="user-pic-flip-b" />
          </div>
          <div className="user-logo-flip-circle">
            <img src={userLogo} alt="" />
          </div>
          <div className="user-detail-flip-content">
            <div className="dashed-border-content">
              <p className="user-name">{flipCardData.name}</p>
              <p className="designation">{flipCardData.designation}</p>
              <p className="designation">{flipCardData.company}</p>
              <p className="designation">{flipCardData.location}</p>
            </div>
            <p className="clickable-link-flip">Clickable Links</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Flip;
