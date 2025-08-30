import "../components/styles/Sidebar.css";
import { ButtonSidebar } from "../components/ButtonSidebar";

export function Sidebar()
{
  return (
    <>
      <nav className="sidebar">
        <div className="sidebar-top">
          <img src="/assets/icons/logo_white.svg"></img>
          <p>আশ্রয়</p>
        </div>
        <ButtonSidebar link={"/"} icon={"/assets/icons/Home.svg"} btnText={"Home"}></ButtonSidebar>
        <ButtonSidebar link={"/events"} icon={"/assets/icons/Events.svg"} btnText={"Events"}></ButtonSidebar>
        <ButtonSidebar link={"/shelters"} icon={"/assets/icons/Shelter.svg"} btnText={"Shelters"}></ButtonSidebar>
        <ButtonSidebar link={"/"} icon={"/assets/icons/Volunteer.svg"} btnText={"Volunteers"}></ButtonSidebar>
        <ButtonSidebar link={"/"} icon={"/assets/icons/Donation.svg"} btnText={"Donations"}></ButtonSidebar>
        <ButtonSidebar link={"/"} icon={"/assets/icons/Inventory.svg"} btnText={"Inventory"}></ButtonSidebar>
      </nav>      
    </>
  )
}