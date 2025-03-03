import React, { useContext, useEffect, useState } from "react";
import "../subscription/subscription.css";
import { handlePayment } from "../../uttils/Payment";
import userContext from "../../context/userDetails";
const Subscription = () => {
  const [activePlan, setActivePlan] = useState("Monthly");
  const [price, setprice] = useState(119);
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;

  const handleplanschange = (plan) => {
    setActivePlan(plan);
    if (plan === "Monthly") {
      setprice(119);
    } else if (plan === "Yearly") {
      setprice(1199);
    }
  };

  const filterMobile = async () => {
    let arr = userData?.socialLinks?.filter((e) => e?.platform == "Call");
    
    return arr[0]?.url;
  };
  const generateExpiry=()=>{
    if(activePlan=="Monthly"){
      const today = new Date();
      // Add one month to the current date
      const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
      console.log(nextMonth.toISOString().split("T")[0],"monthly");

      return nextMonth.toISOString().split("T")[0];
    }else{
      const today = new Date();
      const futureDate = new Date(today.setFullYear(today.getFullYear() + 1));
      console.log(futureDate.toISOString().split("T")[0],"yearly");
      
      return futureDate.toISOString().split("T")[0]; 
    }
  }
  const handleSuccess=async()=>{
  try {
    let data=await fetch(`${uri}/user/edituser`,{
      method:"PATCH",
      body:JSON.stringify({"planExpired":generateExpiry()}),
      headers:{
        "Content-Type": "application/json",
        Authorization: AuthorizationToken,
      }
    })
    data=await data.json()
    console.log(data,"expiry");
    alert(data.message)
  } catch (error) {
    console.log(error);
    
  }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="overflow-subscription">
        <div className="pricing-container">
          <div className="toggle-buttons">
            <button
              className={`toggle-button ${
                activePlan === "Monthly" ? "active" : ""
              }`}
              onClick={() => handleplanschange("Monthly")}
            >
              Monthly
            </button>
            <button
              className={`toggle-button ${
                activePlan === "Yearly" ? "active" : ""
              }`}
              onClick={() => handleplanschange("Yearly")}
            >
              Yearly
            </button>
          </div>
          <div className="pricing-plans">
            <div className="plan-card">
              <div className="subscription-padding-top">
                <h3 className="plan-title">PREMIUM</h3>
                <div className="subscription-plan-padding">
                  <p className="plan-price">
                    ₹ {price}/-{" "}
                    <span>
                      ({activePlan === "Monthly" ? "Per Month" : "Per Year"})
                    </span>
                  </p>
                </div>
                <button
                  className="plan-button"
                  onClick={() =>
                    handlePayment({
                      amount:+(price)*100,
                      name: userData?.card?.name,
                      email: userData?.email,
                      mobile: filterMobile(),
                      onSuccess: handleSuccess,
                      userId: userData?._id,
                    })
                  }
                >
                  Get Started
                </button>
              </div>
              <div className="subscription-border-bottom"></div>
              <ul className="plan-features">
                <li>Everything included in Free, plus:</li>
                <div className="subscription-border-bottom"></div>

                <li>Customer Support</li>
                <div className="subscription-border-bottom"></div>

                <li>Hide Filta Branding</li>
                <div className="subscription-border-bottom"></div>

                <li>Contact Form</li>
                <div className="subscription-border-bottom"></div>

                <li>Multiple Sharing Option</li>
                <div className="subscription-border-bottom"></div>

                <li>Custom Color</li>
                <div className="subscription-border-bottom"></div>

                <li>Custom Font</li>
                <div className="subscription-border-bottom"></div>

                <li>Voice Message</li>
                <div className="subscription-border-bottom"></div>

                <li>Multi Language Interface</li>
                <div className="subscription-border-bottom"></div>

                <li>Call to Action Button</li>
              </ul>
            </div>
            <div className="plan-card">
              <div className="subscription-padding-top">
                <h3 className=" team-plan">TEAM</h3>
                <button className="plan-button contact-button">
                  Contact Sales
                </button>
              </div>
              <div className="subscription-border-bottom"></div>

              <ul className="plan-features">
                <li>Everything included in Premium, plus:</li>
                <div className="subscription-border-bottom"></div>

                <li>Costume Dashboard Design</li>
                <div className="subscription-border-bottom"></div>

                <li>Costume Company Branding</li>
                <div className="subscription-border-bottom"></div>

                <li>Unlimited Lead Storage</li>
                <div className="subscription-border-bottom"></div>

                <li>Team and Sub-team Manager</li>
                <div className="subscription-border-bottom"></div>

                <li>Multiple Template Theme</li>
                <div className="subscription-border-bottom"></div>

                <li>Export Data</li>
                <div className="subscription-border-bottom"></div>

                <li>Business Level Support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
