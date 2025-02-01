import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(null);

  const user = useSelector((state) => state.auth.user); // Get user from Redux

  useEffect(() => {
    // Fetch user from localStorage if not available in Redux state
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUsername(storedUser.username); // Set username from localStorage
      }
    } else {
      setUsername(user.username); // Use Redux state if available
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout()); // Logout user by clearing Redux state and localStorage
    localStorage.removeItem("user");
  };

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.navbarLogo}>
        MyApp
      </Link>
      <ul className={styles.navbarLinks}>
        {username && <li className={styles.username}>Hello, {username}</li>}
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <button onClick={handleLogout} className={styles.navbarButton}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
