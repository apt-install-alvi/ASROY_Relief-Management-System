import { NavLink } from "react-router-dom";
import "../components/styles/ButtonSidebar.css";

export function ButtonSidebar( {link, icon, btnText} )
{
  return (
    <>
      <NavLink to={link} className={({ isActive }) => (isActive ? "sidebar-btn-active" : "sidebar-btn")}>
        <img src={icon}></img>
        <span>{btnText}</span>
      </NavLink>
    </>
  )
}