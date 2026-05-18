import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const USERREGISTRY_API_ENDPOINT = import.meta.env.VITE_USERREGISTRY_API_ENDPOINT;


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {

        axios.post(`${USERREGISTRY_API_ENDPOINT}/api/auth/login`, {
            email: email,
            password: password
        }).then((response) => {
            localStorage.setItem("token", response.data.token);
            window.location.href = "/";
        }).catch((error) => {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials and try again.");
        });
    }

    return (
        <div className="login-page">

            <form className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" onClick={handleLogin}>
                    Login
                </button>

                <Link to="/register">Don't have an account? Register here.</Link>

            </form>

        </div>
    )
}

export default Login;