import React from 'react';
import './Common.css';

function Nav() {

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="/">#MakeMySkills</a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto"></ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="/create-test">Create Test</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/tests">Tests</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="##">Subjects </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="##">Login/Register </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="##" id="navbardrop" data-toggle="dropdown">
                                    My Profile
                                </a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="/user-home">Home</a>
                                    <a className="dropdown-item" href="##">Change Password</a>
                                    <a className="dropdown-item" href="##">Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Nav
