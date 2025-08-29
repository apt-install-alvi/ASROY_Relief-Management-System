import { useState } from "react";
import { Checkbox } from "./Checkbox";
import { InputField } from "./InputField";
import "./FilterPopup.css";
import { AREA_NAMES, EVENT_TYPES } from "../utils/constants"; // Import your constants

export function FilterModal({ handleState, onFilter }) {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterValues, setFilterValues] = useState({
    type: "",
    area: "",
    date: { from: "", to: "" }
  });

  const handleCheckbox = (filterName, isChecked) => {
    if (isChecked) {
      setSelectedFilter(filterName);
    } else {
      setSelectedFilter(null);
    }
  };

  const handleInputChange = (filterName, field, value) => {
    if (filterName === 'date') {
      setFilterValues(prev => ({
        ...prev,
        date: { ...prev.date, [field]: value }
      }));
    } else {
      setFilterValues(prev => ({
        ...prev,
        [filterName]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!selectedFilter) return alert("Please select at least one filter");

  let url = "";
  switch (selectedFilter) {
    case "type":
      if (!filterValues.type) return alert("Select a type");
      url = `http://localhost:5000/api/events/filter/type/${encodeURIComponent(filterValues.type)}`;
      break;
    case "area":
      if (!filterValues.area) return alert("Select an area");
      url = `http://localhost:5000/api/events/filter/area/${encodeURIComponent(filterValues.area)}`;
      break;
    case "date":
      if (!filterValues.date.from || !filterValues.date.to) return alert("Select both dates");
      url = `http://localhost:5000/api/events/filter/date?fromDate=${filterValues.date.from}&toDate=${filterValues.date.to}`;
      break;
    default: return;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (onFilter) onFilter(data.events || []); // fallback to empty array
    handleState(); // close modal
  } catch (err) {
    console.error("Filter fetch error:", err);
    alert("Failed to fetch filtered events");
    if (onFilter) onFilter([]); // fallback
  }
};


  const isFilterSelected = (filterName) => {
    return selectedFilter === filterName;
  };

  return (
    <div className="filter-modal-body">
      <div className="modal-header">
        <h5 className="title">Filter By</h5>
        <button className="x-btn" onClick={handleState}>
          <img src="/assets/icons/x_btn.svg" alt="close" />
        </button>
      </div>

      <form className="filter-body-content" onSubmit={handleSubmit}>
        {/* Type Dropdown */}
        <div>
          <Checkbox 
            boxLabel="Type" 
            boxCount="checkbox-type" 
            checked={isFilterSelected('type')} 
            onChange={e => handleCheckbox("type", e.target.checked)} 
          />
          {isFilterSelected('type') && (
            <div className="dropdown-field">
              <label htmlFor="type">Select Type:</label>
              <select
                id="type"
                value={filterValues.type}
                onChange={e => handleInputChange("type", "value", e.target.value)}
                required
                className="filter-dropdown"
              >
                <option value="">-- Select Event Type --</option>
                {EVENT_TYPES.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Area Dropdown */}
        <div>
          <Checkbox 
            boxLabel="Area" 
            boxCount="checkbox-area" 
            checked={isFilterSelected('area')} 
            onChange={e => handleCheckbox("area", e.target.checked)} 
          />
          {isFilterSelected('area') && (
            <div className="dropdown-field">
              <label htmlFor="area">Select Area:</label>
              <select
                id="area"
                value={filterValues.area}
                onChange={e => handleInputChange("area", "value", e.target.value)}
                required
                className="filter-dropdown"
              >
                <option value="">-- Select Area --</option>
                {AREA_NAMES.map((area, index) => (
                  <option key={index} value={area}>{area}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Date Range */}
        <div>
          <Checkbox 
            boxLabel="Date" 
            boxCount="checkbox-date" 
            checked={isFilterSelected('date')} 
            onChange={e => handleCheckbox("date", e.target.checked)} 
          />
          {isFilterSelected('date') && (
            <div className="date-range-field">
              <div>
                <label htmlFor="fromDate">From</label>
                <InputField
                  fieldType="date"
                  fieldID="fromDate"
                  value={filterValues.date.from}
                  onChange={e => handleInputChange("date", "from", e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="toDate">To</label>
                <InputField
                  fieldType="date"
                  fieldID="toDate"
                  value={filterValues.date.to}
                  onChange={e => handleInputChange("date", "to", e.target.value)}
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div className="submit-div">
          <input type="submit" value="Filter" />
        </div>
      </form>
    </div>
  );
}