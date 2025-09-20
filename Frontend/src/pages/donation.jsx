import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users, Package, DollarSign } from "lucide-react";
import "./donation.css";
import { NewCampaignPopup } from "../components/newCampaignPopup";
/* --- Mock campaign data (replace with API calls) --- */
const campaign = {
  event_id: 1,
  event_name: "",
  description: "",
  start_date: "",
  end_date: "",
  status: "",
  location_name: "",
  target_amount: "",
  raised_amount: "",
  beneficiaries: "",
  image: "",
};

const recentDonations = [
  {
    id: 1,
    donor_name: "",
    amount: "",
    donation_type: "",
    date: "",
  },
  {
   
  },
  {
    
  },
];

const distributions = [
  {
    id: 1,
    location: "",
    items: "",
    beneficiaries: "",
    date: "",
  },
  {
   
  },
];

export function Donation() {
  const [tab, setTab] = useState("overview");
  const progress = Math.round(
    (campaign.raised_amount / campaign.target_amount) * 100
  );

  // State for showing the popup
  const [showPopup, setShowPopup] = useState(false);

  // Handle Add Campaign button click
  const handleAddClick = () => {
    setShowPopup(true); // Show the popup
  };

  // Handle closing the popup
  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div className="home-app">
      {/* 1) SAME WRAPPER AS HOMEPAGE */}
      {/* 2) TOP BAR (uses .topbar from homepage.css) */}
      <header className="topbar">
        <div className="brand">
         
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

        {/* 4) PAGE CONTENT (uses .content from homepage.css) */}
        <section className="content">
          <div className="content-head">
            <h1>Donations</h1>
          </div>

          {/* Add Button centered */}
          <div className="add-btn-container">
            <button className="add-btn" onClick={handleAddClick}>
              Add Donation
            </button>
          </div>

          {/* ===== Donation page body (page-specific .dn-* classes) ===== */}
          <div className="dn-container">
            {/* Hero */}
            <div className="dn-hero-grid">
              <div className="dn-hero-left">
                
                <div className="dn-hero-text">
                  <h2 className="dn-title">{campaign.event_name}</h2>
                  <p className="dn-desc">{campaign.description}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="dn-tabs">
              <div className="dn-tabs-list">
                {["overview", "donations", "distributions"].map(
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
                <div className="dn-stack">{/* Content */}</div>
              )}

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
                        <div className="dn-stat-value"></div>
                        <p className="dn-hint">Relief packages delivered</p>
                      </div>
                    </div>
                  </div>

                  <div className="dn-card">
                    <div className="dn-card-header">
                      <h3 className="dn-card-title">Campaign Goals</h3>
                    </div>


                    <div>hi alvi than </div>
                   
                    
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

              
            </div>
            {/* New Campaign Popup */}
            {showPopup && (
              <NewCampaignPopup
                onClose={closePopup}
                onSave={(newCampaign) => console.log(newCampaign)}
              />
            )}
            {/* ===== /Donation page body ===== */}
          </div>
        </section>
      </div>
    </div>
  );
}
