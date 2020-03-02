import React from "react";
import Modal from 'react-responsive-modal';
import {check} from 'react-icons-kit/feather/check'
import {x} from 'react-icons-kit/feather/x'
import { ButtonToolbar } from 'reactstrap';
import { Icon } from 'react-icons-kit'
import {fileText} from 'react-icons-kit/feather/fileText'
import Nav from "./layouts/Nav";
import ProfileBar from "./layouts/ProfileBar";
var consentdata;

export default class PatientPermissions extends React.Component {
  constructor (props){
    super(props);
    this.state={
      open:false,
      param:"patID=PAT1",
      patID:"PAT1",
      requests:[],
      blockdata:[]
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.putblockdata = this.putblockdata.bind(this);
    this.getdata = this.getdata.bind(this);
    this.setblockdata = this.setblockdata.bind(this);
    this.viewconsent = this.viewconsent.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.putModal = this.putModal.bind(this);
    this.brushingChange = this.brushingChange.bind(this);
  }
  viewconsent(){
    this.onOpenModal();
  }
  onOpenModal() {
    this.setState({open:true});
  }

  onCloseModal() {
    this.setState({open:false});
  }


  putModal(){
    fetch('http://130.147.175.221:5015/api/consentHappyFhir/consent?consentId=34',{
       method: 'get',
       headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}
     }).then(res =>{if (res.status>=200 && res.status<300) {
       return res.json();
     }
      else {
     console.log('sometihng went wrong');
        }
      }).then(data =>{
        consentdata=JSON.stringify(data);
        console.log(consentdata);
        
      }).catch(err => err);
      return(
        <div>
        <h3>PatientID: PAT1</h3>
          {
            consentdata
          }
        </div>
      );
    }

  componentDidMount(){

    fetch('http://130.147.175.221:8099/querypatreq?'+this.state.param,{
     method: 'get'
    }).then(res =>{if (res.status>=200 && res.status<300) {
    
    return this.getdata(res.json());
    }
    else {
      console.log('sometihng went wrong');
          }
    });
}    

    brushingChange(){
      let requestData = this.state.requests;
      console.log(requestData);
      
      if(this.state.requests.length >0){
        for(var i in requestData){
          if(requestData[i].record.Category == "Lifestyle"){
            requestData[i].record.Category ="Brushing";
          }
        }
        this.setState({request:requestData});
      }      
    }

    getdata(json1){
          json1.then((json)=>{
            console.log(json)
            for (var i in json){
            console.log(json[i].Key);
            console.log(json[i].Record);
            let req={
              reqID:json[i].Key,
              record:json[i].Record
            }          
            this.setState({
              requests:[...this.state.requests,req]
            });
            }
            console.log(this.state.requests);
            this.brushingChange();
            console.log(this.state.requests);            
            console.log(this.state.param);
            this.putblockdata();
            });
        }
          
              
  

  putblockdata(){
    fetch('http://130.147.175.221:8099/chaindashboard?'+this.state.param,{
     method: 'get'
   }).then(res =>{if (res.status>=200 && res.status<300) {
     
     return this.setblockdata(res.json());
  }
 else {
   console.log('sometihng went wrong');
      }
    });
  }
    setblockdata(json1){
      json1.then((json)=>{
        var count = 1;
        for (var i in json){
          let blocks={
            srno:count,
            block:json[i]
          };
          this.setState({
            blockdata:[...this.state.blockdata,blocks]
          });
          count = count +1;
        }
      });
    }
      
    
  

  acceptRequest(Req,PatientID) {
    console.log('The accept button was clicked. ');
    var payload = {
      "reqID": Req,
      "response": "accepted",
      "patID": PatientID
    };
  
     fetch('http://130.147.175.221:8099/response',{
       method: 'post',
       body : JSON.stringify(payload),
       headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}
     }).then(res =>{if (res.status>=200 && res.status<300) {
       console.log(res);
     }
   else {
     console.log('sometihng went wrong');
        }
      }).catch(err => err);
  
    console.log(payload);

    let consent ={ "resourceType": "Consent",
    "id":"34",
    "meta":
     { "versionId": "1", "lastUpdated": "2019-08-19T08:11:54.667+05:30" },
    "status": "active",
    "patient": { "reference": "Patient/32", "display": "P." },
    "period": { "start": "1965-01-01", "end": "2017-01-01" },
    "dateTime": "2017-06-11",
    "organization":
     [ { "reference": "Organization/1", "display": "HealthStar Hospital" } ],
    "sourceAttachment":
     { "title": "The terms of the consent in lawyer speak 2222Av. 1" },
    "policyRule": "http://goodhealth.org/consent/policy/opt-in" };

    fetch('http://130.147.175.221:5015/api/consentHappyFhir/consent',{
     method: 'put',
     headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},
     body:JSON.stringify(consent),
   }).then(res =>{if (res.status>=200 && res.status<300) {
     return res.json();
   }
    else {
   console.log('sometihng went wrong');
      }
    }).then(data =>{
      consentdata=JSON.stringify(data);
      console.log(consentdata);
      
    }).catch(err => err);

  }
  
  rejectRequest(Req,PatientID) {  
    console.log('The button was clicked. ');
    var payload = {
      "reqID": Req,
      "response": "rejected",
      "patID": PatientID
    };
  
     fetch('http://130.147.175.221:8099/response',{
       method: 'post',
       body : JSON.stringify(payload),
       headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}
     }).then(res =>{if (res.status>=200 && res.status<300) {
       console.log(res);
     }
   else {
     console.log('sometihng went wrong');
        }
      }).catch(err => err);
  
    console.log(payload);

    let consent ={ "resourceType": "Consent",
    "id":"34",
    "meta":
     { "versionId": "1", "lastUpdated": "2019-08-19T08:11:54.667+05:30" },
    "status": "rejected",
    "patient": { "reference": "Patient/32", "display": "P." },
    "period": { "start": "1965-01-01", "end": "2017-01-01" },
    "dateTime": "2017-06-11",
    "organization":
     [ { "reference": "Organization/1", "display": "HealthStar Hospital" } ],
    "sourceAttachment":
     { "title": "The terms of the consent in lawyer speak 2222Av. 1" },
    "policyRule": "http://goodhealth.org/consent/policy/opt-in" };

    fetch('http://130.147.175.221:5015/api/consentHappyFhir/consent',{
     method: 'put',
     headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},
     body:JSON.stringify(consent),
   }).then(res =>{if (res.status>=200 && res.status<300) {
     return res.json();
   }
    else {
   console.log('sometihng went wrong');
      }
    }).then(data =>{
      consentdata=JSON.stringify(data);
      console.log(consentdata);
      
    }).catch(err => err);
  }
  
  revokeRequest(Req,PatientID) {  
    console.log('The button was clicked. ');
    var payload = {
      "reqID": Req,
      "patID": PatientID
    };
  
     fetch('http://130.147.175.221:8099/revoke',{
       method: 'post',
       body : JSON.stringify(payload),
       headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}
     }).then(res =>{if (res.status>=200 && res.status<300) {
       console.log(res);
     }
   else {
     console.log('sometihng went wrong');
        }
      }).catch(err => err);
  
    console.log(payload);

    let consent ={ "resourceType": "Consent",
    "id":"34",
    "meta":
     { "versionId": "1", "lastUpdated": "2019-08-19T08:11:54.667+05:30" },
    "status": "rejected",
    "patient": { "reference": "Patient/32", "display": "P." },
    "period": { "start": "1965-01-01", "end": "2017-01-01" },
    "dateTime": "2017-06-11",
    "organization":
     [ { "reference": "Organization/1", "display": "HealthStar Hospital" } ],
    "sourceAttachment":
     { "title": "The terms of the consent in lawyer speak 2222Av. 1" },
    "policyRule": "http://goodhealth.org/consent/policy/opt-in" };

    fetch('http://130.147.175.221:5015/api/consentHappyFhir/consent',{
     method: 'put',
     headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},
     body:JSON.stringify(consent),
   }).then(res =>{if (res.status>=200 && res.status<300) {
     return res.json();
   }
    else {
   console.log('sometihng went wrong');
      }
    }).then(data =>{
      consentdata=JSON.stringify(data);
      console.log(consentdata);
      
    }).catch(err => err);
  }

  render() {
    console.log("featured");
    
    const TableRow1 = ({ Req, ProviderID, Category, CategoryID, Status}) => {
      return (
        <tr>
          <td>{Req}</td>
          <td>{ProviderID}</td>
          <td>{Category}</td>
          <td>{CategoryID}</td>
          <td>{Status}</td>
          <td>
            <ButtonToolbar>
              <button type="button" onClick={()=>{this.viewconsent();}} className="btn" style ={{backgroundColor: '#116ea8', color:'#fff'}}><Icon size={'18'} icon={fileText}/></button>
            </ButtonToolbar>
          </td>
          <td>
          <ButtonToolbar>
          <button type="button" onClick={()=>this.acceptRequest(Req,this.state.patID)} className="btn" style ={{backgroundColor: '#189c0c' , color:'#fff'}}><Icon size={'18'} icon={check}/></button>
          <span> </span>
          <button type="button" onClick={()=>this.rejectRequest(Req,this.state.patID)} className="btn" style ={{backgroundColor: '#b01f0c' , color:'#fff'}}><Icon size={'18'} icon={x}/></button>
         </ButtonToolbar>
         </td>
       </tr>
      );
    }
  
    const TableRow2 = ({ Req, ProviderID, Category, CategoryID, Status}) => {
        return (
          <tr>
            <td>{Req}</td>
            <td>{ProviderID}</td>
            <td>{Category}</td>
            <td>{CategoryID}</td>
            <td>{Status}</td>
            <td>
              <ButtonToolbar>
              <button type="button" onClick={()=>{this.viewconsent();}} className="btn" style ={{backgroundColor: '#116ea8' , color:'#fff'}}><Icon size={'18'} icon={fileText}/></button>
            </ButtonToolbar>
              </td>
            <td>
            <ButtonToolbar>
              <button type="button" onClick={()=>this.revokeRequest(Req,this.state.patID)} className="btn" style ={{backgroundColor: '#b01f0c' , color:'#fff'}}><Icon size={'18'} icon={x}/></button>
            </ButtonToolbar>
            </td>
          </tr>
        );
      }
  
      const TableRow3 = ({ Req, ProviderID, Category, CategoryID, Status}) => {
          return (
            <tr>
              <td>{Req}</td>
              <td>{ProviderID}</td>
              <td>{Category}</td>
              <td>{CategoryID}</td>
              <td>{Status}</td>
              <td>
              <ButtonToolbar>
              <button type="button" onClick={()=>{this.viewconsent();}} className="btn btn-primary"><Icon size={'18'} icon={fileText}/></button>
            </ButtonToolbar>
              </td>
              <td></td>
            </tr>
          );
        }
  
        const TableRow4 = ({ SrNo, blockNumber, prevHash, currentHash}) => {
          return (
            <tr>
              <td>{SrNo}</td>
              <td>{blockNumber}</td>
              <td>{prevHash}</td>
              <td>{currentHash}</td>
            </tr>
          );
        }

    return (
      <div>
        <div>
          <ProfileBar />
          <Nav />
        </div>
        <div className="container">
      <div className="well well-lg">
         <div className = "row">
          <div className ="col-8">
            <div className ="row-1">
              <div className ="panel panel-primary">                
              <div className="panel-body">
                <div className="table-hover">
                  <table className ="table">
                  <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">DoctorID</th>
                        <th scope="col">Category</th>
                        <th scope="col">CategoryID</th>
                        <th scope="col">Status</th>
                        <th scope="col">Consent</th>
                        <th scope="col">Response</th>
                      </tr>
                      </thead>
                      <tbody>

                      {
                          this.state.requests.map((request) => {
                            if (request.record.Status == "pending"){
                            return (
                                <TableRow1
                                  key={request.reqID}
                                  Req={request.reqID}
                                  ProviderID={request.record.ProviderID}
                                  Category={request.record.Category}
                                  CategoryID={request.record.CategoryID}
                                  Status={request.record.Status}
                                />
                            );
                          } else if( request.record.Status == "accepted"){
                            return (
                                <TableRow2
                                  key={request.reqID}
                                  Req={request.reqID}
                                  ProviderID={request.record.ProviderID}
                                  Category={request.record.Category}
                                  CategoryID={request.record.CategoryID}
                                  Status={request.record.Status}
                                />
                            );
                          } else {
                            return (
                                <TableRow3
                                  key={request.reqID}
                                  Req={request.reqID}
                                  ProviderID={request.record.ProviderID}
                                  Category={request.record.Category}
                                  CategoryID={request.record.CategoryID}
                                  Status={request.record.Status}
                                />
                                );
                          }
                              })
                        }
                    </tbody>
                    </table>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <div className ="col-4">
      <div className ="panel panel-primary">
          <div className="panel-body">
            <center>
            <img src="https://www.techadvisor.co.uk/cmsdata/reviews/3652375/philips-sonicare-app-scrub.jpg" height="500" width="500"/>
            </center>
          </div>
       </div>
    </div>
</div>
<Modal open = {this.state.open} onClose={(e)=>{this.onCloseModal(e)}} center>
                    <div style={{width: "700px", height:"300px"}}>
                      <h1> consent Data </h1>
                      <hr />
                      {
                        this.putModal()
                      }
                    </div>
        </Modal>
<div className ="col-12">
    <div className ="row-1">
        <div className="panel-heading"> BLOCKS</div>
           <div className ="panel panel-primary">
          <div className="panel-body">
           <div className="table-hover">
            <table className ="table" style={{fontSize:'15px'}}>
            <thead>
           <tr>
           <th scope="col">#</th>
           <th scope="col">Block Number</th>
           <th scope="col">Previous Hash</th>
           <th scope="col">Current Hash</th>
           </tr>
           </thead>
           <tbody style={{'wordBreak': 'break-all'}}>
            {
              this.state.blockdata.map((upload) => {
                 return (
                     <TableRow4
                       key={upload.srno}
                       SrNo={upload.srno}
                       blockNumber={upload.block.blockNumber}
                       prevHash={upload.block.prevHash}
                       currentHash={upload.block.dataHash}
                     />
                 );
               })
             }

           </tbody>
           </table>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>
      </div>
    );
  }
};