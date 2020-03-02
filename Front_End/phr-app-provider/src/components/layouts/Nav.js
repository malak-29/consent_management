import React from "react";
import { Link } from "react-router-dom";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light " >  
              <ul className="navbar-nav mr-auto">              
                <li>
                  <Link to={"/Patient/Dashboard"} className="nav-link">Dashboard</Link>
                </li>
                <li>
                  <Link to={"/Patient/Permissions"} className="nav-link">Permissions</Link>
                </li>
               
              </ul>
        </nav>
      </div>
    );
  }
}
