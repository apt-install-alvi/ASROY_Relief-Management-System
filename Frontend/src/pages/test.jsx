import "../components/styles/test.css";
import { Card } from "../components/base_components/Card";
import { ButtonRed } from "../components/base_components/ButtonRed";
import { ButtonWhite } from "../components/base_components/ButtonWhite";
import { InputField } from "../components/base_components/InputField";
import { ModalHeader } from "../components/base_components/ModalHeader";
import { ButtonSidebar } from "../components/base_components/ButtonSidebar";
import { Header } from "../components/base_components/Header";
import { Sidebar } from "../components/large_components/Sidebar";
import { SubHeader } from "../components/base_components/SubHeader";
import { EventAddModal } from "../components/large_components/EventAddModal";
import { EventFilterModal } from "../components/large_components/EventFilterModal";

import { InputWithLabel } from "../components/base_components/InputWithLabel";

// import { useState, useEffect } from "react";
import { ViewEventCard } from "../components/large_components/ViewEventCard";
// import { formatTimeForDisplay } from "../utils/formatTimeDisplay";
// import { formatDateForDisplay } from "../utils/formatDateDisplay";
// import { assignImg } from "../utils/assignImg";
import { ShelterAddModal } from "../components/large_components/ShelterAddModal";

  
export function Test()
{

  return (
    <>
      <ShelterAddModal></ShelterAddModal>
      {/* <Sidebar></Sidebar> */}
    </>
  );
}