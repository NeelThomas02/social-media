import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Auth.module.css";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const { username, email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await dispatch(registerUser({ username, email, password }));
        if (!response.error) {
            navigate("/");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Register</h2>
                <form className={styles.form} onSubmit={handleRegister}>
                    <input type="text" name="username" placeholder="Username" value={username} onChange={handleChange} className={styles.input} required />
                    <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} className={styles.input} required />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} className={styles.input} required />
                    <button type="submit" className={styles.button}>Register</button>
                </form>
                <p className={styles.switchText}>
                    Already have an account? <Link to="/" className={styles.link}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
