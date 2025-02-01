import React from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Dashboard.module.css"; // Import CSS Module

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user); // Get the user from Redux

  return (
    <div>
      <div className={styles.dashboardContainer}>
        <h1>Welcome to Your Dashboard</h1>
        {user ? (
          <div className={styles.userDetails}>
            <h2>User Details:</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
