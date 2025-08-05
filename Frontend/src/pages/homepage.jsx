// frontend/src/pages/homepage.jsx
import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import './homepage.css';

export default function Homepage() {
  const [state, setState] = useState({
    currentEventType: 'flood',
    events: [],
    markers: {},
    dbConnected: false,
    map: null,
  });

  const BD_BOUNDS = [
    [20.375, 88.0],   // southwest
    [26.635, 92.69],  // northeast
  ];

  // Stub database methods
  const DatabaseService = {
    connect: () =>
      new Promise(res =>
        setTimeout(() => {
          setState(s => ({ ...s, dbConnected: true }));
          res();
        }, 1000)
      ),
    saveEvents: ev => {
      if (!state.dbConnected) return false;
      localStorage.setItem('relief_events', JSON.stringify(ev));
      return true;
    },
    loadEvents: () => {
      if (!state.dbConnected) return [];
      return JSON.parse(localStorage.getItem('relief_events') || '[]');
    },
  };

  // Initialize Leaflet map and load events
  useEffect(() => {
    const map = L.map('map', {
      minZoom: 7.4,
      inertia: false,
    })
      .setView([23.6850, 90.3563], 7.2)
      .setMaxBounds(BD_BOUNDS);
    map.options.maxBoundsViscosity = 1.0;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // delay invalidateSize until after initial render/layout
    map.whenReady(() => {
      setTimeout(() => {
        map.invalidateSize();
      }, 0);
    });

    setState(s => ({ ...s, map }));

    // connect and load saved events
    DatabaseService.connect().then(() => {
      const loaded = DatabaseService.loadEvents();
      if (loaded.length) {
        loaded.forEach(e => createMarker(e, map));
        setState(s => ({ ...s, events: loaded }));
      }
    });

    // cleanup on unmount
    return () => {
      map.remove();
    };
  }, []);

  // Sync sidebar list whenever events change
  useEffect(() => {
    const list = document.getElementById('event-list');
    list.innerHTML = '';
    if (!state.events.length) {
      list.innerHTML =
        '<div class="event-item">No events found. Add some events!</div>';
      return;
    }
    state.events.forEach(event => {
      const item = document.createElement('div');
      item.className = `event-item ${event.type}`;
      item.innerHTML = `
        <span class="type">${
          event.type === 'flood' ? 'Flood' : 'Cyclone'
        }</span>
        ${event.location.name.substring(0, 30)}${
        event.location.name.length > 30 ? '...' : ''
      }
      `;
      item.onclick = () => {
        state.map.flyTo(event.location.coordinates, 12);
        showDetails(event);
      };
      list.appendChild(item);
    });
  }, [state.events]);

  // helper to add a new event
  const addEvent = e => {
    e.id = Date.now();
    setState(s => ({ ...s, events: [...s.events, e] }));
    createMarker(e, state.map);
  };

// Modify the createMarker function
const createMarker = (event, map) => {
  const icon = L.divIcon({
    className: `custom-marker ${event.type}`,
    html: `
      <div class="marker-circle">
        <i class="fas ${event.type === 'flood' ? 'fa-water' : 'fa-wind'}"></i>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -15]
  });
  
  const marker = L.marker(event.location.coordinates, { icon })
    .addTo(map)
    .on('click', () => showDetails(event));
  
  state.markers[event.id] = marker;
};

  // search by location and add event
  const searchLocation = () => {
    const q = document.getElementById('location-search').value;
    if (!q) return;
    axios
      .get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${q}+Bangladesh&bounded=1&viewbox=88.0,26.635,92.69,20.375`
      )
      .then(res => {
        if (res.data.length) {
          const loc = res.data[0];
          const coords = [+loc.lat, +loc.lon];
          addEvent({
            type: state.currentEventType,
            location: { name: loc.display_name, coordinates: coords },
          });
          state.map.flyTo(coords, 12);
        }
      });
  };

  // show event details popup
  const showDetails = event => {
    document.querySelector('.event-details-card')?.remove();
    const card = document.createElement('div');
    card.className = 'event-details-card';
    card.innerHTML = `
      <div class="event-header ${event.type}">
        <h3>${
          event.type === 'flood' ? 'Flood Event' : 'Cyclone Event'
        }</h3>
        <button class="close-btn"><i class="fas fa-times"></i></button>
      </div>
      <div class="event-body">
        <p><i class="fas fa-map-marker-alt"></i> ${event.location.name}</p>
        <p><i class="fas fa-calendar"></i> Reported: ${new Date().toLocaleDateString()}</p>
        <p><i class="fas fa-exclamation-triangle"></i> Status: <span class="status-active">Active</span></p>
        <div class="event-stats">
          <div class="stat"><div class="stat-value">1,500</div><div class="stat-label">Affected</div></div>
          <div class="stat"><div class="stat-value">12</div><div class="stat-label">Shelters</div></div>
          <div class="stat"><div class="stat-value">45</div><div class="stat-label">Volunteers</div></div>
        </div>
      </div>
      <div class="event-footer">
        <button class="action-btn" id="save-event-btn">
          <i class="fas fa-save"></i> Save to Database
        </button>
      </div>
    `;
    document.body.appendChild(card);
    card.querySelector('.close-btn').onclick = () => card.remove();
    card.querySelector('#save-event-btn').onclick = () => {
      if (DatabaseService.saveEvents(state.events)) {
        alert('Event saved to database!');
      } else {
        alert('Failed to save event. Database not connected.');
      }
    };
  };

  // toggle between flood/cyclone
  const switchType = t => setState(s => ({ ...s, currentEventType: t }));

  return (
    <div id="app">
      <div className="title-header">
        <i className="fas fa-hands-helping"></i>
        Bangladesh Relief Management System
      </div>

      <div className="map-controls">
        <div className="event-type-selector">
          <button
            className={`event-type-btn ${
              state.currentEventType === 'flood' ? 'active' : ''
            }`}
            onClick={() => switchType('flood')}
          >
            <i className="fas fa-water"></i> Flood
          </button>
          <button
            className={`event-type-btn ${
              state.currentEventType === 'cyclone' ? 'active' : ''
            }`}
            onClick={() => switchType('cyclone')}
          >
            <i className="fas fa-wind"></i> Cyclone
          </button>
        </div>
        <div className="search-container">
          <input id="location-search" placeholder="Search location in Bangladesh…" />
          <button onClick={searchLocation}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      <div className="map-db-container">
        <div className="database-panel">
          <div className="database-header">
            <h3><i className="fas fa-database"></i> Event Database</h3>
            <button onClick={() => setState(s => ({ ...s }))}>
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
          <div className="event-list" id="event-list"></div>
          <div className="database-actions">
            <button
              className="db-btn"
              onClick={() => {
                if (DatabaseService.saveEvents(state.events)) {
                  alert('Events saved!');
                }
              }}
            >
              <i className="fas fa-save"></i> Save
            </button>
            <button
              className="db-btn"
              onClick={() => {
                const loaded = DatabaseService.loadEvents();
                if (loaded.length) {
                  state.events.forEach(m => state.markers[m.id]?.remove());
                  setState(s => ({ ...s, events: loaded }));
                  loaded.forEach(e => createMarker(e, state.map));
                }
              }}
            >
              <i className="fas fa-download"></i> Load
            </button>
          </div>
        </div>

        {/* full-height map container */}
        <div id="map" style={{ height: '100%' }}></div>
      </div>
    </div>
  );
}
