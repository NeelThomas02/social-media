import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";
import styles from "../styles/Auth.module.css";

const Register = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the data as multipart/form-data
    const formDataToSend = new FormData();
    formDataToSend.append("username", username);
    formDataToSend.append("email", email);
    formDataToSend.append("password", password);
    formDataToSend.append("firstName", firstName);
    formDataToSend.append("lastName", lastName);
    formDataToSend.append("bio", bio);
    formDataToSend.append("location", location);
    if (profilePicture) {
      formDataToSend.append("profilePicture", profilePicture);
    }

    try {
        // Send a POST request to the backend API for registration
        const response = await axios.post("http://localhost:5000/api/auth/register", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Registration successful:", response.data);
        dispatch(registerUser(response.data)); // Dispatch action to Redux store
  
        // Redirect to the login page upon successful registration
        window.location.href = "/";  // Use this for redirecting to the login page
      } catch (err) {
        console.error("Error during registration:", err.response ? err.response.data : err.message);
        setError(err.response ? err.response.data.message : "Registration failed. Please try again.");
      }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Register</h1>
        <form onSubmit={handleRegister} className={styles.form}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={styles.input}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={styles.input}
            />
          </div>
          <div>
            <label>Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={styles.input}
            ></textarea>
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.input}
            />
          </div>
          <div>
            <label>Profile Picture:</label>
            <input
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>Register</button>
        </form>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Register;
