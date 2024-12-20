import React , {useState} from 'react'
import "../subscription/subscription.css"
const Subscription = () => {
    const [activePlan, setActivePlan] = useState("Monthly");
  return (
    <>
<div className="pricing-container">
      <div className="toggle-buttons">
        <button
          className={`toggle-button ${activePlan === "Monthly" ? "active" : ""}`}
          onClick={() => setActivePlan("Monthly")}
        >
          Monthly
        </button>
        <button
          className={`toggle-button ${activePlan === "Yearly" ? "active" : ""}`}
          onClick={() => setActivePlan("Yearly")}
        >
          Yearly
        </button>
      </div>
      <div className="pricing-plans">
        <div className="plan-card">
          <h3 className="plan-title">PREMIUM</h3>
          <p className="plan-price">₹ 119/- <span>(Per Month)</span></p>
          <button className="plan-button">Get Started</button>
          <ul className="plan-features">
            <li>Everything included in Free, plus:</li>
            <li>Customer Support</li>
            <li>Hide Filta Branding</li>
            <li>Contact Form</li>
            <li>Multiple Sharing Option</li>
            <li>Custom Color</li>
            <li>Custom Font</li>
            <li>Voice Message</li>
            <li>Multi Language Interface</li>
            <li>Call to Action Button</li>
          </ul>
        </div>
        <div className="plan-card">
          <h3 className="plan-title">TEAM</h3>
          <button className="plan-button contact-button">Contact Sales</button>
          <ul className="plan-features">
            <li>Everything included in Premium, plus:</li>
            <li>Costume Dashboard Design</li>
            <li>Costume Company Branding</li>
            <li>Unlimited Lead Storage</li>
            <li>Team and Sub-team Manager</li>
            <li>Multiple Template Theme</li>
            <li>Export Data</li>
            <li>Business Level Support</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}

export default Subscription