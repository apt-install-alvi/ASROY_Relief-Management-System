import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./event.css";
import eventImg from "/assets/images/flood.jpeg";
import { AddPopup } from "../components/Add_Popup";
import { FilterModal } from "../components/FilterPopup";
import { ViewCard } from "../components/ViewCard";
import { formatDateForDisplay } from "../utils/formatDateDisplay";
import { formatTimeForDisplay } from "../utils/formatTimeDisplay";


export function EventPage() {
  const [activeEvents, setActiveEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showViewCardModal, setShowViewCardModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/events/all")
      .then(res => res.json())
      .then(data => {
        const active = data.filter(ev => ev.Status === "Active");
        const inactive = data.filter(ev => ev.Status !== "Active");
        setActiveEvents(active);
        setPastEvents(inactive);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSaveEvent = (updatedData) => {
    if (!selectedEvent) return;

    // Update in active or past events
    if (selectedEvent.Status === "Active") {
      setActiveEvents(prev =>
        prev.map(ev => ev.Event_id === selectedEvent.Event_id ? { ...ev, ...updatedData } : ev)
      );
    } else {
      setPastEvents(prev =>
        prev.map(ev => ev.Event_id === selectedEvent.Event_id ? { ...ev, ...updatedData } : ev)
      );
    }

    setShowViewCardModal(false);
  };

  const closePopup = () => setShowPopup(false);
  const closeModal = () => setShowFilterModal(false);
  const closeView = () => setShowViewCardModal(false);

  return (
    <div className="events-app">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="events-main">
        <header className="events-header">
          <h2>Events</h2>
          <button className="add-btn" onClick={() => setShowPopup(true)}>Add</button>
        </header>

        <div className="events-body">
          {/* Active Events */}
          <section className="section">
            <h3 className="section-title">Active Events</h3>
            <div className="cards-grid">
              {activeEvents.map(ev => (
                <article className="event-card" key={ev.Event_id} onClick={() => {
                  setSelectedEvent(ev);
                  setShowViewCardModal(true);
                }}>
                  <div className="card-img">
                    <img src={eventImg} alt={ev.Event_name} />
                  </div>
                  <div className="card-info">
                    <div className="card-title">{ev.Event_name}</div>
                    <div className="card-area">{ev.area}</div>
                    <div className="card-meta">
                     <div>
                      <span className="meta-label">Date of Occurrence: </span>
                      <span className="meta-value">{formatDateForDisplay(ev.Date_of_occurrence)}</span>
                    </div>
                    <div>
                      <span className="meta-label">Time of Occurrence: </span>
                      <span className="meta-value">{formatTimeForDisplay(ev.Time_of_occurrence)}</span>
                    </div>

                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Past Events */}
          <section className="section past-section">
            <h3 className="section-title">Past Events</h3>
            <button className="filter-btn" onClick={() => setShowFilterModal(true)}>Filter</button>
            <div className="cards-grid">
              {pastEvents.map(ev => (
                <article className="event-card" key={ev.Event_id} onClick={() => {
                  setSelectedEvent(ev);
                  setShowViewCardModal(true);
                }}>
                  <div className="card-img">
                    <img src={eventImg} alt={ev.Event_name} />
                  </div>
                  <div className="card-info">
                    <div className="card-title">{ev.Event_name}</div>
                    <div className="card-area">{ev.area}</div>
                    <div className="card-meta">
                      <div>
                        <span className="meta-label">Date of Occurrence: </span>
                         <span className="meta-value">{formatDateForDisplay(ev.Date_of_occurrence)}</span>
                        </div>
                        <div>
                          <span className="meta-label">Time of Occurrence: </span>
                          <span className="meta-value">{formatTimeForDisplay(ev.Time_of_occurrence)}</span>
                        </div>
                        </div>
                      </div>
                </article>
              ))}
            </div>
          </section>

          {/* Add Popup */}
          {showPopup && (
            <div className="popup-backdrop">
              <AddPopup
                header="Event"
                handleState={closePopup}
                onAdd={(newEvent) => {
                  if (newEvent.Status === "Active") setActiveEvents(prev => [newEvent, ...prev]);
                  else setPastEvents(prev => [newEvent, ...prev]);
                }}
              />
            </div>
          )}

          {/* Filter Modal */}
          {showFilterModal && (
            <div className="popup-backdrop">
              <FilterModal handleState={closeModal} />
            </div>
          )}

          {showViewCardModal && selectedEvent ? (
  (() => {
    
    const mappedEvent = {
      type: selectedEvent.Event_name,
      area: selectedEvent.area, 
      date: formatDateForDisplay(selectedEvent.Date_of_occurrence),
      time: formatTimeForDisplay(selectedEvent.Time_of_occurrence),
    };

    return (
      <div className="popup-backdrop">
        <ViewCard
          image={eventImg}
          type={mappedEvent.type}
          area={mappedEvent.area}
          date={mappedEvent.date}
          time={mappedEvent.time}
          handleState={closeView}
          onSave={handleSaveEvent}
                />
              </div>
            );
          })()
        ) : null}

        </div>
      </div>
    </div>
  );
}
