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
import "../components/styles/base_components/IconHolder.css";

export function Test(icon, label)
{
  return (
  <>
      <button className="icon-container">
        <img src={icon}></img>
        <p>{label}</p>
  </button>
  </>
  );
}
