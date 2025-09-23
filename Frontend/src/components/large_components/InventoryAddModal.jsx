import { useState } from "react";
import { addInventoryItem } from "../../utils/InventoryAPI"
import { ModalHeader } from "../base_components/ModalHeader";
import { InputWithLabel } from "../base_components/InputWithLabel";


export function InventoryAddModal({ handleState, onItemAdded })
{
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    quantity: "",
  });

  async function handleSubmit(e)
  {
    e.preventDefault();
    
    try
    {
      await addInventoryItem(formData);
      onItemAdded();
      handleState();
      setFormData({ name: "", type: "", quantity: 0});
    }
    
    catch (error)
    {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
            labelFor={"type"} 
            label={"Category"} 
            listName={"type-list"}
            value={formData.type}
            onChange={(e)=>handleChange("type", e.target.value)}
          >
          </InputWithLabel>
          <datalist id="type-list">
            <option>Food</option>
            <option>Medicine</option>
            <option>Clothes</option>
            <option>Others</option>
          </datalist>
        
            <InputWithLabel
              labelFor={"quantity"}
              label={"Stock"}
              fieldType={"number"}
              min={1}
              value={formData.quantity}
              onChange={(e)=>handleChange("quantity", e.target.value)}
            ></InputWithLabel>
      
          <div className="modal-btn-position"><input type="submit" value="Add" className="red-btn"/></div>
        </form>
      </div>
    </>
  );
}
