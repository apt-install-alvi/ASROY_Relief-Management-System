import React, { useEffect, useRef, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./homepage.css";

export function Homepage() {
  const mapRef = useRef(null);
  const mapDivRef = useRef(null);
  const markersLayerRef = useRef(null);

  const ALL_EVENTS = useMemo(
    () => [
      { id: 1, type: "flood", title: "Flood – Pabna Upazila", lat: 24.0123, lon: 89.241, date: "2025-07-01" },
      { id: 2, type: "cyclone", title: "Cyclone – Cox’s Bazar", lat: 21.4272, lon: 92.0058, date: "2025-07-10" },
      { id: 3, type: "flood", title: "Flood – Dhaka", lat: 23.8103, lon: 90.4125, date: "2025-08-03" },
      { id: 4, type: "flood", title: "Flood – Barishal", lat: 22.701, lon: 90.3535, date: "2025-06-20" },
    ],
    []
  );

  const [showFilter, setShowFilter] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filtered, setFiltered] = useState(ALL_EVENTS);

  const BD_BOUNDS = [
    [20.375, 88.0],
    [26.635, 92.69],
  ];

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    if (!mapDivRef.current) return;

    const map = L.map(mapDivRef.current, {
      minZoom: 7.4,
      maxBounds: BD_BOUNDS,
      inertia: false,
    }).setView([23.685, 90.3563], 7.2);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    L.rectangle(BD_BOUNDS, {
      color: "#7a0c0c",
      weight: 2,
      fillOpacity: 0.03,
    }).addTo(map);

    const lg = L.layerGroup().addTo(map);
    markersLayerRef.current = lg;

    renderMarkers(ALL_EVENTS);

    map.whenReady(() => setTimeout(() => map.invalidateSize(), 0));

    return () => {
      map.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderMarkers = (events) => {
    if (!markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    const dotIcon = L.divIcon({
      className: "pin",
      html: '<span class="pin-dot"></span>',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    events.forEach((e) => {
      L.marker([e.lat, e.lon], { icon: dotIcon })
        .addTo(markersLayerRef.current)
        .bindTooltip(`${e.title} (${e.date})`);
    });
  };

  const applyFilter = () => {
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const next = ALL_EVENTS.filter((e) => {
      const d = new Date(e.date);
      if (from && d < from) return false;
      if (to && d > to) return false;
      return true;
    });

    setFiltered(next);
    renderMarkers(next);
    setShowFilter(false);
  };

  const clearFilter = () => {
    setFromDate("");
    setToDate("");
    setFiltered(ALL_EVENTS);
    renderMarkers(ALL_EVENTS);
    setShowFilter(false);
  };

  return (
    <div className="home-app">
      <header className="topbar">
        <div className="logo">
          <i className="fa-solid fa-hands-holding-circle" /> আশ্রয়
        </div>
      </header>

      <main className="main">
        <aside className="sidebar">
          <nav className="menu">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}>
              <i className="fa-solid fa-house" />
              Home
            </NavLink>

            <NavLink to="/events" className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}>
              <i className="fa-solid fa-bell" />
              Events
            </NavLink>

            <a className="menu-item" href="#">
              <i className="fa-solid fa-house-chimney" />
              Shelters
            </a>

            <a className="menu-item" href="#">
              <i className="fa-solid fa-users" />
              Volunteers
            </a>

            <a className="menu-item" href="#">
              <i className="fa-solid fa-dollar-sign" />
              Donations
            </a>

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
              <h3>Active Events</h3>
              <ul className="dot-list">
                {filtered.map((e) => (
                  <li key={e.id}>
                    <span className="dot red" />
                    {e.title} <span style={{ opacity: 0.65 }}>— {e.date}</span>
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
          <div className="modal-backdrop" onClick={() => setShowFilter(false)} />
          <div className="modal">
            <div className="modal-head">
              <h2>Filter by Occurrence</h2>
              <button className="modal-close" onClick={() => setShowFilter(false)}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="field">
                <label>From</label>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
              </div>
              <div className="field">
                <label>To</label>
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
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
