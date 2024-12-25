import React, { useState } from "react";
import "../subscription/subscription.css";
const Subscription = () => {
  const [activePlan, setActivePlan] = useState("Monthly");
  const [price, setprice] = useState(119);

  const handleplanschange = (plan) => {
    setActivePlan(plan);
    if (plan === "Monthly") {
      setprice(119);
    } else if (plan === "Yearly") {
      setprice(1199);
    }
  };

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
              <button className="plan-button">Get Started</button>
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
