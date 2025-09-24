import React, { useState, useEffect } from "react";
import { ModalHeader } from "../base_components/ModalHeader";
import { InputWithLabel } from "../base_components/InputWithLabel";
import "../styles/large_components/DonationAddModal.css";

// IconHolder component defined within the same file
function IconHolder({ icon, label, onClick, isActive = false }) {
  return (
    <div 
      className={`icon-holder ${isActive ? 'active' : ''}`} 
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        padding: "10px",
        border: isActive ? "2px solid #700000" : "1px solid #ccc",
        borderRadius: "12px",
        backgroundColor: isActive ? "#fff0f0" : "white",
        minWidth: "120px"
      }}
    >
      <img src={icon} alt={label} style={{ width: "30px", height: "30px" }} />
      <p style={{ margin: "5px 0 0 0", fontSize: "12px", textAlign: "center" }}>{label}</p>
    </div>
  );
}

export function DonationAddModal({ handleState }) {
  const [donationType, setDonationType] = useState("");
  const [activeEvents, setActiveEvents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    event: "",
    donor: "",
    donor_contact: "",
    donation_type: "",
    amount: 100,
    item: "",
    quantity: 1,
    date_received: ""
  });

  // Simplified type checks
  const isMoney = donationType === "Money";
  const isFood = donationType === "Food";
  const isMedicine = donationType === "Medicine";
  const isClothes = donationType === "Clothes";
  const isOthers = donationType === "Others";

  // Fetch active events
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("http://localhost:5000/api/donations/active-events");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setActiveEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        // Fallback mock data
        setActiveEvents([
          { Event_id: 1, Event_name: "Flood Relief", Area_name: "Dhaka" },
          { Event_id: 2, Event_name: "Winter Aid", Area_name: "Sylhet" }
        ]);
      }
    }
    fetchEvents();
  }, []);

  const handleChange = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleDonationType = (type) => {
    setDonationType(type);
    setFormData(prev => ({ 
      ...prev, 
      donation_type: type,
      amount: type === "Money" ? 100 : 0,
      quantity: type !== "Money" ? 1 : 0
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validation
    if (!formData.event || !formData.donor || !formData.date_received || !formData.donation_type) {
      alert("Please fill in all required fields");
      return;
    }
    
    if (isMoney && formData.amount < 100) {
      alert("Amount must be at least 100 Tk.");
      return;
    }
    
    if ((isFood || isMedicine || isClothes || isOthers) && (!formData.item || formData.quantity < 1)) {
      alert("Please provide item name and quantity");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await fetch("http://localhost:5000/api/donations/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const result = await res.json();
      console.log("Donation added:", result);
      alert("Donation added successfully!");
      handleState(false); // Close modal
      
      // Refresh the page to show new donation
      window.location.reload();
      
    } catch (err) {
      console.error("Failed to add donation:", err);
      alert("Failed to add donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="modal donation-modal">
      <ModalHeader header="Add Donation" handleState={handleState} />
      <form onSubmit={handleSubmit}>
        <div className="inputs-in-modal-donation">
          <div className="left-container inputs-in-modal">
            {/* Event Dropdown - Fixed */}
            <div className="input-with-label">
              <label htmlFor="active-events">Event Name *</label>
              <input
                id="active-events"
                list="active-events-list"
                value={formData.event}
                onChange={e => handleChange("event", e.target.value)}
                placeholder="Select an event"
                required
              />
              <datalist id="active-events-list">
                {activeEvents.map(ev => (
                  <option
                    key={ev.Event_id}
                    value={`${ev.Event_name} - ${ev.Area_name}`}
                  />
                ))}
              </datalist>
            </div>

            {/* Donor Name */}
            <InputWithLabel
              labelFor="donor-name"
              label="Donor Name *"
              fieldType="text"
              value={formData.donor}
              onChange={e => handleChange("donor", e.target.value)}
              required
            />

            {/* Donor Contact */}
            <InputWithLabel
              labelFor="donor-contact"
              label="Donor Contact"
              fieldType="text"
              value={formData.donor_contact}
              onChange={e => handleChange("donor_contact", e.target.value)}
            />

            {/* Date Received */}
            <InputWithLabel
              labelFor="date-received"
              label="Date Received *"
              fieldType="date"
              value={formData.date_received}
              onChange={e => handleChange("date_received", e.target.value)}
              required
            />

            {/* Donation Type */}
            <div className="p-iconholder">
              <p>Donation Type *</p>
              <div className="iconholder-container">
                <IconHolder 
                  icon="/assets/icons/money.png" 
                  label="Money" 
                  onClick={() => handleDonationType("Money")}
                  isActive={isMoney}
                />
                <IconHolder 
                  icon="/assets/icons/food.png" 
                  label="Food" 
                  onClick={() => handleDonationType("Food")}
                  isActive={isFood}
                />
                <IconHolder 
                  icon="/assets/icons/medicine.png" 
                  label="Medicine" 
                  onClick={() => handleDonationType("Medicine")}
                  isActive={isMedicine}
                />
                <IconHolder 
                  icon="/assets/icons/clothes.png" 
                  label="Clothes" 
                  onClick={() => handleDonationType("Clothes")}
                  isActive={isClothes}
                />
                <IconHolder 
                  icon="/assets/icons/others.png" 
                  label="Others" 
                  onClick={() => handleDonationType("Others")}
                  isActive={isOthers}
                />
              </div>
            </div>
          </div>

          {/* Right Container */}
          <div className="right-container inputs-in-modal">
            {isMoney && (
              <InputWithLabel
                labelFor="money-amount"
                label="Amount (Tk.) *"
                fieldType="number"
                min={100}
                value={formData.amount}
                onChange={e => handleChange("amount", parseInt(e.target.value))}
                required
              />
            )}

            {(isFood || isMedicine || isClothes || isOthers) && (
              <div className="inputs-in-modal">
                <InputWithLabel
                  labelFor="item-name"
                  label="Item Name *"
                  fieldType="text"
                  value={formData.item}
                  onChange={e => handleChange("item", e.target.value)}
                  required
                />
                <InputWithLabel
                  labelFor="item-quantity"
                  label="Quantity *"
                  fieldType="number"
                  min={1}
                  value={formData.quantity}
                  onChange={e => handleChange("quantity", parseInt(e.target.value))}
                  required
                />
              </div>
            )}
          </div>
        </div>

        <div className="modal-btn-position">
          <input 
            type="submit" 
            value={isSubmitting ? "Adding..." : "Add Donation"} 
            className="red-btn" 
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}