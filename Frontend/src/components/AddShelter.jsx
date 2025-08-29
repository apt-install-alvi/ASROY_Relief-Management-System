import React, { useState, useEffect } from "react";
import "./Add_Popup.css";

export function AddShelter({ header, handleState }) {
  const [areas, setAreas] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    total_capacity: "",
    current_capacity: "",
  });

  // Fetch areas from backend
  useEffect(() => {
    fetch("/shelters/areas")
      .then((res) => res.json())
      .then((data) => setAreas(data))
      .catch((err) => console.error("Error fetching areas:", err));
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, area, total_capacity, current_capacity } = formData;

    if (!name || !area || !total_capacity || !current_capacity) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await fetch("/shelters/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, area, total_capacity, current_capacity }),
      });

      const result = await res.json();
      if (result.success) {
        alert("Shelter added successfully!:${result.Shelter_id}");
        handleState(); // close popup
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="popup-body">
      <div className="popup-header">
        <h4 className="title">Add {header}</h4>
        <button className="x-btn" onClick={handleState}>
          <img src="/assets/icons/x_btn.svg" />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="label-name">Name</label>
        <input
          className="input-field"
          type="text"
          id="name"
          placeholder="E.g-Relief Center"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          autoComplete="off" // disable autocomplete
        />

        <label htmlFor="area" className="label-name">Area</label>
        <select
          id="area"
          className="dropdown"
          value={formData.area}
          onChange={(e) => handleChange("area", e.target.value)}
        >
          <option value="">Select Area</option>
          {areas.map((area) => (
            <option key={area.Area_id} value={area.Area_name}>
              {area.Area_name}
            </option>
          ))}
        </select>

        <label htmlFor="t_cap" className="label-name">Total Capacity</label>
        <input
          className="input-field"
          type="number"
          id="t_cap"
          placeholder="E.g-50"
          value={formData.total_capacity}
          onChange={(e) => handleChange("total_capacity", e.target.value)}
        />

        <label htmlFor="c_cap" className="label-name">Current Capacity</label>
        <input
          className="input-field"
          type="number"
          id="c_cap"
          placeholder="E.g-40"
          value={formData.current_capacity}
          onChange={(e) => handleChange("current_capacity", e.target.value)}
        />

        <div>
          <input type="submit" value="Add" className="popup-add-btn" />
        </div>
      </form>
    </div>
  );
}
