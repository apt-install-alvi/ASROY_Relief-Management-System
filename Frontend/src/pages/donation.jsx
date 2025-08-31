import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MapPin, Calendar, Users, Package, DollarSign } from "lucide-react";
import "./donation.css";

/* --- Mock campaign data (replace with API calls) --- */
const campaign = {
  event_id: 1,
  event_name: "Flood Relief 2024",
  description:
    "Emergency relief for flood victims in Sylhet region. Providing food, clean water, medicine, and temporary shelter to families affected by the devastating floods.",
  start_date: "2024-07-01",
  end_date: "2024-08-31",
  status: "active",
  location_name: "Sylhet Emergency Center",
  target_amount: 500000,
  raised_amount: 325000,
  beneficiaries: 1250,
  image: "/flood-relief-operations-with-volunteers-distributi.png",
};

const recentDonations = [
  {
    id: 1,
    donor_name: "Bangladesh Red Crescent Society",
    amount: 50000,
    donation_type: "cash",
    date: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    donor_name: "Anonymous Donor",
    donated_item: "Rice, Lentils, Medicine",
    donation_type: "goods",
    date: "2024-01-14T14:20:00Z",
  },
  {
    id: 3,
    donor_name: "Local Community Group",
    amount: 25000,
    donation_type: "cash",
    date: "2024-01-13T09:15:00Z",
  },
];

const distributions = [
  {
    id: 1,
    location: "Sylhet Flood Area - Zone A",
    items: "Food packages, Clean water, Medicine",
    beneficiaries: 150,
    date: "2024-01-14",
  },
  {
    id: 2,
    location: "Sylhet Flood Area - Zone B",
    items: "Temporary shelters, Blankets",
    beneficiaries: 200,
    date: "2024-01-13",
  },
];

export  function Donation() {
  const [tab, setTab] = useState("overview");
  const progress = Math.round(
    (campaign.raised_amount / campaign.target_amount) * 100
  );

  return (
    <div className="home-app">
      {/* 1) SAME WRAPPER AS HOMEPAGE */}
      {/* 2) TOP BAR (uses .topbar from homepage.css) */}
      <header className="topbar">
        <div className="brand">
          <i className="fa-solid fa-people-group" />
          আশ্রয়
        </div>
      </header>

      {/* 3) MAIN: sidebar + content (uses .main/.sidebar/.menu/.menu-item from homepage.css) */}
      <div className="main">
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
              to="/voulunter"
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

        {/* 4) PAGE CONTENT (uses .content from homepage.css) */}
        <section className="content">
          <div className="content-head">
            <h1>Donations</h1>
          </div>

          {/* ===== Donation page body (page-specific .dn-* classes) ===== */}
          <div className="dn-container">
            {/* Hero */}
            <div className="dn-hero-grid">
              <div className="dn-hero-left">
                <div className="dn-hero-media">
                  <img
                    src={campaign.image || "/placeholder.svg"}
                    alt={campaign.event_name}
                  />
                  <span className="dn-badge dn-badge-green">
                    {campaign.status}
                  </span>
                </div>

                <div className="dn-hero-text">
                  <h2 className="dn-title">{campaign.event_name}</h2>
                  <p className="dn-desc">{campaign.description}</p>

                  <div className="dn-meta">
                    <div className="dn-meta-item">
                      <MapPin className="dn-icon" />
                      {campaign.location_name}
                    </div>
                    <div className="dn-meta-item">
                      <Calendar className="dn-icon" />
                      {new Date(
                        campaign.start_date
                      ).toLocaleDateString()} –{" "}
                      {new Date(campaign.end_date).toLocaleDateString()}
                    </div>
                    <div className="dn-meta-item">
                      <Users className="dn-icon" />
                      {campaign.beneficiaries.toLocaleString()} beneficiaries
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="dn-tabs">
              <div className="dn-tabs-list">
                {["overview", "donations", "distributions", "updates"].map(
                  (t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`dn-tab-btn ${tab === t ? "active" : ""}`}
                    >
                      {t}
                    </button>
                  )
                )}
              </div>

              {/* Overview */}
              {tab === "overview" && (
                <div className="dn-stack">
                  <div className="dn-stats-grid">
                    <div className="dn-card">
                      <div className="dn-card-header row">
                        <h4 className="dn-stat-title">Total Raised</h4>
                        <DollarSign className="dn-icon muted" />
                      </div>
                      <div className="dn-card-content">
                        <div className="dn-stat-value">
                          ৳{campaign.raised_amount.toLocaleString()}
                        </div>
                        <p className="dn-hint">
                          {Math.round(
                            (campaign.raised_amount / campaign.target_amount) *
                              100
                          )}
                          % of ৳{campaign.target_amount.toLocaleString()} target
                        </p>
                      </div>
                    </div>

                    <div className="dn-card">
                      <div className="dn-card-header row">
                        <h4 className="dn-stat-title">Beneficiaries</h4>
                        <Users className="dn-icon muted" />
                      </div>
                      <div className="dn-card-content">
                        <div className="dn-stat-value">
                          {campaign.beneficiaries.toLocaleString()}
                        </div>
                        <p className="dn-hint">People helped so far</p>
                      </div>
                    </div>

                    <div className="dn-card">
                      <div className="dn-card-header row">
                        <h4 className="dn-stat-title">Items Distributed</h4>
                        <Package className="dn-icon muted" />
                      </div>
                      <div className="dn-card-content">
                        <div className="dn-stat-value">2,450</div>
                        <p className="dn-hint">Relief packages delivered</p>
                      </div>
                    </div>
                  </div>

                  <div className="dn-card">
                    <div className="dn-card-header">
                      <h3 className="dn-card-title">Campaign Goals</h3>
                    </div>
                    <div className="dn-card-content dn-goals">
                      <div className="dn-goal">
                        <h4>Immediate Relief</h4>
                        <p>
                          Provide emergency food, clean water, and medical
                          supplies to flood-affected families.
                        </p>
                      </div>
                      <div className="dn-goal">
                        <h4>Temporary Shelter</h4>
                        <p>
                          Set up temporary shelters and provide blankets and
                          basic necessities.
                        </p>
                      </div>
                      <div className="dn-goal">
                        <h4>Long-term Recovery</h4>
                        <p>
                          Support families in rebuilding their homes and
                          livelihoods after the disaster.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Donations */}
              {tab === "donations" && (
                <div className="dn-stack">
                  <div className="dn-card">
                    <div className="dn-card-header">
                      <h3 className="dn-card-title">Recent Donations</h3>
                      <p className="dn-hint">
                        Latest contributions to this campaign
                      </p>
                    </div>
                    <div className="dn-card-content dn-list">
                      {recentDonations.map((d) => (
                        <div key={d.id} className="dn-list-row">
                          <div className="dn-list-main">
                            <div className="dn-list-head">
                              <h4>{d.donor_name}</h4>
                              <span
                                className={`dn-badge ${
                                  d.donation_type === "cash"
                                    ? "dn-badge-dark"
                                    : "dn-badge-light"
                                }`}
                              >
                                {d.donation_type}
                              </span>
                            </div>
                            <div className="dn-list-sub">
                              {d.donation_type === "cash" ? (
                                <span>
                                  Amount: ৳{d.amount?.toLocaleString()}
                                </span>
                              ) : (
                                <span>Items: {d.donated_item}</span>
                              )}
                            </div>
                            <div className="dn-date">
                              {new Date(d.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Distributions */}
              {tab === "distributions" && (
                <div className="dn-stack">
                  <div className="dn-card">
                    <div className="dn-card-header">
                      <h3 className="dn-card-title">Distribution Activities</h3>
                      <p className="dn-hint">
                        Relief distribution to beneficiaries
                      </p>
                    </div>
                    <div className="dn-card-content dn-list">
                      {distributions.map((ds) => (
                        <div key={ds.id} className="dn-list-row">
                          <div className="dn-row-top">
                            <h4>{ds.location}</h4>
                            <span className="dn-badge dn-badge-outline">
                              {ds.date}
                            </span>
                          </div>
                          <p className="dn-list-sub">{ds.items}</p>
                          <div className="dn-row-foot">
                            <Users className="dn-icon" />
                            <span className="dn-muted">
                              {ds.beneficiaries} beneficiaries served
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Updates */}
              {tab === "updates" && (
                <div className="dn-stack">
                  <div className="dn-card">
                    <div className="dn-card-header">
                      <h3 className="dn-card-title">Campaign Updates</h3>
                      <p className="dn-hint">
                        Latest news and progress reports
                      </p>
                    </div>
                    <div className="dn-card-content dn-updates">
                      <div className="dn-update red">
                        <div className="dn-update-head">
                          <h4>Distribution Complete in Zone A</h4>
                          <span className="dn-badge dn-badge-outline">
                            Jan 14, 2024
                          </span>
                        </div>
                        <p>
                          Successfully distributed food packages and medical
                          supplies to 150 families in the most affected area.
                        </p>
                      </div>

                      <div className="dn-update blue">
                        <div className="dn-update-head">
                          <h4>New Shelter Setup</h4>
                          <span className="dn-badge dn-badge-outline">
                            Jan 12, 2024
                          </span>
                        </div>
                        <p>
                          Temporary shelters have been set up for 200 displaced
                          families with basic amenities.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* ===== /Donation page body ===== */}
          </div>
        </section>
      </div>
    </div>
  );
}
