import axios from "axios";
import { useState } from "react";

const USERREGISTRY_API_ENDPOINT = import.meta.env.VITE_USERREGISTRY_API_ENDPOINT;

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");


    const handleRegister = (e) => {
        e.preventDefault()
        axios.post(`${USERREGISTRY_API_ENDPOINT}/api/auth/register`, {

            email: email,
            password: password,
            firstName: firstname,
            lastName: lastname

        }).catch((error) => {
            console.error("Registration failed:", error);
        });
    }

    return (
        <>

            <form onSubmit={handleRegister}>
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
                <button type="submit">
                    Register
                </button>
            </form>

        </>
    )
}

export default Register;