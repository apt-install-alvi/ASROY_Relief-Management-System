import React, { useState, useEffect } from "react";
import { VolunteerAddModal } from "../components/large_components/VolunteerAddModal";
import { ViewVolunteerCard } from "../components/large_components/ViewVolunteerCard";
import { FilterModal } from "../components/old/FilterPopup";
import { BASE_URL, safeParseJson } from "../utils/api";
import { Sidebar } from "../components/large_components/Sidebar";
import { Header } from "../components/base_components/Header";
import { ButtonRed } from "../components/base_components/ButtonRed";
import { ButtonWhite } from "../components/base_components/ButtonWhite";
import { Card } from "../components/base_components/Card";
import { SubHeader } from "../components/base_components/SubHeader";
import "../pages_new/styles/inventory.css";
import { InventoryTypeCard } from "../components/large_components/InventoryTypeCard";
import { addInventoryItem } from "../utils/InventoryAPI";
import { ModalHeader } from "../components/base_components/ModalHeader";
import { InputWithLabel } from "../components/base_components/InputWithLabel";

const PLACEHOLDER = "/assets/images/volunteer_default.jpg";

export function Test({ handleState, onItemAdded })
{
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    quantity: 0,
    status: "In Stock"
  });

  async function handleSubmit(e)
  {
    e.preventDefault();
    
    try
    {
      await addInventoryItem(formData);
      onItemAdded();
      handleState();
      setFormData({ name: "", type: "Food", quantity: 0, status: "In Stock" });
    }
    
    catch (error)
    {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  const handleChange = (e) =>
  {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div className="modal">
        <ModalHeader header="Add Event" handleState={handleState}></ModalHeader>
        <form className="inputs-in-modal" onSubmit={handleSubmit}>
          <InputWithLabel
            labelFor={"name"}
            label={"Name"}
            fieldType={"text"}
            placeholderTxt={"E.g - Rice (kg)"}
            value={formData.name}
            onChange={(e)=>handleChange("name", e.target.value)}
          >
          </InputWithLabel>
  
          <InputWithLabel
            labelFor={"category"} 
            label={"Category"} 
            listName={"type-list"}
            value={formData.type}
            onChange={(e)=>handleChange("category", e.target.value)}
          >
          </InputWithLabel>
          <datalist id="type-list">
            <option>Food</option>
            <option>Medicine</option>
            <option>Clothes</option>
            <option>Others</option>
          </datalist>
        
          {/* <div className="add-date-time-inputs"> */}
            <InputWithLabel
              // className={"date-time-fields"}
              labelFor={"stock"}
              label={"Stock"}
              fieldType={"text"}
              placeholderTxt={"E.g - 50"}
              value={formData.stock}
              onChange={(e)=>handleChange("stock", e.target.value)}
            ></InputWithLabel>
      
          <div className="modal-btn-position"><input type="submit" value="Add" className="red-btn"/></div>
        </form>
      </div>
    </>
  );
}
