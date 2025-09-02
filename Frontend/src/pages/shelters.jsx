import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./shelters.css";
import { AddShelter } from "../components/AddShelter";
import { FilterModal } from "../components/FilterPopup";
import { ViewShelterCard } from "../components/ViewShelterCard";

export function ShelterPage() {
  const [activeShelters, setActiveShelters] = useState([]);
  const [pastShelters, setPastShelters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showViewCardModal, setShowViewCardModal] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState(null);

 
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/shelters")
      .then((res) => {
        setActiveShelters(res.data);
        setPastShelters([]); 
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSaveShelter = (updatedData, action) => {
    if (action === "delete") {
      setActiveShelters((prev) =>
        prev.filter((s) => s.Shelter_id !== selectedShelter.Shelter_id)
      );
      setPastShelters((prev) =>
        prev.filter((s) => s.Shelter_id !== selectedShelter.Shelter_id)
      );
    } else {
      setActiveShelters((prev) =>
        prev.map((s) =>
          s.Shelter_id === selectedShelter.Shelter_id
            ? { ...s, ...updatedData }
            : s
        )
      );
      setPastShelters((prev) =>
        prev.map((s) =>
          s.Shelter_id === selectedShelter.Shelter_id
            ? { ...s, ...updatedData }
            : s
        )
      );
    }
    setShowViewCardModal(false);
  };

  const renderShelterCard = (s) => {
    const imageUrl = s.Shelter_image
      ? `http://localhost:5000/${s.Shelter_image}`
      : "/assets/images/shelter.jpg"; 

    return (
      <article
        key={s.Shelter_id}
        className="event-card"
        onClick={() => {
          setSelectedShelter(s);
          setShowViewCardModal(true);
        }}
      >
        <div className="card-img">
          <img src={imageUrl} alt={s.Shelter_name} />
        </div>
        <div className="card-info">
          <div className="card-title">{s.Shelter_name}</div>
          <div className="card-area">{s.Area_name}</div>
          <div className="card-meta">
            <div>
              <span className="meta-label">Total Capacity: </span>
              {s.Total_capacity}
            </div>
            <div>
              <span className="meta-label">Current Capacity: </span>
              {s.Current_capacity}
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="shelters-app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">আশ্রয়</div>
        </div>
        <nav className="side-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <i className="fa-solid fa-house" />
            <span>Home</span>
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <i className="fa-solid fa-bell" />
            <span>Events</span>
          </NavLink>
          <NavLink to="/shelters" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <i className="fa-solid fa-house-chimney" />
            <span>Shelters</span>
          </NavLink>
          <NavLink to="/volunteer" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <i className="fa-solid fa-users" />
            Volunteers
          </NavLink>
          <NavLink to="/donation" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <i className="fa-solid fa-dollar-sign" />
            Donations
          </NavLink>
          <a className="nav-item" href="#">
            <i className="fa-solid fa-boxes-stacked" />
            <span>Inventory</span>
          </a>
        </nav>
      </aside>

      <div className="shelters-main">
        <header className="shelters-header">
          <h2>Shelters</h2>
          <button className="add-btn" onClick={() => setShowPopup(true)}>
            Add
          </button>
        </header>

        <div className="shelters-body">
          <section className="section">
            <h3 className="section-title">Shelters</h3>
            <div className="cards-grid">
              {activeShelters.map(renderShelterCard)}
            </div>
          </section>

          {showPopup && (
            <div className="popup-backdrop">
              <AddShelter header="Shelter" handleState={() => setShowPopup(false)} />
            </div>
          )}

          {showFilterModal && (
            <div className="popup-backdrop">
              <FilterModal handleState={() => setShowFilterModal(false)} />
            </div>
          )}

          {showViewCardModal && selectedShelter && (
            <div className="popup-backdrop">
              <ViewShelterCard
                shelterId={selectedShelter.Shelter_id}
                image={selectedShelter.Shelter_image ? `http://localhost:5000/${selectedShelter.Shelter_image}` : "/assets/images/shelter.jpg"}
                name={selectedShelter.Shelter_name}
                area={selectedShelter.Area_name}
                total_capacity={selectedShelter.Total_capacity}
                current_capacity={selectedShelter.Current_capacity}
                handleState={() => setShowViewCardModal(false)}
                onSave={handleSaveShelter}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
