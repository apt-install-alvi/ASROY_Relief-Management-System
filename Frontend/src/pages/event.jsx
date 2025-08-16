import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./event.css";
import eventImg from "/assets/images/flood.jpeg";
import { AddPopup } from "../components/Add_Popup";
import { FilterModal } from "../components/FilterPopup";

export function EventPage() {
  const activeEvents = new Array(4).fill(0).map((_, i) => ({
    id: i + 1,
    title: "Flood",
    area: "Kushtia Upazila",
    date: "12/07/25",
    time: "08:53 am",
  }));

  const pastEvents = new Array(4).fill(0).map((_, i) => ({
    id: i + 10,
    title: "Flood",
    area: "Kushtia Upazila",
    date: "12/07/25",
    time: "08:53 am",
  }));

  const [showPopup, setShowPopup] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(0);

  function closePopup()
  {
    setShowPopup(0);
  }

  function closeModal()
  {
    setShowFilterModal(0);
  }
  
  return (
    <div className="events-app">
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

          <a className="nav-item" href="#">
            <i className="fa-solid fa-house-chimney" />
            <span>Shelters</span>
          </a>
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

      
      <div className="events-main">
        <header className="events-header">
          <h2>Events</h2>
          <button className="add-btn" onClick={()=>setShowPopup(1)}>Add</button>
        </header>

        <div className="events-body">
          <section className="section">
            <h3 className="section-title">Active Events</h3>

            <div className="cards-grid">
              {activeEvents.map((ev) => (
                <article className="event-card" key={ev.id}>
                  <div className="card-img">
                    <img src={eventImg} alt={ev.title} />
                  </div>
                  <div className="card-info">
                    <div className="card-title">{ev.title}</div>
                    <div className="card-area">{ev.area}</div>
                    <div className="card-meta">
                      <div>
                        <span className="meta-label">Date of Occurrence :</span>{" "}
                        <span className="meta-value">{ev.date}</span>
                      </div>
                      <div>
                        <span className="meta-label">Time of Occurrence :</span>{" "}
                        <span className="meta-value">{ev.time}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section past-section">
            <h3 className="section-title">Past Events</h3>

            <button className="filter-btn" onClick={()=>setShowFilterModal(1)}>Filter</button>

            <div className="cards-grid">
              {pastEvents.map((ev) => (
                <article className="event-card" key={ev.id}>
                  <div className="card-img">
                    <img src={eventImg} alt={ev.title} />
                  </div>
                  <div className="card-info">
                    <div className="card-title">{ev.title}</div>
                    <div className="card-area">{ev.area}</div>
                    <div className="card-meta">
                      <div>
                        <span className="meta-label">Date of Occurrence :</span>{" "}
                        <span className="meta-value">{ev.date}</span>
                      </div>
                      <div>
                        <span className="meta-label">Time of Occurrence :</span>{" "}
                        <span className="meta-value">{ev.time}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {showPopup ?
            <div className="popup-backdrop"> 
              <AddPopup header="Event" handleState={closePopup}></AddPopup>
            </div>
            : null}
          
          {showFilterModal ?
            <div className="popup-backdrop"> 
              <FilterModal handleState={closeModal}></FilterModal>
            </div>
            : null}
        </div>
      </div>
    </div>
  );
}
