import React from 'react'
import "../Requestfeature/requestfeature.css"
const Requestfeature = () => {
  return (
    <>
    <div className="feature-container">
        <div className="feature-request-container">
      <h2 className="form-title">Request a Feature</h2>
      <form className="feature-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" className="form-input" placeholder="Enter title" />
        </div>
        <div className="form-group">
          <label htmlFor="module">Select Modul</label>
          <select id="module" className="form-input">
            <option value="my-card">My Card</option>
            <option value="dashboard">Dashboard</option>
            <option value="settings">Settings</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Describe Your Request</label>
          <textarea id="description" className="form-input" rows="4" placeholder="Enter your request"></textarea>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
    </div>
    </>
  )
}

export default Requestfeature