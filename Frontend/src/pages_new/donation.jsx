import React, { useState } from "react";
import { Users, Package, DollarSign } from "lucide-react";
import "./styles/donation.css";
import { Sidebar } from "../components/large_components/Sidebar";
import { Header } from "../components/base_components/Header";
import { DonationAddModal } from "../components/large_components/DonationAddModal";
import { ButtonRed } from "../components/base_components/ButtonRed";

// const recentDonations = [
//   {
//     id: 1,
//     donor_name: "",
//     amount: "",
//     donation_type: "",
//     date: "",
//   }
// ];


export function DonationPage() {
  
  const totalDonationAmount = 0; //amader table e total koto taka uthse shetar sum
  const totalBeneficiaries = 0; //koita donor shetar count
  const itemsDistributed = 0; //money baade jotogula donation shetar total count, ba aro straightforward hocche Goods table er total count

  const [showAddModal, setShowAddModal] = useState(false);

  const closePopup = () => {
    setShowAddModal(false);
  };

  return (
    <>
      <Sidebar></Sidebar>
      <Header title={"Donations"}></Header>
      <main>
        <section className="active-events">
          <div className="shelter-subheader">
            <div className="modal-btn-position">
              <ButtonRed btnText={"Add Donation"} onClick={()=>setShowAddModal(true)}></ButtonRed>
            </div>
          </div>

          <div className="overview">
            
            <div className="overview-card">
              <div className="overview-header">
                <p className="header-text">Total Raised</p>
                <DollarSign size={20} color="#700000" strokeWidth={2.4}></DollarSign>
              </div>
              <p className="ov-val">{totalDonationAmount}</p>
            </div>
            
            <div className="overview-card">
              <div className="overview-header">
                <p className="header-text">Total Beneficiaries</p>
                <Users size={20} color="#700000" strokeWidth={2.4}></Users>
              </div>
              <p className="ov-val">{totalBeneficiaries}</p>
            </div>

            <div className="overview-card">
              <div className="overview-header">
                <p className="header-text">Items Distributed</p>
                <Package size={20} color="#700000" strokeWidth={2.4}></Package>
              </div>
              <p className="ov-val">{itemsDistributed}</p>
            </div>

          </div>

          <div className="donation-table-container">
            <p>All Donations</p>
            <table>
              <thead className="donation-table-head">
                <th>Donor Name</th>
                <th>Donation Type</th>
                <th>Amount</th>
              </thead>

              <tbody> {/*ekhane table er value gula just boshai dis*/}
                <tr>
                  <td>Kuddus Ali</td>
                  <td>Money</td>
                  <td>10000</td>
                </tr>
              </tbody>
            </table>
          </div>
            {showAddModal && 
              <div className="modal-backdrop">
                <DonationAddModal
                handleState={closePopup}></DonationAddModal>
              </div>                
            }
        </section>
      </main>
    </>
  );
}
