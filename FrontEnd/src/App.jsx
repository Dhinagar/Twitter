import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';


const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/Login" component={Login} />
                <Route path="/Home" component={Home} />
            </Switch>
        </Router>
    );
}


export default App;