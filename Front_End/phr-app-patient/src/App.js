import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import PatientDashboard from './components/PatientDashboard';
import PatientPermissions from './components/PatientPermissions';
import PatientHistory from './components/PatientHistory';


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
              <Route path='/Patient/Dashboard' component={PatientDashboard} />
              <Route path='/Patient/Permissions' component={PatientPermissions} />
              <Route path='/Patient/History' component={PatientHistory} />
          </Switch>
        </div>
      </Router>
    );
  }
}
