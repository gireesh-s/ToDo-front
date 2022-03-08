import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Components/Header/Header';
import Home from '../Pages/Home/Home';

const Routes = () => {
  return (
    <Router>
        <Header/>
        <Switch>
            <Route path="/" exact component={Home} />
        </Switch>
    </Router>
  )
}

export default Routes