import "../components/styles/EventAddModal.css";
import { ButtonRed } from "../components/ButtonRed";
import { ModalHeader } from "../components/ModalHeader";
import { InputWithLabel } from "../components/InputWithLabel";

import { useState } from "react";


const eventNames = ["Flood", "Cyclone", "Landslide", "Earthquake", "Drought", "Fire"];
const areaNames = [
  "Bagerhat", "Bandarban", "Barguna", "Barisal", "Bhola", "Bogura", "Brahmanbaria",
  "Chandpur", "Chapai Nawabganj", "Chattogram", "Chuadanga", "Coxs Bazar", "Cumilla",
  "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj",
  "Habiganj", "Jamalpur", "Jashore", "Jhalokathi", "Jhenaidah", "Joypurhat",
  "Khagrachhari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur",
  "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar",
  "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi",
  "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh",
  "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur",
  "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet",
  "Tangail", "Thakurgaon"
];

export function EventAddModal({handleState})
{
  const [eventName, setEventName] = useState("");
  const [areaName, setAreaName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div className="modal">
        <ModalHeader header="Add Event" handleState={handleState}></ModalHeader>
        <div className="inputs-in-modal">
          <InputWithLabel
          labelFor={"name"}
          label={"Name"}
          listName="event-list"
          fieldID={"name"}
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}>
        </InputWithLabel>
        <datalist id="event-list">
          {eventNames.map((ev, idx) => (
            <option key={idx} value={ev} />
          ))}
        </datalist>

        <InputWithLabel
          labelFor={"area"} 
          label={"Area"} 
          listName={"area-list"} 
          fieldID="area" 
          value={areaName} 
          onChange={(e) => setAreaName(e.target.value)}>
        </InputWithLabel>
        <datalist id="area-list">
          {areaNames.map((area, idx) => (
          <option key={idx} value={area} />
          ))}
        </datalist>
        
        <div className="date-time-inputs">
          <InputWithLabel
          className={"date-time-fields"}
          labelFor={"date"}
          label={"Date"}
          fieldType={"date"}
          fieldID="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
        ></InputWithLabel>

          <InputWithLabel
            className={"date-time-fields"}
            labelFor={"time"}
            label={"Time"}
            fieldType={"time"}
            fieldID="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)}
          ></InputWithLabel>
        </div>
        </div>
        <div className="modal-btn-position"><ButtonRed btnText={"Add"}></ButtonRed></div>  
    </div>

  );
}