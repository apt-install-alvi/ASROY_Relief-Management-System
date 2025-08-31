import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./homepage.css";
import axios from "axios"; 
import { areaCoordinates } from "./areaCoordinates.js"; 

export function Homepage() {
  const mapRef = useRef(null);
  const mapDivRef = useRef(null);
  const markersLayerRef = useRef(null);

  const [events, setEvents] = useState([]);       
  const [filtered, setFiltered] = useState([]);   
  const [showFilter, setShowFilter] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterTitle, setFilterTitle] = useState("Active Events");
  const BD_BOUNDS = [
    [20.375, 88.0],
    [26.635, 92.69],
  ];
  // Initialize map
  useEffect(() => {
  // Exit if the div isn't mounted yet
  if (!mapDivRef.current) return;

  // Exit if map already exists
  if (mapRef.current) return;

  // Create map
  const map = L.map(mapDivRef.current, {
    minZoom: 7.4,
    maxBounds: BD_BOUNDS,
    inertia: false,
  }).setView([23.685, 90.3563], 7.2);

  mapRef.current = map;

  // Add tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Add Bangladesh rectangle bounds
  L.rectangle(BD_BOUNDS, {
    color: "#7a0c0c",
    weight: 2,
    fillOpacity: 0.03,
  }).addTo(map);

  // Create a marker layer group
  markersLayerRef.current = L.layerGroup().addTo(map);

  // Fix for rendering inside hidden containers
  map.whenReady(() => setTimeout(() => map.invalidateSize(), 0));

  // Cleanup function on unmount
  return () => {
    map.remove();
    mapRef.current = null;
    markersLayerRef.current = null;
  };
}, []); // Empty dependency ensures this runs only once


  // Fetch events from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/events/homepage")
      .then(res => {
        const allEvents = res.data.map(e => {
          const coords = areaCoordinates[e.Area_name] || { lat: 23.685, lng: 90.3563 };
          return {
            id: e.Event_id,
            title: e.Event_name,
            area: e.Area_name,
            date: e.Date_of_occurrence,
            status: e.Status,
            lat: coords.lat,
            lon: coords.lng
          };
        });

        setEvents(allEvents);

        // Default: show only Active events
        const activeEvents = allEvents.filter(ev => ev.status === "Active");
        setFiltered(activeEvents);

      })
      .catch(err => console.error(err));
 
  }, []);

useEffect(() => {
  if (mapRef.current) {
    renderMarkers(filtered); 
  }
}, [filtered]);


  

  // Render markers function
  const renderMarkers = (eventsToRender) => {
    if (!markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    const dotIcon = L.divIcon({
      className: "pin",
      html: '<span class="pin-dot"></span>',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
eventsToRender.forEach(e => {
  L.marker([e.lat, e.lon], { icon: dotIcon })
    .addTo(markersLayerRef.current)
    .bindTooltip(`${e.title} - ${e.area} - ${formatDisplayDate(e.date)}`);
});
  };

// Apply filter
const applyFilter = () => {
  axios.get("http://localhost:5000/api/events/homepage", {
    params: { fromDate, toDate }
  })
  .then(res => {
    const filteredEvents = res.data.map(e => {
      const coords = areaCoordinates[e.Area_name] || { lat: 23.685, lng: 90.3563 };
      return {
        id: e.Event_id,
        title: e.Event_name,
        area: e.Area_name,
        date: e.Date_of_occurrence,
        status: e.Status,
        lat: coords.lat,
        lon: coords.lng
      };
    });

    setFiltered(filteredEvents);
    setFilterTitle(fromDate || toDate ? `${formatDisplayDate(fromDate)} — ${formatDisplayDate(toDate)}` : "All Events");
    setShowFilter(false);
  })
  .catch(err => console.error(err));
};

// Clear filter (show all events)
const clearFilter = () => {
  setFromDate("");
  setToDate("");

  axios.get("http://localhost:5000/api/events/homepage")
    .then(res => {
      const allEvents = res.data.map(e => {
        const coords = areaCoordinates[e.Area_name] || { lat: 23.685, lng: 90.3563 };
        return {
          id: e.Event_id,
          title: e.Event_name,
          area: e.Area_name,
          date: e.Date_of_occurrence,
          status: e.Status,
          lat: coords.lat,
          lon: coords.lng
        };
      });

      setFiltered(allEvents);
      setFilterTitle("All Events");
      setShowFilter(false);
    })
    .catch(err => console.error(err));
};


  const formatDisplayDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return ""; 
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const day = d.getDate().toString().padStart(2, "0");
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

  return (
    <div className="home-app">
      <header className="topbar">
        <div className="logo">
          <img
            src="/assets/icons/logo_white.svg"
            alt="Logo"
            className="logo-icon"
          />
          <span className="logo-text">আশ্রয়</span>
        </div>
      </header>

      <main className="main">
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
              Home
            </NavLink>

            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <i className="fa-solid fa-bell" />
              Events
            </NavLink>

            <NavLink
              to="/shelters"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="fa-solid fa-house-chimney" />
              Shelters
            </NavLink>

            <NavLink
              to="/voulunter"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="fa-solid fa-users" />
              Volunteers
            </NavLink>

            <NavLink
              to="/donation"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="fa-solid fa-dollar-sign" />
              Donations
            </NavLink>

            <a className="menu-item" href="#">
              <i className="fa-solid fa-boxes-stacked" />
              Inventory
            </a>
          </nav>
        </aside>

        <section className="content">
          <div className="content-head">
            <h1>Activities-at-a-Glance</h1>
            <button className="pill-btn" onClick={() => setShowFilter(true)}>
              Filter By Occurrence
            </button>
          </div>

          <div className="canvas-row">
            <div className="map-box">
              <div ref={mapDivRef} id="map" />
            </div>

            <div className="right-card">
              <h3>{filterTitle}</h3>
              <ul className="dot-list">
                {filtered.map((e) => (
                  <li key={e.id}>
                    <span className="dot red" />
                    {e.title} - {e.area} - {formatDisplayDate(e.date)}
                  </li>
                ))}

                {filtered.length === 0 && <li>No events in this range.</li>}
              </ul>

              <h3>Volunteers</h3>
              <p>
                Total Volunteers : <b>52</b>
              </p>
              <p>
                Active Volunteers : <b>36</b>
              </p>

              <h3>Donations</h3>
              <p>
                Total Received : <b>Tk.26,503</b>
              </p>
              <p>
                Received in the Current Month : <b>Tk.3,600</b>
              </p>
            </div>
          </div>
        </section>
      </main>

      {showFilter && (
        <>
          <div
            className="modal-backdrop"
            onClick={() => setShowFilter(false)}
          />
          <div className="modal">
            <div className="modal-head">
              <h2>Filter by Occurrence</h2>
              <button
                className="modal-close"
                onClick={() => setShowFilter(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="field">
                <label>From</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className="field">
                <label>To</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn ghost" onClick={clearFilter}>
                Clear
              </button>
              <button className="btn primary" onClick={applyFilter}>
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 