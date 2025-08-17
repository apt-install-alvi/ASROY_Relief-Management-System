import { useState } from "react";
import "./Add_Popup.css"
import { InputField } from "./InputField";

export function AddPopup({ header, handleState }) {
  const [eventName, setEventName] = useState("");
  const [areaName, setAreaName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

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

  const eventNames = ["Flood", "Cyclone", "Landslide", "Earthquake", "Drought", "Fire"];

  // Reset form fields
  const resetForm = () => {
    setEventName("");
    setAreaName("");
    setDate("");
    setTime("");
  };

  const handleClose = () => {
    resetForm();
    handleState(); // Close popup
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Convert time to MySQL TIME format (HH:MM:SS)
  const convertToMySQLTime = (amPmTime) => {
    // If time is already in 24-hour format (HH:MM), just append ":00"
    if (!amPmTime.includes("AM") && !amPmTime.includes("PM")) {
      return `${amPmTime}:00`;
    }

    const [time, modifier] = amPmTime.split(" "); // ["08:30", "AM"]
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:00`;
  };

  const formattedTime = convertToMySQLTime(time);

  const formData = {
    eventName,
    areaName,
    date,
    time: formattedTime, // send converted time
  };

  try {
    const response = await fetch("http://localhost:5000/api/events/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.success) {
      alert(`Event added successfully! ID: ${data.Event_id}`);
      handleClose(); // Reset and close popup
    } else {
      alert("Error: " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong while adding the event");
  }
};


  return (
      <div className="popup-body">
        <div className="popup-header"> 
          <h4 className="title">Add {header}</h4>
          <button className="x-btn" onClick={handleState}><img src="/assets/icons/x_btn.svg"/></button>
        </div>

      <form onSubmit={handleSubmit}>
        {/* Event Name */}
        <label htmlFor="name" className="label-name">Event Name</label>
        <input
          list="event-list"
          className="input-field"
          id="name"
          name="name"
          placeholder="E.g-Flood"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
        <datalist id="event-list">
          {eventNames.map((ev, idx) => (
            <option key={idx} value={ev} />
          ))}
        </datalist>

        {/* Area Name */}
        <label htmlFor="area" className="label-name">Area</label>
        <input
          list="area-list"
          className="input-field"
          id="area"
          name="area"
          placeholder="Select or type district"
          value={areaName}
          onChange={(e) => setAreaName(e.target.value)}
          required
        />
        <datalist id="area-list">
          {areaNames.map((area, idx) => (
            <option key={idx} value={area} />
          ))}
        </datalist>

        {/* Date and Time */}
        <div className="date-time-field">
          <div>
            <label htmlFor="date" className="label-name">Date</label>
            <input
              className="date-field"
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="label-name">Time</label>
            <input
              className="time-field"
              type="time"
              id="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <input type="submit" value="Add" className="popup-add-btn" />
        </div>
      </form>
    </div>
  );
}
