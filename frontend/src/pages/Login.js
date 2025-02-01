import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      dispatch(loginUser({ username, password }))
        .unwrap()
        .then(() => {
          navigate("/dashboard");
        })
        .catch((err) => console.error(err));
    };
  
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Login</h2>
          <form className={styles.form} onSubmit={handleLogin}>
            <input
              className={styles.input}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className={styles.button} type="submit">
              Login
            </button>
          </form>
          <p className={styles.switchText}>
            Don't have an account?{" "}
            <span className={styles.link} onClick={() => navigate("/register")}>
              Register
            </span>
          </p>
        </div>
      </div>
    );
  }
  
  export default Login;
