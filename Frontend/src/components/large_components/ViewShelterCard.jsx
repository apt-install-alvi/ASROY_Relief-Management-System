import { ModalHeader } from "../base_components/ModalHeader";
// import { useState } from "react";
// import { formatDateForInput } from "../../utils/formatDateInput";
// import { formatTimeForInput } from "../../utils/formatTimeInput";
import { InputWithLabel } from "../base_components/InputWithLabel";
import { Checkbox } from "../base_components/Checkbox";
import { AREA_NAMES, EVENT_TYPES } from "../../utils/constants";
import { ButtonRed } from "../base_components/ButtonRed";
import { ButtonWhite } from "../base_components/ButtonWhite";

// export function ViewEventCard({
//   eventId,
//   type,
//   area,
//   date,
//   time,
//   status,
//   handleState,
//   onUpdate,
//   onDelete })
export function ViewShelterCard({handleState})
  
{
  // const [isEditing, setIsEditing] = useState(false);

  // const initialEditData = {
  //   type: type || "",
  //   area: area || "",
  //   date: date ? formatDateForInput(date) : "",
  //   time: time ? formatTimeForInput(time) : "",
  //   isInactive: status === "Not Active"
  // };

  // const [editData, setEditData] = useState(initialEditData);
  // const [originalData] = useState(initialEditData);

  // function handleEditClick()
  // {
  //   setIsEditing(true);
  // }

  // function handleInputChange(field, value)
  // {
  //   setEditData(prev => ({ ...prev, [field]: value }));
  // }

  // function handleCancel()
  // {
  //   if (JSON.stringify(editData) !== JSON.stringify(originalData))
  //   {
  //     if (!window.confirm("Are you sure you want to cancel editing? Any changes you made will not be saved.")) return;
  //   }

  //   setEditData(originalData);
  //   setIsEditing(false);
  // }

  // async function handleSave()
  // {
  //   try
  //     {
  //       const response = await fetch(`http://localhost:5000/api/events/edit/${eventId}`,
  //         {
  //           method: "PUT",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             eventName: editData.type,
  //             areaName: editData.area,
  //             date: editData.date,
  //             time: editData.time.length === 5 ? editData.time + ":00" : editData.time,
  //             status: editData.isInactive ? "Not Active" : "Active"
  //           })
  //         }
  //       );

  //     const data = await response.json();
  //     if (!data.success)
  //       throw new Error(data.error || "Update failed");

  //     onUpdate({
  //       Event_id: eventId,
  //       Event_name: editData.type,
  //       area: editData.area,
  //       Date_of_occurrence: editData.date,
  //       Time_of_occurrence: editData.time,
  //       status: editData.isInactive ? "Not Active" : "Active"
  //     });

  //     setIsEditing(false);
  //   }
      
  //   catch (err)
  //   {
  //     alert(err.message);
  //     console.error(err);
  //   }
  // }

  // async function handleDeleteClick()
  // {
  //   if (!window.confirm("Are you sure you want to delete this event?")) return;

  //   try
  //   {
  //     const response = await fetch(`http://localhost:5000/api/events/delete/${eventId}`, { method: "DELETE" });
  //     const data = await response.json();

  //     if (!data.success)
  //       throw new Error(data.error || "Delete failed");

  //     if (onDelete) onDelete(eventId);
  //   }
    
  //   catch (err)
  //   {
  //     alert(err.message);
  //     console.error(err);
  //   }
  // }

  return (
    <div className="modal">
      <ModalHeader header={"View Shelter"} handleState={handleState}></ModalHeader>
      {/* <ModalHeader header={"View Event"} handleState={handleState} onClick={isEditing ? handleCancel : handleState}></ModalHeader>
      {isEditing ? 
        <div className="inputs-in-modal">
           <InputWithLabel
            labelFor={"name"} 
            label={"Name"} 
            value={editData.type}
            onChange={(e)=>handleInputChange("type", e.target.value)}
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
              value={editData.date} 
              onChange={(e) => handleInputChange("date", e.target.value)}>
            </InputWithLabel>
 
            <InputWithLabel
              className={"date-time-fields"}
              labelFor={"tot_cap"}
              label={"Total capacity"}
              fieldType={"text"}
              value={editData.time} 
              onChange={(e) => handleInputChange("time", e.target.value)}
            ></InputWithLabel>
          </div>
        </div>
        : */}
        {/* <div className="inputs-in-modal">
           <InputWithLabel labelFor={"type"} label={"Type"} value={editData.type}></InputWithLabel>
           <InputWithLabel labelFor={"area"} label={"Area"} value={editData.area}></InputWithLabel>
           <InputWithLabel labelFor={"date"}  label={"Date"} value={editData.date}></InputWithLabel>
           <InputWithLabel labelFor={"time"} label={"Time"} value={editData.time}></InputWithLabel>
           <InputWithLabel labelFor={"status"} label={"Status"} value={editData.isInactive ? "Not Active" : "Active"}></InputWithLabel>
         </div> */}
      
        <div className="inputs-in-modal">
          <InputWithLabel labelFor={"name"} label={"Name"}></InputWithLabel>
          <InputWithLabel labelFor={"area"} label={"Area"}></InputWithLabel>
          <div className="add-date-time-inputs">
            <InputWithLabel labelFor={"curr_cap"}  label={"Current Capacity"} className={"date-time-fields"}></InputWithLabel>
            <InputWithLabel labelFor={"tot_cap"} label={"Total Capacity"} className={"date-time-fields"}></InputWithLabel>
          </div>
          
        </div>
      {/* } */}

      <div className="modal-btn-position">
        {/* {isEditing ?
          // <ButtonRed btnText={"Save"} onClick={handleSave}></ButtonRed>
          // :
          // <>
          //   <ButtonWhite btnText={"Delete"} onClick={handleDeleteClick}></ButtonWhite>
          //   <ButtonRed btnText={"Edit"} onClick={handleEditClick}></ButtonRed>
          // </>
         } */}
            <ButtonWhite btnText={"Delete"}></ButtonWhite>
            <ButtonRed btnText={"Edit"}></ButtonRed> 
      </div>
    </div>
  );
}