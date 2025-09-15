import React, { useState } from "react";
import { AREA_NAMES } from "../../utils/constants"; // import your AREA_NAMES array
import "./Add_Popup.css";

export function AddShelter({ header, handleState }) {
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    total_capacity: "",
    current_capacity: "",
  });

  const [filteredAreas, setFilteredAreas] = useState(AREA_NAMES);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // filter areas as user types
    if (field === "area") {
      const filtered = AREA_NAMES.filter((a) =>
        a.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredAreas(filtered);
      setDropdownOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, area, total_capacity, current_capacity } = formData;

    if (!name || !area || !total_capacity || !current_capacity) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/shelters/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, area, total_capacity, current_capacity }),
      });

      if (!res.ok) {
        const text = await res.text(); // get server error text
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const result = await res.json();
      alert("Shelter added!");
      handleState();
    } catch (err) {
      console.error(err);
      alert("Failed to add shelter: " + err.message);
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
        <label htmlFor="name" className="label-name">
          Name
        </label>
        <input
          className="input-field"
          type="text"
          id="name"
          placeholder="E.g-Relief Center"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          autoComplete="off"
        />

        <label htmlFor="area" className="label-name">
          Area
        </label>
        <div className="area-dropdown">
          <input
            className="input-field"
            type="text"
            id="area"
            placeholder="Select Area"
            value={formData.area}
            onChange={(e) => handleChange("area", e.target.value)}
            onFocus={() => setDropdownOpen(true)}
            autoComplete="off"
          />

          {dropdownOpen && filteredAreas.length > 0 && (
            <ul className="dropdown-list">
              {filteredAreas.map((area) => (
                <li
                  key={area}
                  onClick={() => {
                    handleChange("area", area);
                    setDropdownOpen(false);
                  }}
                >
                  {area}
                </li>
              ))}
            </ul>
          )}
        </div>

        <label htmlFor="t_cap" className="label-name">
          Total Capacity
        </label>
        <input
          className="input-field"
          type="number"
          id="t_cap"
          placeholder="E.g-50"
          value={formData.total_capacity}
          onChange={(e) => handleChange("total_capacity", e.target.value)}
        />

        <label htmlFor="c_cap" className="label-name">
          Current Capacity
        </label>
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
