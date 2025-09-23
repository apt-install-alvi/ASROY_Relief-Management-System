import { useEffect, useState } from "react";
import "../styles/large_components/EventDashboard.css";

export function EventDashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    mostActiveArea: "",
    mostFrequentType: "",
  });

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/api/events/dashboard")
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const { totalEvents, activeEvents, mostActiveArea, mostFrequentType, alerts } = data.dashboard;
        setStats({ totalEvents, activeEvents, mostActiveArea, mostFrequentType });
        setAlerts(alerts || []);
      }
    })
    .catch(err => console.error(err));
}, []);

  return (
    <div className="event-dashboard">
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Events</h3>
          <p>{stats.totalEvents}</p>
        </div>
        <div className="card">
          <h3>Active Events</h3>
          <p>{stats.activeEvents}</p>
        </div>
        <div className="card">
          <h3>Most Disaster-Prone Area</h3>
          <p>{stats.mostActiveArea}</p>
        </div>
        <div className="card">
          <h3>Frequent Event Type</h3>
          <p>{stats.mostFrequentType}</p>
        </div>
      </div>

      {alerts.length > 0 && (
          <div className="dashboard-alerts">
          <h3>Alerts</h3>
          <ul>
            {alerts.map((alert, idx) => (
              <li key={idx}>{alert.message} (Area: {alert.area})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
