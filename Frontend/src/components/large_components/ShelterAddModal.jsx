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

  const [file, setFile] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  function handleFileChange(e) 
  {
    const selectedFile = e.target.files[0];
    console.log("Selected file:", selectedFile);
    if (selectedFile)
    {
      console.log("File name:", selectedFile.name);
      console.log("File size:", selectedFile.size);
      console.log("File type:", selectedFile.type);
    }
    setFile(selectedFile);
  };

  async function handleSubmit(e)
  {
    e.preventDefault();

    try
    { 
      const data = new FormData();
      data.append("name", formData.name);
      data.append("area", formData.area);
      data.append("total_capacity", formData.total_capacity);
      data.append("current_capacity", formData.current_capacity);
      if (file) data.append("image", file);

      const res = await fetch(`${BASE_URL}/api/shelternew/add`,
      {
        method: "POST",
        body: data
      });

      
      const result = await safeParseJson(res);
      if (!res.ok)
        throw new Error(result.error || "Failed to add shelter");

      if (result.success && result.shelter)
      {
        const createdShelter = result.shelter;

        // Normalize image path
        if (createdShelter.Shelter_image)
        {
          createdShelter.Shelter_image = createdShelter.Shelter_image.startsWith("http") ?
            createdShelter.Shelter_image : `${BASE_URL}${createdShelter.Shelter_image}`;
        }
        
        alert("Shelter added successfully.");
        handleState();
      }
      
      else
      {
        throw new Error("Invalid response from server");
      }

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
          fieldType={"file"}
          onChange={handleFileChange}
        >
        </InputWithLabel>
        <div className="modal-btn-position"><input type="submit" value="Add" className="red-btn"/></div>
      </form>
    </div>

  );
}