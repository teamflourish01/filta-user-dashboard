import React from 'react'
import "../rateusandfeedback/rateus.css"
export const Rateus = () => {
  return (
    <>
    <div className="rateus-overflow">
    <div className="rateus-container">
        
    <div className="rate-us-feedback-main">

      <div className="rate-us">
        <h2>Rate Us</h2>
        <div className="req-bottom-border"></div>

      <div className="rate-innercontainer">
        <div className="google-logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" />
        </div>
        <div className="rating">
          <span>⭐⭐⭐⭐⭐</span>
          <p className="rate-us-para">5/5 Rating From Over 50 Reviews</p>
        </div>
        </div>
        <div className="req-bottom-border"></div>

        <a href="#" className="view-reviews">
          View All Reviews
        </a>
      </div>
      <div className="feedback-form">
        <h2>Feedback</h2>
        <div className="req-bottom-border"></div>

        <form>
        <div className="feed-back-form">
        <label htmlFor="" className="rate-us-label">Title</label>
          <input type="text"  className="feedback-input" />
          <label htmlFor="" className="rate-us-label">Describe Your Request</label>
          <textarea  className="feedback-textarea"></textarea>
          </div>
        <div className="req-bottom-border"></div>

          <button type="submit" className="submit-button-rateus">
            Submit
          </button>
        </form>
      </div>
    </div>
   
    </div>
    </div>
    </>
  )
}
