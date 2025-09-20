import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./event.css";
<<<<<<< HEAD
import eventImg from "/assets/images/Flood.jpg";
import { AddPopup } from "../components/old/Add_Popup";
import { FilterModal } from "../components/old/FilterPopup";
import { ViewCard } from "../components/old/ViewCard";
=======
import eventImg from "/assets/images/flood.jpeg";
import { AddPopup } from "../components/Add_Popup";
import { FilterModal } from "../components/FilterPopup";
import { ViewCard } from "../components/ViewCard";
import { formatDateForDisplay } from "../utils/formatDateDisplay";
import { formatTimeForDisplay } from "../utils/formatTimeDisplay";
>>>>>>> e46976180579a7d809d27a3777a82f69dc654058

export function EventPage() {
  const [activeEvents, setActiveEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [allActiveEvents, setAllActiveEvents] = useState([]); // backup for reset
  const [allPastEvents, setAllPastEvents] = useState([]);     // backup for reset
  const [showPopup, setShowPopup] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showViewCardModal, setShowViewCardModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // --------------------- Fetch Events ---------------------
  useEffect(() => {
    fetch("http://localhost:5000/api/events/all")
      .then(res => res.json())
      .then(data => {
        const active = data.filter(ev => ev.Status === "Active");
        const inactive = data.filter(ev => ev.Status !== "Active");
        setActiveEvents(active);
        setPastEvents(inactive);
        setAllActiveEvents(active);
        setAllPastEvents(inactive);
      })
      .catch(err => console.error(err));
  }, []);

  // --------------------- Save / Update Event ---------------------
  const handleSaveEvent = (updatedEvent) => {
    const isNowActive = updatedEvent.Status === "Active";

    if (isNowActive) {
      setActiveEvents(prev => [
        ...prev.filter(ev => ev.Event_id !== updatedEvent.Event_id),
        updatedEvent
      ]);
      setPastEvents(prev => prev.filter(ev => ev.Event_id !== updatedEvent.Event_id));
    } else {
      setPastEvents(prev => [
        ...prev.filter(ev => ev.Event_id !== updatedEvent.Event_id),
        updatedEvent
      ]);
      setActiveEvents(prev => prev.filter(ev => ev.Event_id !== updatedEvent.Event_id));
    }

    setShowViewCardModal(false); // close modal
  };

  // --------------------- Handle Filter Results ---------------------
const handleFilterResults = (filteredEvents) => {
  
  const active = filteredEvents.filter(ev => ev.Status === "Active");
  const inactive = filteredEvents.filter(ev => ev.Status !== "Active");

  setActiveEvents(active);
  setPastEvents(inactive);
};


  const resetFilters = () => {
    setActiveEvents(allActiveEvents);
    setPastEvents(allPastEvents);
  };

  // --------------------- Close Modals ---------------------
  const closePopup = () => setShowPopup(false);
  const closeModal = () => setShowFilterModal(false);
  const closeView = () => setShowViewCardModal(false);

  return (
    <div className="events-app">
      {/* Sidebar */}
             <aside className="sidebar">
               <nav className="menu">
                 <NavLink
                   to="/"
                   end
                   className={({ isActive }) =>
                     isActive ? "menu-item active" : "menu-item"
                   }
                 >
                   <i className="fa-solid fa-house" />
                   <span>Home</span>
                 </NavLink>
                 <NavLink
                   to="/events"
                   className={({ isActive }) =>
                     isActive ? "menu-item active" : "menu-item"
                   }
                 >
                   <i className="fa-solid fa-bell" />
                   <span>Events</span>
                 </NavLink>
                 <NavLink
                   to="/shelters"
                   className={({ isActive }) =>
                     isActive ? "menu-item active" : "menu-item"
                   }
                 >
                   <i className="fa-solid fa-house-chimney" />
                   <span>Shelters</span>
                 </NavLink>
                 <NavLink
                   to="/volunteer"
                   className={({ isActive }) =>
                     isActive ? "menu-item active" : "menu-item"
                   }
                 >
                   <i className="fa-solid fa-users" />
                   <span>Volunteers</span>
                 </NavLink>
                 <NavLink
                   to="/donation"
                   className={({ isActive }) =>
                     isActive ? "menu-item active" : "menu-item"
                   }
                 >
                   <i className="fa-solid fa-dollar-sign" />
                   <span>Donations</span>
                 </NavLink>
                 <NavLink
                   to="/inventory"
                   className={({ isActive }) =>
                     isActive ? "menu-item active" : "menu-item"
                   }
                 >
                   <i className="fa-solid fa-box" />
                   <span>Inventory</span>
                 </NavLink>
               </nav>
             </aside>

      <div className="events-main">
        <header className="events-header">
          <h2>Events</h2>
          <button className="add-btn" onClick={() => setShowPopup(1)}>
            Add
          </button>
        </header>

        <div className="events-body">
         
          <section className="section">
            <h3 className="section-title">Active Events</h3>
            <div className="cards-grid">
              {activeEvents.map((ev) => (
                <article
                  className="event-card"
                  key={ev.Event_id}
                  onClick={() => {
                    setSelectedEvent(ev);
                    setShowViewCardModal(true);
                  }}
                >
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

            <button
              className="filter-btn"
              onClick={() => setShowFilterModal(1)}
            >
              Filter
            </button>

            <div className="cards-grid">
              {pastEvents.map((ev) => (
                <article
                  className="event-card"
                   key={ev.Event_id}
                  onClick={() => {
                    setSelectedEvent(ev);
                    setShowViewCardModal(true);
                  }}
                >
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
                  if (newEvent.Status === "Active") {
                    setActiveEvents(prev => [newEvent, ...prev]);
                    setAllActiveEvents(prev => [newEvent, ...prev]);
                  } else {
                    setPastEvents(prev => [newEvent, ...prev]);
                    setAllPastEvents(prev => [newEvent, ...prev]);
                  }
                }}
              />
            </div>
          )}

          {/* Filter Modal */}
          {showFilterModal && (
            <div className="popup-backdrop">
              <FilterModal 
                handleState={closeModal} 
                onFilter={handleFilterResults}
              />
            </div>
          )}

         
          {showViewCardModal && selectedEvent && (
            <div className="popup-backdrop">
              <ViewCard
                eventId={selectedEvent.Event_id}
                image={selectedEvent.Event_Image}
                type={selectedEvent.Event_name}
                area={selectedEvent.area}
                date={selectedEvent.Date_of_occurrence}
                time={selectedEvent.Time_of_occurrence}
                status={selectedEvent.Status}
                handleState={closeView}
                onUpdate={handleSaveEvent}
                onDelete={(id) => {
                  setActiveEvents(prev => prev.filter(ev => ev.Event_id !== id));
                  setPastEvents(prev => prev.filter(ev => ev.Event_id !== id));
                  setAllActiveEvents(prev => prev.filter(ev => ev.Event_id !== id));
                  setAllPastEvents(prev => prev.filter(ev => ev.Event_id !== id));
                  closeView();
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
