import { ModalHeader } from "../base_components/ModalHeader";
import { InputWithLabel } from "../base_components/InputWithLabel";
import { AREA_NAMES, EVENT_TYPES } from "../../utils/constants";
import { useState } from "react";

export function ShelterAddModal({handleState})
{
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    total_capacity: "",
    current_capacity: "",
  });

  // const [filteredAreas, setFilteredAreas] = useState(AREA_NAMES);
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // filter areas as user types
    // if (field === "area") {
    // const filtered = AREA_NAMES.filter((a) =>
    // a.toLowerCase().includes(value.toLowerCase())
    // );
    // setFilteredAreas(filtered);
    // setDropdownOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, area, total_capacity, current_capacity } = formData;

    if (!name || !area || !total_capacity || !current_capacity) {
      alert("All fields are required!");
      return;
    }

    try
    {   
      const res = await fetch("http://localhost:5000/api/shelternew/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, area, total_capacity, current_capacity }),
      });

      if (!res.ok)
      {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      // const result = await res.json();
      // alert("Shelter added!");
      // handleState();
    }
    
    catch (err)
    {
      console.error(err);
      alert("Failed to add shelter: " + err.message);
    }
  };

  return (
    <div className="modal">
      <ModalHeader header="Add Shelter" handleState={handleState}></ModalHeader>
      <form className="inputs-in-modal" onSubmit={handleSubmit}>
        <InputWithLabel
          labelFor={"name"}
          label={"Name"}
          fieldType={"text"}
          placeholderTxt={"E.g - Khulna Central Masjid"}
          value={formData.name}
          onChange={(e)=>handleChange("name", e.target.value)}
        >
        </InputWithLabel>

        <InputWithLabel
          labelFor={"area"} 
          label={"Area"} 
          listName={"area-list"}
          placeholderTxt={"Select Area"}
          value={formData.area}
          onChange={(e)=>handleChange("area", e.target.value)}
        >
        </InputWithLabel>
        <datalist id="area-list">
          {AREA_NAMES.map((area, idx) => (
          <option key={idx} value={area} />
          ))}
        </datalist>
      
        <div className="add-date-time-inputs">
          <InputWithLabel
            className={"date-time-fields"}
            labelFor={"curr_cap"}
            label={"Current Capacity"}
            fieldType={"text"}
            placeholderTxt={"E.g - 50"}
            value={formData.current_capacity}
            onChange={(e)=>handleChange("current_capacity", e.target.value)}
          ></InputWithLabel>

          <InputWithLabel
            className={"date-time-fields"}
            labelFor={"tot_cap"}
            label={"Total Capacity"}
            fieldType={"text"}
            placeholderTxt={"E.g - 100"}
            value={formData.total_capacity}
            onChange={(e)=>handleChange("total_capacity", e.target.value)}
          ></InputWithLabel>

        </div>
        <InputWithLabel
          labelFor={"shelter-img"}
          label={"Image"}
          fieldType={"file"}>
        </InputWithLabel>
        <div className="modal-btn-position"><input type="submit" value="Add" className="red-btn"/></div>
      </form>
    </div>

  );
}