import { useState } from "react";
import "./Add_Popup.css"
import { InputField } from "./InputField";

export function AddPopup({header, handleState})
{
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  return (
      <div className="popup-body">
        <div className="popup-header"> 
          <h4 className="title">Add {header}</h4>
          <button className="x-btn" onClick={handleState}><img src="/assets/icons/x_btn.svg"/></button>
        </div>
        <form>
          <label htmlFor="name" className="label-name">Name</label>
          <input className="input-field" type="text" id="name" placeholder="E.g-Flood"/>
          <label htmlFor="area" className="label-name">Area</label>
          <select id="area" className="dropdown"> {/*Dummy data, populate later with area from database*/}
            <option value="Dhaka">Dhaka</option>
            <option value="Khulna">Khulna</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Kushtia">Kushtia</option>
          </select>

          <div className="date-time-field">
            <div>
              <label htmlFor="date" className="label-name">Date</label>
              <input className="date-field" type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <label htmlFor="time" className="label-name">Time</label>
              <input className="time-field" type="time" id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>

          <div>
            <input type="submit" value="Add" className="popup-add-btn" />
          </div>
        </form>
      </div>
  );
}