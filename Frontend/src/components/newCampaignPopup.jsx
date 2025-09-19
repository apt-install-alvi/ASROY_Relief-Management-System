import React, { useState, useEffect } from "react";
import "./newCampaignPopup.css";

const donationTypes = [
  { value: "money", label: "Money" },
  { value: "food", label: "Food" },
  { value: "cloth", label: "Cloth" },
  { value: "medicine", label: "Medicine" },
  { value: "others", label: "Others" },
];

const foodTypes = ["Rice", "Bread", "Water", "Canned Food", "Snacks"];
const clothTypes = ["Shirt", "Pant", "Saree", "Blanket", "Towel", "Other"];

// Dummy active events, replace with API call if needed
const dummyActiveEvents = [
  { id: "1", name: "Flood Relief 2025" },
  { id: "2", name: "Cyclone Support" },
];

export function NewCampaignPopup({
  onClose,
  onSave,
  activeEvents = dummyActiveEvents,
}) {
  const [eventId, setEventId] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donationType, setDonationType] = useState("");
  const [moneyAmount, setMoneyAmount] = useState("");
  const [foodType, setFoodType] = useState("");
  const [foodQuantity, setFoodQuantity] = useState("");
  const [clothType, setClothType] = useState("");
  const [clothQuantity, setClothQuantity] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [medicineQuantity, setMedicineQuantity] = useState("");
  const [medicineRemarks, setMedicineRemarks] = useState("");
  const [otherItemName, setOtherItemName] = useState("");
  const [otherItemAmount, setOtherItemAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      eventId,
      donorName,
      donationType,
      ...(donationType === "money" && { moneyAmount }),
      ...(donationType === "food" && { foodType, foodQuantity }),
      ...(donationType === "cloth" && { clothType, clothQuantity }),
      ...(donationType === "medicine" && {
        medicineName,
        medicineQuantity,
        medicineRemarks,
      }),

      ...(donationType === "others" && { otherItemName, otherItemAmount }),
    };
    if (onSave) onSave(data);
    if (onClose) onClose();
  };

  return (
    <div className="popup-backdrop">
      <div className="popup-container">
        <header className="popup-header">
          <h2>ADD DONATION</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </header>
        <form onSubmit={handleSubmit} className="popup-form">
          {/* Event Name Dropdown */}
          <div className="form-group">
            <label htmlFor="eventName">Event Name</label>
            <select
              id="eventName"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              required
            >
              <option value="">Select Event</option>
              {activeEvents.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>

          {/* Donor Name Input */}
          <div className="form-group">
            <label htmlFor="donorName">Donor Name</label>
            <input
              type="text"
              id="donorName"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="Enter donor name"
              required
            />
          </div>

          {/* Donation Type Dropdown */}
          <div className="form-group">
            <label htmlFor="donationType">Donation Type</label>
            <select
              id="donationType"
              value={donationType}
              onChange={(e) => setDonationType(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              {donationTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Conditional Fields */}
          {donationType === "money" && (
            <div className="form-group">
              <label htmlFor="moneyAmount">Amount of Money</label>
              <select
                id="moneyAmount"
                value={moneyAmount}
                onChange={(e) => setMoneyAmount(e.target.value)}
                required
              >
                <option value="">Select Amount</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
                <option value="5000">5000</option>
                <option value="10000">10000</option>
                <option value="50000">50000</option>
              </select>
            </div>
          )}

          {donationType === "food" && (
            <>
              <div className="form-group">
                <label htmlFor="foodType">Type of Food</label>
                <select
                  id="foodType"
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                  required
                >
                  <option value="">Select Food</option>
                  {foodTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="foodQuantity">Food Quantity</label>
                <input
                  type="number"
                  id="foodQuantity"
                  value={foodQuantity}
                  onChange={(e) => setFoodQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  required
                />
              </div>
            </>
          )}

          {donationType === "cloth" && (
            <>
              <div className="form-group cloth-group">
                <label htmlFor="clothType">Type of Cloth</label>
                <select
                  id="clothType"
                  value={clothType}
                  onChange={(e) => setClothType(e.target.value)}
                  required
                >
                  <option value="">Select Cloth Type</option>
                  {clothTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group cloth-group">
                <label htmlFor="clothQuantity">Quantity</label>
                <input
                  type="number"
                  id="clothQuantity"
                  value={clothQuantity}
                  onChange={(e) => setClothQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  required
                />
              </div>
            </>
          )}

          {donationType === "medicine" && (
            <>
              <div className="form-group">
                <label htmlFor="medicineName">Medicine Name</label>
                <input
                  type="text"
                  id="medicineName"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  placeholder="Enter medicine name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="medicineQuantity">Quantity</label>
                <input
                  type="number"
                  id="medicineQuantity"
                  value={medicineQuantity}
                  onChange={(e) => setMedicineQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="medicineRemarks">Remarks</label>
                <input
                  type="text"
                  id="medicineRemarks"
                  value={medicineRemarks}
                  onChange={(e) => setMedicineRemarks(e.target.value)}
                  placeholder="Enter remarks"
                  required
                />
              </div>
            </>
          )}
          {donationType === "others" && (
            <>
              <div className="form-group">
                <label htmlFor="otherItemName">Item Name</label>
                <input
                  type="text"
                  id="otherItemName"
                  value={otherItemName}
                  onChange={(e) => setOtherItemName(e.target.value)}
                  placeholder="Enter item name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="otherItemAmount">Item Amount</label>
                <input
                  type="number"
                  id="otherItemAmount"
                  value={otherItemAmount}
                  onChange={(e) => setOtherItemAmount(e.target.value)}
                  placeholder="Enter item amount"
                  required
                />
              </div>
            </>
          )}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
