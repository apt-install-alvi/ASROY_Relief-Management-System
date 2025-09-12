import React, { useState } from "react";
import "./newCampaignPopup.css";

export function NewCampaignPopup({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    eventName: "",
    area: "",
    startDate: "",
    endDate: "",
    targetAmount: "",
    description: "",
    image: null,
    immediateGoals: "",
    longTermGoals: "",
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // Submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass form data back to parent
    onClose(); // Close the popup
  };

  return (
    <div className="popup-backdrop">
      <div className="popup-container">
        <header className="popup-header">
          <h2>Add Campaign</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </header>
        <form onSubmit={handleSubmit} className="popup-form">
          <div className="form-group">
            <label htmlFor="eventName">Event Name</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              placeholder="E.g. Flood Relief 2024"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="area">Area</label>
            <input
              type="text"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              placeholder="Select or type district"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="targetAmount">Target Amount (BDT)</label>
            <input
              type="number"
              id="targetAmount"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the purpose, goals, and impact of this campaign"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload Campaign Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="immediateGoals">Immediate Goals</label>
            <textarea
              id="immediateGoals"
              name="immediateGoals"
              value={formData.immediateGoals}
              onChange={handleInputChange}
              placeholder="What are the immediate relief objectives?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="longTermGoals">Long-term Goals</label>
            <textarea
              id="longTermGoals"
              name="longTermGoals"
              value={formData.longTermGoals}
              onChange={handleInputChange}
              placeholder="What are the long-term recovery objectives?"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
