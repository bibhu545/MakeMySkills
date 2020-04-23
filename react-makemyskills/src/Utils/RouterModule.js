import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Home from '../Components/Home/Home'

function RouterModule() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Home}></Route>
            </Switch>
        </Router>
    )
}

export default RouterModule
