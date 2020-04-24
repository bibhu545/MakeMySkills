import React from 'react'
import './home.css'

function Home() {
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-12 hero-text">
                        <h1>Welcome to <span className="hero-brand-text">MakeMySkills</span></h1>
                        <br />
                        <h3>Hundreds of Mock Tests online for free...</h3>
                        <br />
                        <br />
                        <span className="scroll-down">
                            <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className="col-md-6 col-12 hero-img">

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home
