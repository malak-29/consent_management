import React from "react";
import {Link} from 'react-router-dom';

export default (class ProfileBar extends React.Component {
  constructor() {
    super()
    this.state = {
      name:"ProviderA",
      id:"PRO1"
    };
    this.logout = this.logout.bind(this);
  }
  async logout() {
    this.props.auth.logout('/Login');
  }

  render() {
    console.log(1);
    
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark" style ={{backgroundColor: '#116ea8'}}>         
            <ul className="navbar-nav mr-auto">
              <li className="nav-link"><b>{this.state.name}</b>
              </li>
              <li className="nav-link"><b>{this.state.id}</b>
              </li>
              <li className="nav-link"><b>Male</b>
              </li>
              <li className="nav-link"><b>25</b>
              </li>
              <li><Link onClick={this.logout} className="nav-link" to={"/Login"}><b>Logout</b>
              </Link></li>
            </ul>
        </nav>
      </div>
    );
  }
});
