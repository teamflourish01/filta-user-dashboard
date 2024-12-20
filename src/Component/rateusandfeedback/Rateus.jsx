import React from 'react'
import "../rateusandfeedback/rateus.css"
export const Rateus = () => {
  return (
    <>
        <div className="feedback-container">
      <div className="rate-us">
        <h2>Rate Us</h2>
        <div className="google-logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" />
        </div>
        <div className="rating">
          <span>⭐⭐⭐⭐⭐</span>
          <p>5/5 Rating From Over 50 Reviews</p>
        </div>
        <a href="#" className="view-reviews">
          View All Reviews
        </a>
      </div>
      <div className="feedback-form">
        <h2>Feedback</h2>
        <form>
          <input type="text" placeholder="Title" className="feedback-input" />
          <textarea placeholder="Describe Your Request" className="feedback-textarea"></textarea>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
