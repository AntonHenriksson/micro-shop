import { Link } from "react-router-dom";

function Navbar() {

    return (
        <>
            <nav>
                <ul>

                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/">Shop</Link></li>
                    <li><Link to="/cart">Cart</Link></li>

                </ul>
            </nav>


        </>
    )
}

export default Navbar;