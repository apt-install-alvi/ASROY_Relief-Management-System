import React, { useState, useEffect } from "react";
import { Users, Package, DollarSign } from "lucide-react";
import "./styles/donation.css";
import { Sidebar } from "../components/large_components/Sidebar";
import { Header } from "../components/base_components/Header";
import { DonationAddModal } from "../components/large_components/DonationAddModal";
import { ButtonRed } from "../components/base_components/ButtonRed";

export function DonationPage() {
  const [donations, setDonations] = useState([]);
  const [summary, setSummary] = useState({
    totalMoney: 0,
    totalItems: 0,
    totalDonations: 0
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const closePopup = () => setShowAddModal(false);

  // Function to format date as "1-JAN-2024"
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";
    
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  };

  // Fetch donations safely
  useEffect(() => {
    async function fetchDonations() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/donations/list");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        
        console.log("API Response:", data); // Debug log
        
        // Check the structure of the response
        if (data && data.donations !== undefined) {
          // New format: { donations: [], summary: {} }
          setDonations(data.donations || []);
          setSummary(data.summary || {
            totalMoney: 0,
            totalItems: 0,
            totalDonations: 0
          });
        } else if (Array.isArray(data)) {
          // Old format: just array
          setDonations(data);
          // Calculate summary manually
          const totalMoney = data.filter(d => d.donation_type === "Money")
            .reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
          const totalItems = data.filter(d => d.donation_type !== "Money")
            .reduce((sum, d) => sum + (Number(d.quantity) || 0), 0);
          
          setSummary({
            totalMoney,
            totalItems,
            totalDonations: data.length
          });
        } else {
          // Invalid format
          console.error("Invalid API response format:", data);
          setDonations([]);
          setSummary({
            totalMoney: 0,
            totalItems: 0,
            totalDonations: 0
          });
        }
        
      } catch (err) {
        console.error("Failed to fetch donations:", err);
        setDonations([]);
        setSummary({
          totalMoney: 0,
          totalItems: 0,
          totalDonations: 0
        });
      } finally {
        setLoading(false);
      }
    }
    fetchDonations();
  }, []);

  // Use the pre-calculated sums from the database
  const totalDonationAmount = summary.totalMoney || 0;
  const totalBeneficiaries = summary.totalDonations || 0;
  const itemsDistributed = summary.totalItems || 0;

  // Debug: Log current state
  useEffect(() => {
    console.log("Donations state:", donations);
    console.log("Summary state:", summary);
  }, [donations, summary]);

  if (loading) {
    return (
      <>
        <Sidebar />
        <Header title={"Donations"} />
        <main>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            Loading donations...
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <Header title={"Donations"} />
      <main>
        <section className="active-events">
          <div className="shelter-subheader">
            <div className="modal-btn-position">
              <ButtonRed btnText={"Add Donation"} onClick={() => setShowAddModal(true)} />
            </div>
          </div>

          <div className="overview">
            <div className="overview-card">
              <div className="overview-header">
                <p className="header-text">Total Raised</p>
                <DollarSign size={20} color="#700000" strokeWidth={2.4} />
              </div>
              <p className="ov-val">{totalDonationAmount.toLocaleString()} Tk</p>
            </div>

            <div className="overview-card">
              <div className="overview-header">
                <p className="header-text">Total Donations</p>
                <Users size={20} color="#700000" strokeWidth={2.4} />
              </div>
              <p className="ov-val">{totalBeneficiaries.toLocaleString()}</p>
            </div>

            <div className="overview-card">
              <div className="overview-header">
                <p className="header-text">Items Distributed</p>
                <Package size={20} color="#700000" strokeWidth={2.4} />
              </div>
              <p className="ov-val">{itemsDistributed.toLocaleString()}</p>
            </div>
          </div>

          <div className="donation-table-container">
            <p>All Donations</p>
            <table>
              <thead className="donation-table-head">
                <tr>
                  <th>Donor Name</th>
                  <th>Contact</th>
                  <th>Donation Type</th>
                  <th>Item / Amount</th>
                  <th>Quantity</th>
                  <th>Date Received</th>
                </tr>
              </thead>
              <tbody>
                {donations.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
                      No donations found
                    </td>
                  </tr>
                ) : (
                  donations.map(d => (
                    <tr key={d.id}>
                      <td>{d.donor || "-"}</td>
                      <td>{d.donor_contact || "-"}</td>
                      <td>{d.donation_type || "-"}</td>
                      <td>{d.donation_type === "Money" ? `${Number(d.amount || 0).toLocaleString()} Tk` : d.item || "-"}</td>
                      <td>{d.donation_type === "Money" ? "-" : d.quantity || "-"}</td>
                      <td>{formatDate(d.date_received)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {showAddModal && (
            <div className="modal-backdrop">
              <DonationAddModal handleState={closePopup} />
            </div>
          )}
        </section>
      </main>
    </>
  );
}