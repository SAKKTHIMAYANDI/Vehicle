import React from "react";
import { Link } from "react-router-dom";
// import "@/styles.css";
import "./../assets/style.css"; // If Navbar is inside "src/components/"


const Navbar = () => {
    return (
        <header>

            <nav class="nav-links" id="navLinks">
                <div>
                    <Link to="/" class="header">Home</Link>
                    <Link to="/components" class="header">Components</Link>
                    <Link to="/vehicles" class="header">Vehicles</Link>
                    <Link to="/issues" class="header">Issues</Link>
                    <Link to="/services" class="header">Invoice</Link>
                    <Link to="/revenue" class="header">Revenue</Link>

                </div>
            </nav>
        </header>
    );
};

export default Navbar;
