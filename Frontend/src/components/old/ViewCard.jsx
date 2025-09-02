import React, { useState } from "react";
import "./ViewCard.css";
import { InputField } from "../base_components/InputField"; 
import { formatTimeForInput } from "../../utils/formatTimeInput";
import { formatDateForInput } from "../../utils/formatDateInput";
import { formatTimeForDisplay } from "../../utils/formatTimeDisplay";


export function ViewCard({ image, type, area, date, time, handleState, onSave })
{
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ 
      type, 
      area, 
      date: formatDateForInput(date),
      time: formatTimeForInput(time)
      });
    const [originalData] = useState({ type, area, date, time });

    const handleEditClick = () => {
      setIsEditing(true);
    };

    const handleSave = () => {
    const [year, month, day] = editData.date.split('-');
    const formattedDate = `${day}/${month}/${year.slice(2)}`;
    
    const [hours, minutes] = editData.time.split(':');
    let period = 'am';
    let displayHours = hours;
    
    if (hours > 12) {
      displayHours = String(hours - 12).padStart(2, '0');
      period = 'pm';
    } else if (hours === '12') {
      period = 'pm';
    } else if (hours === '00') {
      displayHours = '12';
    }

    const formattedTime = `${displayHours}:${minutes} ${period}`;

    const updatedData = {
      title: editData.type,  
      area: editData.area,
      date: formattedDate,
      time: formattedTime
    };
    
    onSave(updatedData);
    setIsEditing(false);
  };


    const handleCancel = () => {
      if (JSON.stringify(editData) !== JSON.stringify(originalData)) {
        const confirmCancel = window.confirm(
          "Are you sure you want to cancel editing? Any changes you made will not be saved."
        );
        if (!confirmCancel) return;
      }
      setEditData(originalData);
      setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
      setEditData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <div className="viewcard-body">
      <div className="modal-header">
        <h5 className="title">View Event</h5>
        <button className="x-btn" onClick={isEditing ? handleCancel : handleState}><img src="/assets/icons/x_btn.svg"/></button>
      </div>
      <img className="view-img" src={image} />
       {isEditing ? 
        <>
          <div className="edit-field">
            <label htmlFor="type">Type: </label>
            <InputField 
              fieldType="text" 
              fieldID="type" 
              value={editData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
            />
          </div>
          <div className="edit-field">
            <label htmlFor="area">Area: </label>
            <InputField 
              fieldType="text" 
              fieldID="area" 
              value={editData.area}
              onChange={(e) => handleInputChange("area", e.target.value)}
            />
          </div>
          <div className="edit-field">
            <label htmlFor="date">Date: </label>
            <InputField 
              fieldType="date"
              fieldID="date" 
              value={editData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
          </div>
          <div className="edit-field">
            <label htmlFor="time">Time: </label>
            <InputField 
              fieldType="time"
              fieldID="time" 
              value={editData.time}
              onChange={(e) => handleInputChange("time", e.target.value)}
            />
          </div>
        </>
        : <>
          <p className="data"><span>Type: </span>{editData.type}</p>
          <p className="data"><span>Area: </span>{editData.area}</p>
          <p className="data"><span>Date: </span>{editData.date}</p>
          <p className="data"><span>Time: </span>{formatTimeForDisplay(editData.time)}</p>
        </>
      }

      <div className="edit-delete-btn-container">
        {isEditing ? 
          <button className="save-btn" onClick={handleSave}>Save</button> 
          : <>
            <button className="delete-btn" onClick={() => {
              const confirmDelete = window.confirm(
                "Are you sure you want to delete?"
              );
              if (!confirmDelete) return;
              }
            }>Delete</button>
            <button className="edit-btn" onClick={handleEditClick}>Edit</button>

          </>
        }
      </div>

    </div>
  );
}
