import React from 'react'
import "../support/support.css"
const Support = () => {
  return (
    <>
        <div className="contact-container">
      <h2 className="contact-title">Contact Information</h2>
      <div className="contact-details">
        <div className="contact-item">
          <i className="fas fa-phone"></i>
          <span>+91 12345 67890</span>
        </div>
        <div className="contact-item">
          <i className="fas fa-envelope"></i>
          <span>filta123@gmail.com</span>
        </div>
        <div className="contact-item">
          <i className="fas fa-map-marker-alt"></i>
          <span>Gujarat, India</span>
        </div>
      </div>
      <hr className="divider" />
      <h3 className="follow-title">Follow Us</h3>
      <div className="social-icons">
        <i className="fab fa-instagram"></i>
        <i className="fab fa-facebook"></i>
        <i className="fab fa-linkedin"></i>
        <i className="fab fa-google"></i>
        <i className="fas fa-times"></i>
      </div>
    </div>
    </>
  )
}

export default Support