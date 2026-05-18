import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="navbar">

            <ul className="nav-links">

                <li><Link to="/login">Login</Link></li>
                <li><Link to="/">Shop</Link></li>
                <li><Link to="/cart">Cart</Link></li>

            </ul>
        </nav>



    )
}

export default Navbar;