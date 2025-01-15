import React, { useContext, useEffect, useState } from "react";
import "../ChooseStandardNFC/ChooseStandardNFC.css";
import { FaIndianRupeeSign } from "react-icons/fa6";
// import { IoIosCloseCircleOutline } from "react-icons/io";
import { SlClose } from "react-icons/sl";
import standard from "../../images/premium.svg";
import { handlePayment } from "../../uttils/Payment";

import { GoIssueClosed } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../context/userDetails";
const ChoosePremiumNFC = () => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const filterMobile = async() => {
    let arr = userData?.socialLinks?.filter((e) => e?.platform == "Call");
    setMobile(arr[0]?.url);
    return arr[0]?.url
  };

  const handleSuccess = () => {
    navigate("/nfc-card/premium-plan");
  };

  useEffect(() => {
    
    getUserData()
    
  },[]);

  return (
    <>
      <div className="choose-standard-table">
        <div className="choose-standard-table-card">
          <div className="free">
            <img src={standard} alt="" />
            <p className="c-NFC-Standard">Premium</p>
            <div className="rupees">
              <FaIndianRupeeSign />
              <p className="amount">1399</p>
            </div>
          </div>
          <div className="box">
            <p className="order-summery-standard">Order Summery</p>
          </div>
          <div className="box p-10-tp">
            <div className="right-cross-icon-green">
              <GoIssueClosed />
            </div>
            <p className="box-text">One-time Payment</p>
          </div>
          <div className="box">
            <div className="right-cross-icon-green">
              <GoIssueClosed />
            </div>
            <p className="box-text">FREE Shipping in India</p>
          </div>
          <div className="box">
            <div className="right-cross-icon-green">
              <GoIssueClosed />
            </div>
            <p className="box-text">Fine plastic card</p>
          </div>
          <div className="box">
            <div className="right-cross-icon-green">
              <GoIssueClosed />
            </div>
            <p className="box-text">QR Code on card</p>
          </div>
          <div className="box">
            <div className="right-cross-icon-green">
              <GoIssueClosed />
            </div>
            <p className="box-text">Name and additional info on card</p>
          </div>
          <div className="box">
            <div className="right-cross-icon-green">
              <GoIssueClosed />
            </div>
            <p className="box-text">Hide Filta Logo</p>
          </div>
          <div className="box">
            <div className="right-cross-icon-green">
              <GoIssueClosed />
            </div>
            <p className="box-text">Design Verification before Shipment</p>
          </div>
          <div className="box">
            <div className="right-cross-icon-green">
              <GoIssueClosed />
            </div>
            <p className="box-text">Your Logo on card</p>
          </div>
          <div className="box border-bottom">
            <div className="right-cross-icon-green">
              <GoIssueClosed />
            </div>
            <p className="box-text">Fully Customisable</p>
          </div>
          <div className="create-now-s-nfc">
            {/* <Link to='/nfc-card/premium-plan'> */}

            <button
              type="button"
              className="create-now-btn"
              onClick={() =>{
                if(userData?.premium){
                  return  handlePayment({
                    amount: 1399,
                    name: userData?.card?.name,
                    email: userData?.email,
                    mobile: filterMobile(),
                    onSuccess: handleSuccess,
                    userId: userData?._id
                  })
                }else{
                 return  handleSuccess()
                }
              }
               
              }
            >
              Buy Now
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoosePremiumNFC;
