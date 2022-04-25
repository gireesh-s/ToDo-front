import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Components/Header/Header';
import signUp from '../Pages/Auth/SignUp/signUp';
import signIn from '../Pages/Auth/SignIn/signIn';
import Home from '../Pages/Home/Home';
import EditTodo from '../Pages/EditTodo/EditTodo';
import Profile from '../Pages/Profile/Profile';
import EditProfile from '../Pages/Profile/EditProfile/EditProfile';

const Routes = () => {
  return (
    <Router>
        <Header/>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile/:userId" exact component={Profile} />
            <Route path="/edit/profile/:userId" exact component={EditProfile} />
            <Route path="/edit/:todoId" exact component={EditTodo} />
            <Route path="/signup" exact component={signUp} />
            <Route path="/signin" exact component={signIn} />
        </Switch>
    </Router>
  )
}

export default Routes