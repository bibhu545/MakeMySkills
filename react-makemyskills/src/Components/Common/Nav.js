import React, { useState, useEffect } from 'react';
import './Common.css';
import Login from '../Account/Login';
import HttpService from '../../Utils/HttpService';
import { API_ENDPOINTS } from '../../Utils/Utils';
import { showModal } from '../../Redux/CommonActions';
import { connect } from 'react-redux';

function Nav() {

    const [show, setShow] = useState(false);
    const [topics, setTopics] = useState([])

    useEffect(() => {
        new HttpService().getData(API_ENDPOINTS.GelHomePageCommonData).then(response => {
            setTopics(response.data.results[0]);
        }).catch(error => {
            console.log(error);
        });
    }, [])
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
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
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="##" id="navbardrop" data-toggle="dropdown">
                                    Subjects
                                </a>
                                <div className="dropdown-menu">
                                    {
                                        topics.map((item, index) =>
                                            <a className="dropdown-item" href="##" key={index}>{item.topicName}</a>
                                        )
                                    }
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="##" onClick={() => setShow(true)}>Login/Register </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="##" id="navbardrop" data-toggle="dropdown">
                                    My Profile
                                </a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="/user-home">Dashboard</a>
                                    <a className="dropdown-item" href="##">Change Password</a>
                                    <a className="dropdown-item" href="##">Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Login
                show={show}
                onHide={() => { setShow(false); console.log('object') }}
            />

        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

const mapActionToProps = (dispatch) => {
    return {
        showModal: () => {
            dispatch(showModal())
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(Nav)
