import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Security, SecureRoute,ImplicitCallback} from '@okta/okta-react';
import './App.css'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import HomepageProvider from './components/HomepageProvider';
import Homepage from './components/Homepage';
import PatientDashboard from './components/PatientDashboard';
import PatientPermissions from './components/PatientPermissions';
import ProviderDashboard from './components/ProviderDashboard';
import ProviderPermissions from './components/ProviderPermissions.js';



function onAuthRequired({history}){
  history.push('/Login');
}

export default class App extends Component {
  componentDidMount(){
    document.title = "PHR: Home"
  }
  render() {
    return (
    <Router>
        <div>          
          <Switch>
            <Route exact path='/' component={Home} />
              <Route path='/HomepageProvider' component={HomepageProvider} />
              <Route path='/Provider/Dashboard' component={ProviderDashboard} />
              <Route path='/Provider/Permissions' component={ProviderPermissions} />
          </Switch>
        </div>
      </Router>
    );
  }
}
