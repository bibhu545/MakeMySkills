import React from 'react'
import './home.css'
import TestDetails from '../Partial/TestDetails';

function Home() {
    const test = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-7 col-12 hero-text center-content">
                        <h1>Welcome to <span className="hero-brand-text">MakeMySkills</span></h1>
                        <br />
                        <h3>Hundreds of Mock Tests online for free...</h3>
                        <br />
                        <br />
                        <span className="scroll-down">
                            <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className="col-md-5 col-12 hero-img"></div>
                </div>
            </div>
            <div className="container-fluid center-content">
                <div className="row stats-row bg-light">
                    <div className="col-md-3 col-12">
                        <h3> 150 + <br /> Online Tests</h3>
                    </div>
                    <div className="col-md-3 col-12">
                        <h3> 5000 + <br /> Test Takers</h3>
                    </div>
                    <div className="col-md-3 col-12">
                        <h3> 15000 + <br /> Tests Attempted</h3>
                    </div>
                    <div className="col-md-3 col-12">
                        <h3> 200000 + <br /> Questions Attempted</h3>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row tests-row">
                    <div className="col-12 center-content">
                        <h3><i className="fa fa-bolt" aria-hidden="true"></i> Trending Tests</h3>
                    </div>
                    {
                        test.map((item, index) =>
                            <div className="col-md-3 col=sm-6 col-12" key="index"><TestDetails test={test} /></div>
                        )
                    }
                </div>
            </div>
            <div className="container">
                <div className="row tests-row">
                    <div className="col-12 center-content">
                        <h3><i className="fa fa-paper-plane" aria-hidden="true"></i> Latest Tests</h3>
                    </div>
                    {
                        test.map((item, index) =>
                            <div className="col-md-3 col=sm-6 col-12" key="index"><TestDetails test={test} /></div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home
