import React, { useState} from "react";
import { ModalHeader } from "../base_components/ModalHeader";
import { InputWithLabel } from "../base_components/InputWithLabel";
import { IconHolder } from "../base_components/IconHolder";
import "../styles/large_components/DonationAddModal.css";

export function DonationAddModal({handleState})
{
  const [isMoney, setIsMoney] = useState(false);
  const [isFood, setIsFood] = useState(false);
  const [isMedicine, setIsMedicine] = useState(false);
  const [isClothes, setIsClothes] = useState(false);
  const [isOthers, setIsOthers] = useState(false);

  const [formData, setFormData] = useState({
    event: "",
    donor: "",
    donation_type: "",
    amount: 100,
    item: "",
    quantity: 1
  });

  function handleSetIsMoney()
  {
    setIsMoney(true);
    setIsFood(false);
    setIsMedicine(false);
    setIsClothes(false);
    setIsOthers(false);
  }

  function handleSetIsFood()
  {
    setIsMoney(false);
    setIsFood(true);
    setIsMedicine(false);
    setIsClothes(false);
    setIsOthers(false);
  }
  function handleSetIsMedicine()
  {
    setIsMoney(false);
    setIsFood(false);
    setIsMedicine(true);
    setIsClothes(false);
    setIsOthers(false);
  }
  function handleSetIsClothes()
  {
    setIsMoney(false);
    setIsFood(false);
    setIsMedicine(false);
    setIsClothes(true);
    setIsOthers(false);
  }
  function handleSetIsOthers()
  {
    setIsMoney(false);
    setIsFood(false);
    setIsMedicine(false);
    setIsClothes(false);
    setIsOthers(true);
  }

  async function handleSubmit(e)
  {
    e.preventDefault();
    
    try
    {
        //jinish diye bhore dis
    }
    
    catch
    {
        //
    }
  };

  const handleChange = (field, value) =>
  {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="modal donation-modal">
        <ModalHeader header="Add Donation" handleState={handleState}></ModalHeader>
        <form onSubmit={handleSubmit}>
          <div className="inputs-in-modal-donation">
            <div className="left-container inputs-in-modal">
              <InputWithLabel
                listName={"active-events-list"}
                labelFor={"active-events"}
                label={"Event Name"}
                value={formData.event}
                onChange={(e)=>handleChange("event", e.target.value)}
              >
              </InputWithLabel>
              <datalist id="active-events-list">
                {/*ekhane option gula active events theke map kore dis */}
                <option></option>
              </datalist>
      
              <InputWithLabel
                labelFor={"donor-name"} 
                label={"Donor Name"} 
                fieldType={"text"}
                value={formData.donor}
                onChange={(e)=>handleChange("donor", e.target.value)}
              >
              </InputWithLabel>

            <div className="p-iconholder">
              <p>Donation Type</p>
              <div className="iconholder-container">
                <IconHolder
                  icon="/assets/icons/money.png"
                  label="Money"
                  onClick={handleSetIsMoney}
                ></IconHolder>
                <IconHolder
                  icon="/assets/icons/food.png"
                  label="Food"
                  onClick={handleSetIsFood}
                ></IconHolder>
                <IconHolder
                  icon="/assets/icons/medicine.png"
                  label="Medicine"
                  onClick={handleSetIsMedicine}
                ></IconHolder>
                <IconHolder
                  icon="/assets/icons/clothes.png"
                  label="Clothes"
                  onClick={handleSetIsClothes}
                ></IconHolder>
                  <IconHolder
                    icon="/assets/icons/others.png"
                    label="Others"
                    onClick={handleSetIsOthers}
                    ></IconHolder>
                </div>
              </div>
            </div>
          <div className="right-container inputs-in-modal">
          {isMoney && 
            <InputWithLabel
              labelFor={"money-amount"} 
              label={"Amount(Tk.)"} 
              fieldType={"number"}
              min={100}
              value={formData.amount}
              onChange={(e)=>handleChange("amount", e.target.value)}>
            </InputWithLabel>
          }

          {(isFood || isMedicine || isClothes || isOthers) ? 
          <div className="inputs-in-modal">
            <InputWithLabel
              labelFor={"item-name"} 
              label={"Item Name"} 
              fieldType={"text"}
              value={formData.item}
              onChange={(e)=>handleChange("item", e.target.value)}>
            </InputWithLabel>

            <InputWithLabel
              labelFor={"item-quantity"} 
              label={"Quantity"} 
              fieldType={"number"}
              min={1}
              value={formData.quantity}
              onChange={(e)=>handleChange("quantity", e.target.value)}>
            </InputWithLabel>
          </div>:null}
          </div>
          </div>
          <div className="modal-btn-position"><input type="submit" value="Add" className="red-btn" /></div>
        </form>
      </div>
    </>
  );
}
