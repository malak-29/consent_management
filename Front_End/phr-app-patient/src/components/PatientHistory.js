import React from "react";
//import Img from 'react-image';
import {withRouter} from "react-router-dom";
import Nav from "./layouts/Nav";
import ProfileBar from "./layouts/ProfileBar";
var username="PAT1";
var HistoryData;
class History extends React.Component {
  render() {
    return (
      <div>
        <div>
          <ProfileBar />
          <Nav />
        </div>
        <div className="container">
          <div className="card card-lg box">
            <h5>StateID: Req1</h5>
            <p>ProID: PRO1 &nbsp;&nbsp;&nbsp;&nbsp; Category: Medication &nbsp;&nbsp;&nbsp;&nbsp; Status: Proposed &nbsp;&nbsp;&nbsp;&nbsp; TimeStamp: Wed 10-11-2019 9:12</p>
            <p>ProID: PRO1 &nbsp;&nbsp;&nbsp;&nbsp; Category: Medication &nbsp;&nbsp;&nbsp;&nbsp; Status: Accepted &nbsp;&nbsp;&nbsp;&nbsp; TimeStamp: Wed 10-11-2019 10:45</p>
            <p>ProID: PRO1 &nbsp;&nbsp;&nbsp;&nbsp; Category: Medication &nbsp;&nbsp;&nbsp;&nbsp; Status: Revoked &nbsp;&nbsp;&nbsp;&nbsp; TimeStamp: Wed 13-11-2019 11:23</p>
            <h5>StateID: Req2</h5>
            <p>ProID: PRO1 &nbsp;&nbsp;&nbsp;&nbsp; Category: Brushing &nbsp;&nbsp;&nbsp;&nbsp; Status: Proposed &nbsp;&nbsp;&nbsp;&nbsp; TimeStamp: Wed 09-11-2019 9:12</p>
            <p>ProID: PRO1 &nbsp;&nbsp;&nbsp;&nbsp; Category: Brushing &nbsp;&nbsp;&nbsp;&nbsp; Status: Rejected &nbsp;&nbsp;&nbsp;&nbsp; TimeStamp: Wed 10-11-2019 10:45</p>
          </div>
        </div>
    </div>
    );
  }
};
export default withRouter(History);