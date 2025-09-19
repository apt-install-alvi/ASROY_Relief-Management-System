import { ModalHeader } from "../base_components/ModalHeader";
import { useState} from "react";
import { InputWithLabel } from "../base_components/InputWithLabel";
import { AREA_NAMES, EVENT_TYPES } from "../../utils/constants";
import { ButtonRed } from "../base_components/ButtonRed";
import { ButtonWhite } from "../base_components/ButtonWhite";
import axios from "axios";
import { BASE_URL } from "../../utils/api";

export function ViewShelterCard({shelterId, name, area, total_capacity, current_capacity, handleState, onSave})  
{
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: name || "",
    area: area || "",
    total_capacity: total_capacity || 0,
    current_capacity: current_capacity || 0,
  });
  const [originalData] = useState(editData);

  function handleEditClick()
  {
    setIsEditing(true);
  }

  function handleInputChange(field, value)
  {
    setEditData(prev => ({ ...prev, [field]: value }));
  }

  function handleCancel()
  {
    if (JSON.stringify(editData) !== JSON.stringify(originalData))
    {
      if (!window.confirm("Are you sure you want to cancel editing? Any changes you made will not be saved.")) return;
    }

    setEditData(originalData);
    setIsEditing(false);
  }

  async function handleSave()
  {
    try
    {        
      await axios.put(`${BASE_URL}/api/shelternew/update/${shelterId}`, editData);
      onSave(editData);
      setIsEditing(false);
      alert("Shelter updated successfully");
    }

    catch (err)
    {
      console.error(err);
      alert("Failed to update shelter");
    }
  }

  async function handleDeleteClick()
  {
    if (!window.confirm("Are you sure you want to delete this event?"))
      return;

    try
    {
      await axios.delete(`${BASE_URL}/api/shelternew/delete/${shelterId}`);
      alert("Shelter deleted successfully");
      handleState();
      onSave(null, "delete");
    }
    catch (err)
    {
      console.error(err);
      alert("Failed to delete shelter");
    }
  }

  return (
    <div className="modal">
      <ModalHeader header={"View Shelter"} handleState={handleState} onClick={isEditing ? handleCancel : handleState}></ModalHeader>
      
      {isEditing ? 
        <div className="inputs-in-modal">
           <InputWithLabel
            labelFor={"name"} 
            label={"Name"}
            fieldType={"text"}
            value={editData.name}
            onChange={(e)=>handleInputChange("name", e.target.value)}
          ></InputWithLabel> 

          <InputWithLabel
            labelFor={"area"} 
            label={"Area"} 
            listName={"area-list"} 
            value={editData.area} 
            onChange={(e) => handleInputChange("area", e.target.value)}>
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
              value={editData.current_capacity} 
              onChange={(e) => handleInputChange("current_capacity", e.target.value)}>
            </InputWithLabel>
 
            <InputWithLabel
              className={"date-time-fields"}
              labelFor={"tot_cap"}
              label={"Total capacity"}
              fieldType={"text"}
              value={editData.total_capacity} 
              onChange={(e) => handleInputChange("total_capacity", e.target.value)}
            ></InputWithLabel>
          </div>
        </div>
        : 
        <div className="inputs-in-modal">
           <InputWithLabel labelFor={"name"} label={"Name"} value={editData.name}></InputWithLabel>
           <InputWithLabel labelFor={"area"} label={"Area"} value={editData.area}></InputWithLabel>
           <InputWithLabel labelFor={"curr_cap"}  label={"Current Capacity"} value={editData.current_capacity}></InputWithLabel>
           <InputWithLabel labelFor={"tot_cap"} label={"Total Capacity"} value={editData.total_capacity}></InputWithLabel>
         </div>}

      <div className="modal-btn-position">
        {isEditing ?
          <ButtonRed btnText={"Save"} onClick={handleSave}></ButtonRed>
          :
          <>
            <ButtonWhite btnText={"Delete"} onClick={handleDeleteClick}></ButtonWhite>
            <ButtonRed btnText={"Edit"} onClick={handleEditClick}></ButtonRed>
          </>
         }
      </div>
    </div>
  );
}