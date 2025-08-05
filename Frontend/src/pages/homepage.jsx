// homepage.jsx
const { useState, useEffect } = React;

function Homepage() {
  const [state, setState] = useState({
    currentEventType: 'flood',
    events: [],
    markers: {},
    dbConnected: false,
    map: null,
  });

  const BD_BOUNDS = [
   [20.375, 88.0],  // southwest
  [26.635, 92.69]
  ];

  // Database stub
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
    }
  };

  // Initialize map + load DB once
  useEffect(() => {
    const map = L.map('map', {
      minZoom: 7.4,
      maxBounds: BD_BOUNDS,
      maxBoundsViscosity: 10.0,
      inertia: false
    }).setView([23.6850, 90.3563], 7.2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.rectangle(BD_BOUNDS, {
      color: '#006a4e',
      weight: 2,
      fillOpacity: 0.05
    }).addTo(map);

    map.on('zoomend', () => {
      if (map.getZoom() < 7) map.setZoom(7);
    });

    setState(s => ({ ...s, map }));

    DatabaseService.connect().then(() => {
      const loaded = DatabaseService.loadEvents();
      if (loaded.length) {
        loaded.forEach(e => createMarker(e, map));
        setState(s => ({ ...s, events: loaded }));
      }
    });
  }, []);

  // Sync sidebar list
  useEffect(() => {
    const list = document.getElementById('event-list');
    list.innerHTML = '';
    if (!state.events.length) {
      list.innerHTML = '<div class="event-item">No events found. Add some events!</div>';
      return;
    }
    state.events.forEach(event => {
      const item = document.createElement('div');
      item.className = `event-item ${event.type}`;
      item.innerHTML = `
        <span class="type">${event.type === 'flood' ? 'Flood' : 'Cyclone'}</span>
        ${event.location.name.substring(0, 30)}${event.location.name.length > 30 ? '...' : ''}
      `;
      item.onclick = () => {
        state.map.flyTo(event.location.coordinates, 12);
        showDetails(event);
      };
      list.appendChild(item);
    });
  }, [state.events]);

  const addEvent = e => {
    e.id = Date.now();
    setState(s => ({ ...s, events: [...s.events, e] }));
    createMarker(e, state.map);
  };

  const createMarker = (event, map) => {
    const icon = L.divIcon({
      className: `custom-marker ${event.type}`,
      html:
        event.type === 'flood'
          ? '<i class="fas fa-water"></i>'
          : '<i class="fas fa-wind"></i>',
      iconSize: [30, 30]
    });
    const marker = L.marker(event.location.coordinates, { icon })
      .addTo(map)
      .on('click', () => showDetails(event));
    state.markers[event.id] = marker;
  };

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
            location: { name: loc.display_name, coordinates: coords }
          });
          state.map.flyTo(coords, 12);
        }
      });
  };

  const showDetails = event => {
    document.querySelector('.event-details-card')?.remove();
    const card = document.createElement('div');
    card.className = 'event-details-card';
    card.innerHTML = `
      <div class="event-header ${event.type}">
        <h3>${event.type === 'flood' ? 'Flood Event' : 'Cyclone Event'}</h3>
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
        <button class="action-btn" id="save-event-btn"><i class="fas fa-save"></i> Save to Database</button>
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
            className={`event-type-btn ${state.currentEventType === 'flood' ? 'active' : ''}`}
            onClick={() => switchType('flood')}
          >
            <i className="fas fa-water"></i> Flood
          </button>
          <button
            className={`event-type-btn ${state.currentEventType === 'cyclone' ? 'active' : ''}`}
            onClick={() => switchType('cyclone')}
          >
            <i className="fas fa-wind"></i> Cyclone
          </button>
        </div>
        <div className="search-container">
          <input id="location-search" placeholder="Search location in Bangladesh..." />
          <button id="search-btn" onClick={searchLocation}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      <div className="map-db-container">
        <div className="database-panel">
          <div className="database-header">
            <h3>
              <i className="fas fa-database"></i> Event Database
            </h3>
            <button id="refresh-db" onClick={() => setState(s => ({ ...s }))}>
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>

          <div className="event-list" id="event-list"></div>

          <div className="database-actions">
            <button
              className="db-btn"
              onClick={() => {
                if (DatabaseService.saveEvents(state.events)) {
                  alert('Events saved to database successfully!');
                } else {
                  alert('Failed to save events. Database not connected.');
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
                  alert('Events loaded from database!');
                } else {
                  alert('No events found in database.');
                }
              }}
            >
              <i className="fas fa-download"></i> Load
            </button>
          </div>
        </div>

        <div id="map"></div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Homepage />);
