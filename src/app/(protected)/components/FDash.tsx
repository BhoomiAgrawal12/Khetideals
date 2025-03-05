"use client";
import Link from "next/link";
import React from "react";
import "@/components/styles/p1a.css";

const FDash = () => {
  return (
    <>
      <h2 className="farmer-profile">Farmer Profile</h2>
      <Link href="/farmerManageProfile">
        <div className="dashboard-box">
          <h3>
            <strong>Manage Profile</strong>
          </h3>
          <p>Update your profile and farming details.</p>
        </div>
      </Link>
      <Link href="/farmerProfile">
        <div className="dashboard-box">
          <h3>
            <strong>My Profile</strong>
          </h3>
          <p>View your profile and farming details.</p>
        </div>
      </Link>
      <Link href="/dashboard">
        <div className="dashboard-box">
          <h3>
            <strong>Search Potential Buyers</strong>
          </h3>
          <p>Explore new farming opportunities and buyers.</p>
        </div>
      </Link>
      <Link href="/farmerProfile#ongoing-contracts-section">
        <div className="dashboard-box">
          <h3>
            <strong>My Contracts</strong>
          </h3>
          <p>View and manage your current contracts.</p>
        </div>
      </Link>
      <Link href="/ShareCropperDashboard">
        <div className="dashboard-box">
          <h3>
            <strong>Be a Sharecropper???</strong>
          </h3>
          <p>
            Register yourself if you want to work on the fields of landlord and
            get paid.
          </p>
        </div>
      </Link>
    </>
  );
};

export default FDash;
