import { ModalHeader } from "../base_components/ModalHeader";
import { InputWithLabel } from "../base_components/InputWithLabel";
import { AREA_NAMES, EVENT_TYPES } from "../../utils/constants";
import { useState } from "react";
import { BASE_URL, safeParseJson } from "../../utils/api";

export function ShelterAddModal({handleState})
{
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    total_capacity: "",
    current_capacity: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(e)
  {
    e.preventDefault();

     if (!formData.name || !formData.area || !formData.total_capacity || !formData.current_capacity) {
      alert("All fields are required!");
      return;
    }
    try
    { 
      const res = await fetch(`${BASE_URL}/api/shelternew/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      
      const result = await safeParseJson(res);
      if (!res.ok)
        throw new Error(result.error || "Failed to add shelter");
        
        alert("Shelter added successfully.");
        handleState();
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
        <div className="modal-btn-position"><input type="submit" value="Add" className="red-btn"/></div>
      </form>
    </div>

  );
}