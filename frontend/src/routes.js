import React from 'react';
import { BrowserRouter, Route, Switch }from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewTask from './pages/New Task'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/Register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path='/task/new' component={NewTask} />


            </Switch>
        </BrowserRouter>
    );

}
