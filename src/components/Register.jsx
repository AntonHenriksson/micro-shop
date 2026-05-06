import axios from "axios";
import { useState } from "react";

const USERREGISTRY_API_ENDPOINT = import.meta.env.VITE_USERREGISTRY_API_ENDPOINT;

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");


    const handleRegister = () => {
        axios.post(`${USERREGISTRY_API_ENDPOINT}/register`, {
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname
        }).then((response) => {
            localStorage.setItem("token", response.data.token);
            window.location.href = "/";
        }).catch((error) => {
            console.error("Registration failed:", error);
        });
    }

    return (
        <>

            <form>
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
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <button type="submit" onClick={handleRegister}>
                    Register
                </button>
            </form>

        </>
    )
}

export default Register;