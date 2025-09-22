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

const PLACEHOLDER = "/assets/images/volunteer_default.jpg";

export function Test() {
  const thresholdStock = 20;
  const quantity = 30;

  return (
    <>
      <Sidebar></Sidebar>
      <Header title={"Inventory"}></Header>
      <main>
        <div className="warning">
          <div className="warning-title">
            <img src="/assets/icons/alert-triangle.svg"></img>
            <p>Warning! Stock low for the following items: </p>
            {/*Take input from db for low stock table*/}
          </div>
            <div className="warning-items">
              <p className="warning-item">Test</p>
              <p className="warning-item">Test</p>
            </div>
        </div>
        
        <div className="inv-stock-overview">
          <InventoryTypeCard
            stockValue={150}
            label={"Food"}
            icon={"/assets/icons/food.png"}
          ></InventoryTypeCard>
 
          <InventoryTypeCard
            stockValue={150}
            label={"Medicine"}
            icon={"/assets/icons/medicine.png"}
          ></InventoryTypeCard>
 
          <InventoryTypeCard
            stockValue={150}
            label={"Clothes"}
            icon={"/assets/icons/clothes.png"}
          ></InventoryTypeCard>
 
          <InventoryTypeCard
            stockValue={150}
            label={"Others"}
            icon={"/assets/icons/others.png"}
          ></InventoryTypeCard>
        </div>

        <div>
          <div className="inv-subheader">
            <SubHeader title={"Current Inventory"}></SubHeader>
            <div className="inv-add-btn-div">
              <ButtonRed btnText={"Add Item"}></ButtonRed>
              <input list="filter-inv" placeholder="Filter" className="inv-filter"></input>
              <datalist id="filter-inv">
                <option>Food</option>
                <option>Medicine</option>
                <option>Clothes</option>
                <option>Others</option>
                <option>None</option>
              </datalist>
            </div>
          </div>
          <div className="table-container">
            <table>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>

              <tr>
                <td>Rice</td>
                <td>Food</td>
                <td>{quantity}</td>
                <div>
                  {quantity > thresholdStock ?
                    <td className="in-stock">   In Stock</td>
                    :
                    <td className="low-stock">Low Stock</td>
                  }
                </div>

              </tr>

              <tr>
                <td>Paracetamol</td>
                <td>Medicine</td>
                <td>{quantity}</td>
                <div>
                  {quantity > thresholdStock ?
                    <td className="in-stock"> In Stock</td>
                    :
                    <td className="low-stock">Low Stock</td>
                  }
                </div>
              </tr>
            </table>
           </div>
        </div>
      </main>
    </>
  );
}
