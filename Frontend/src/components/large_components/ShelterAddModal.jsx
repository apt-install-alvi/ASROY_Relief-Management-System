import { ModalHeader } from "../base_components/ModalHeader";
import { InputWithLabel } from "../base_components/InputWithLabel";
import { AREA_NAMES, EVENT_TYPES } from "../../utils/constants";

// import { useState } from "react";


// export function ShelterAddModal({handleState, onAdd})
export function ShelterAddModal({handleState})
{
  // const [eventName, setEventName] = useState("");
  // const [areaName, setAreaName] = useState("");
  // const [date, setDate] = useState("");
  // const [time, setTime] = useState("");

  //Prevent prev values in the form from retaining
  // function resetForm()
  // {
  //   setEventName("");
  //   setAreaName("");
  //   setDate("");
  //   setTime("");
  // }

  // async function handleSubmit(e)
  // {
  //   e.preventDefault();

  //   // Convert time to MySQL TIME format (HH:MM:SS)
  //   function convertToMySQLTime(amPmTime)
  //   {
  //     // If time is already in 24-hour format (HH:MM), append ":00"
  //     if (!amPmTime.includes("AM") && !amPmTime.includes("PM"))
  //     {
  //       return `${amPmTime}:00`;
  //     }

  //     const [time, modifier] = amPmTime.split(" "); // ["08:30", "AM"]
  //     let [hours, minutes] = time.split(":").map(Number);

  //     if (modifier === "PM" && hours !== 12) hours += 12;
  //     if (modifier === "AM" && hours === 12) hours = 0;

  //     return `${hours.toString().padStart(2, "0")}
  //     :${minutes.toString().padStart(2, "0")}:00`;
  //   }

  //   const formattedTime = convertToMySQLTime(time);

  //   const formData = {
  //     eventName,
  //     areaName,
  //     date,
  //     time: formattedTime
  //   };

  //   try
  //   {
  //     const response = await fetch("http://localhost:5000/api/events/add",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(formData)
  //       });

  //     const data = await response.json();
  //     if (data.success) {
  //       const newEvent = {
  //         id: data.Event_id,
  //         title: eventName,
  //         area: areaName,
  //         date,
  //         time: formattedTime
  //       }

  //       if (onAdd) {
  //         onAdd(newEvent);
  //         handleState();
  //       }
  //       else {
  //         alert("Error: " + data.error);
  //       }
  //     }
  //   }
  //   catch (err)
  //   {
  //     console.error(err);
  //     alert("Something went wrong while adding the event");
  //   }
  // }

  return (
    <div className="modal">
      {/* <ModalHeader header="Add Event" handleState={() => { handleState(); resetForm();} }></ModalHeader> */}
      <ModalHeader header="Add Shelter" handleState={handleState}></ModalHeader>
      {/* <form className="inputs-in-modal" onSubmit={handleSubmit}> */}
      <form className="inputs-in-modal" >
        <InputWithLabel
          labelFor={"name"}
          label={"Name"}
          fieldType={"text"}>
        </InputWithLabel>

        <InputWithLabel
          labelFor={"area"} 
          label={"Area"} 
          listName={"area-list"}>
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
          ></InputWithLabel>

          <InputWithLabel
            className={"date-time-fields"}
            labelFor={"tot_cap"}
            label={"Total Capacity"}
            fieldType={"text"}
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