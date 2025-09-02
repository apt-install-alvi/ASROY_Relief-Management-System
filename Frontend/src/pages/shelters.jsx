import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./shelters.css";
import shelterImg from "/assets/images/shelter.jpg";
import { AddShelter } from "../components/old/AddShelter";
import { FilterModal } from "../components/old/FilterPopup";
import { ViewShelterCard } from "../components/old/ViewShelterCard";

export function ShelterPage() {
const [activeshelters, setActiveshelters] = useState(
  new Array(4).fill(0).map((_, i) => ({
    id: i + 1,
    name: "Motijheel Govt Boy's School",
    area: "Motijheel",
    total_capacity: 50,
    current_capacity: 43
  }))
);

  const pastshelters = new Array(4).fill(0).map((_, i) => ({
    id: i + 10,
    name: "Motijheel Govt Boy's School",
    area: "Motijheel",
    total_capacity: 50,
    current_capacity: 43
  }));

  const handleSaveEvent = (updatedData) => {
    setActiveshelters(prev => prev.map(ev => 
      ev.id === selectedEvent.id ? { 
        ...ev, 
        name: updatedData.name,
        area: updatedData.area,
        total_capacity: updatedData.total_capacity,
        current_capacity: updatedData.current_capacity
      } : ev
    ));
    setShowViewCardModal(false);
  };

  const [showPopup, setShowPopup] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(0);
  const [showViewCardModal, setShowViewCardModal] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  function closePopup()
  {
    setShowPopup(0);
  }

  function closeModal()
  {
    setShowFilterModal(0);
  }

  function closeView()
  {
    setShowViewCardModal(0);
  }
  
  return (
    <div className="shelters-app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">আশ্রয়</div>
        </div>

        <nav className="side-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <i className="fa-solid fa-house" />
            <span>Home</span>
          </NavLink>

          <NavLink to="/events" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <i className="fa-solid fa-bell" />
            <span>Events</span>
          </NavLink>

          
          <NavLink to="/shelters" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <i className="fa-solid fa-house-chimney" />
            <span>Shelters</span>
          </NavLink>

          <a className="nav-item" href="#">
            <i className="fa-solid fa-users" />
            <span>Volunteers</span>
          </a>
          <a className="nav-item" href="#">
            <i className="fa-solid fa-dollar-sign" />
            <span>Donations</span>
          </a>
          <a className="nav-item" href="#">
            <i className="fa-solid fa-boxes-stacked" />
            <span>Inventory</span>
          </a>
        </nav>
      </aside>

      
      <div className="shelters-main">
        <header className="shelters-header">
          <h2>Shelters</h2>
          <button className="add-btn" onClick={()=>setShowPopup(1)}>Add</button>
        </header>

        <div className="shelters-body">
          <section className="section">
            <h3 className="section-title">Active Shelters</h3>

            <div className="cards-grid">
              {activeshelters.map((ev) => (
                <article className="event-card" key={ev.id} onClick={() => {
                  setSelectedEvent(ev);
                  setShowViewCardModal(true);
                }}>
                  <div className="card-img">
                    <img src={shelterImg} alt={ev.name} />
                  </div>
                  <div className="card-info">
                    <div className="card-title">{ev.name}</div>
                    <div className="card-area">{ev.area}</div>
                    <div className="card-meta">
                      <div>
                        <span className="meta-label">Total Capacity: </span>
                        <span className="meta-value">{ev.total_capacity}</span>
                      </div>
                      <div>
                        <span className="meta-label">Current Capacity: </span>
                        <span className="meta-value">{ev.current_capacity}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section past-section">
            <h3 className="section-title">Past Shelters</h3>

            <button className="filter-btn" onClick={()=>setShowFilterModal(1)}>Filter</button>

            <div className="cards-grid">
              {pastshelters.map((ev) => (
                <article className="event-card" key={ev.id} onClick={() => {
                  setSelectedEvent(ev);
                  setShowViewCardModal(true);
                }}>
                  <div className="card-img">
                    <img src={shelterImg} alt={ev.name} />
                  </div>
                  <div className="card-info">
                    <div className="card-title">{ev.name}</div>
                    <div className="card-area">{ev.area}</div>
                    <div className="card-meta">
                      <div>
                        <span className="meta-label">Total Capacity: </span>
                        <span className="meta-value">{ev.total_capacity}</span>
                      </div>
                      <div>
                        <span className="meta-label">Time of Occurrence: </span>
                        <span className="meta-value">{ev.current_capacity}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {showPopup ?
            <div className="popup-backdrop"> 
              <AddShelter header="Shelter" handleState={closePopup}></AddShelter>
            </div>
            : null}
          
          {showFilterModal ?
            <div className="popup-backdrop"> 
              <FilterModal handleState={closeModal}></FilterModal>
            </div>
            : null}
          
          {(showViewCardModal && selectedEvent) ?
            <div className="popup-backdrop">
              <ViewShelterCard
                image={shelterImg}
                name={selectedEvent.name}
                area={selectedEvent.area}
                total_capacity={selectedEvent.total_capacity}
                current_capacity={selectedEvent.current_capacity}
                handleState={closeView}
                onSave={handleSaveEvent}
              />
            </div>
            : null}          
        </div>
      </div>
    </div>
  );
}
