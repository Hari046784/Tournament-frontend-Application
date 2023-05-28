import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar () {
    return(
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid ">
                    <div className="name">HD</div>
                    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                        <div className="navbar-nav text-center">
                            <Link className="nav-link" to="/">Home</Link>
                            <Link className="nav-link" to="/atournament">Tournament Details</Link>
                            <Link className="nav-link" to="/aparticipant">Participant Details</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;