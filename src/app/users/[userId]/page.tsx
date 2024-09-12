"use client";
import "@/components/styles/p1b.css"
import "@/components/styles/p1a.css"
import "@/components/styles/p1c.css"
import BDash from '../../(protected)/components/BDash'
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from 'next/link';

const UserDetailPage = () => {
  const { userId } = useParams(); // Extract userId from the URL

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pastPurchases, setPastPurchases] = useState([
    {
      farmerName: 'Sample Farmer',
      cropType: 'Wheat',
      quantityTaken: 500,
      totalAmount: 2500,
    },]);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (

    <div className="container">
      <div className="sidebar">
        <h2 className="buyer-profile">Buyer Profile</h2>
        <BDash />
      </div>


      <div className="main-content form-background">
        {/* Profile Section */}
        <div className="profile-card">
          <div className="profile-picc">
            <img src="https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg?size=626&ext=jpg&ga=GA1.1.1974988790.1724696296&semt=ais_hybrid" alt="Profile Pic" />
          </div>

          <div className="profile-detailss">
            <h2>Hello, I'm John Doe</h2>
            <p>{userData.description}</p>
            <h3>john.doe@example.com</h3>
          </div>
        </div>
        <div className="details-group text-center mb-4" >
          <p className="mb-6"><strong>Preferred Crops:</strong> {userData.category}</p>
          <p className="mb-6"><strong>Payment Terms:</strong> {userData.paymentTerms}</p>
          <p className="mb-6"><strong>Address:</strong> {userData.address}</p>
          <p className="mb-6"><strong>City:</strong> {userData.location}</p>
          <p className="mb-6"><strong>Minimum Quantity:</strong> {userData.minimumQuantity}</p> {/* Updated field */}
          <p className="mb-6"><strong>Start Month:</strong> {userData.startingMonth}</p> {/* Added start month */}
          <p className="mb-6"><strong>End Month:</strong> {userData.endingMonth}</p> {/* Added end month */}
        </div>

        {/* Past Purchases Section */}
        <div className="purchases-section text-center" id="past-purchases-section">
          <h2 className="font-bold">Past Purchases</h2>
          <div className="purchases-container">
            {pastPurchases.length > 0 ? (
              pastPurchases.map((purchase, index) => (
                <div className="purchase-card " key={index}>
                  <h3 className="mb-4">Farmer: {purchase.farmerName}</h3>
                  <p className="mb-4">Crop Type: {purchase.cropType}</p>
                  <p className="mb-4">Quantity Taken: {purchase.quantityTaken} kg</p>
                  <p className="mb-4">Total Amount: Rs:{purchase.totalAmount}</p>
                </div>
              ))
            ) : (
              <p>No past purchases available.</p>
            )}
          </div>
        </div>
          <div className="form-group text-center">
            <button type="submit" className="text-white">Chat with the person</button>
          </div>
          <div className="form-group text-center">
            <button type="submit" className="text-white">Make a propasal of a contract</button>
          </div>
         
      </div>
    </div>
  )
}

export default UserDetailPage