import React from "react";
import { Icon } from 'react-icons-kit';
import {plus} from 'react-icons-kit/ikons';
import Modal from 'react-responsive-modal';
import { ButtonToolbar } from 'reactstrap';
import ProfileBar from "./layouts/ProfileBar";
import ProviderNav from "./layouts/ProviderNav";
const patientUploads = [];
var param=null;
var consentdata;
var username="PRO1";
const blockdata =[];
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

export default (class ProviderDashboard extends React.Component {
  constructor (props){
    super(props);
    this.state={
      counter:0,
      reqResponse:{},
      requestPayload:null,
      consentData:null
    };
    this.handleRequest = this.handleRequest.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.putblockdata = this.putblockdata.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.putModal = this.putModal.bind(this);
}

putblockdata(){
  fetch('http://130.147.175.221:8099/chaindashboard?'+`${param}`,{
   method: 'get',
   headers: {'Access-Control-Allow-Origin':'*'}
 }).then(res =>{if (res.status>=200 && res.status<300) {
   return res.json();
}
else {
 console.log('sometihng went wrong');
    }
  }).then(function (json){
    var count = 1;
    for (var i in json){
      let blocks={
        srno:count,
        block:json[i]
      };
      blockdata.push(blocks);
      count = count +1;
    }
    console.log(blockdata)
  });
}

onOpenModal() {
  this.setState({open:true});
}

onCloseModal() {
  this.setState({open:false});
}

  handleRequest(PatientID, Category,CategoryID) {
    console.log('The button was clicked. ');
    let temp=Category;
    if(Category=="Brushing"){
      temp="Lifestyle"
    }
    var reqCounter = 'REQ'+this.state.counter;
    var reqPayload = {
      "reqID": reqCounter,
      "proID": username,
      "patID": PatientID,
      "category": temp,
      "categoryID":CategoryID
    };

    

    fetch('http://130.147.175.221:8099/request',{
       method: 'post',
       body : JSON.stringify(reqPayload),
       headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}
     }).then(res =>{if (res.status>=200 && res.status<300) {
       return res.json();
     }
   else {
     console.log('sometihng went wrong');
        }
      }).then(data =>{
        this.setState({reqResponse:data});
        console.log(this.state.reqResponse);
      }).catch(err => err);
    console.log(reqPayload);

    var updatedCounter = this.state.counter + 1;
    this.setState({counter:updatedCounter});
    console.log(this.state);
    
    this.onOpenModal();
  }

  putModal (){

    if(true){
      let consent ={ "resourceType": "Consent",
      "id":"34",
      "meta":
       { "versionId": "1", "lastUpdated": "2019-08-19T08:11:54.667+05:30" },
      "status": "proposed",
      "patient": { "reference": "Patient/32", "display": "P." },
      "period": { "start": "1965-01-01", "end": "2017-01-01" },
      "dateTime": "2017-06-11",
      "organization":
       [ { "reference": "Organization/1", "display": "Canada Infoway 222" } ],
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
      return(
        <div>
        <h3>PatientID: PAT1</h3>
          {
            consentdata
          }
        </div>
      );
    }
    else
      return (<div></div>)
  }

  componentWillMount(){
    blockdata.length=0;
    patientUploads.length=0;
        param="patID="+username;       
            fetch('http://130.147.175.221:8099/querydb',{
            method: 'get',
            headers: {'Access-Control-Allow-Origin':'*'}
            }).then(res =>{
                if (res.status>=200 && res.status<300) {
                    return res.json();
                }
                else {
                    console.log('sometihng went wrong');
                }
            }).then(function (json){
            var count=1;
            for(var i in json){
                for(var j in json[i].data){
                if(json[i].category=='Lifestyle'){
                  let patreq={
                    id:count,
                    category:"Brushing",
                    patID:json[i].data[j].PatientID,
                    categoryID:'LIFE'+json[i].data[j].LifeID
                };
                patientUploads.push(patreq);
                }
                else if (json[i].category=='Medication'){
                  let patreq={
                    id:count,
                    category:json[i].category,
                    patID:json[i].data[j].PatientID,
                    categoryID:'MED'+json[i].data[j].MedID
                    };
                    patientUploads.push(patreq);

                    
                }
                else {
                  let patreq={
                    id:count,
                    category:json[i].category,
                    patID:json[i].data[j].PatientID,
                    categoryID:'HIST'+json[i].data[j].HistID
                    };
                    patientUploads.push(patreq);
                    }
                    count = count +1;
                }
                }
                console.log(patientUploads);
                }
    );
    this.putblockdata();
}
  render() {
    console.log("Upload Data");

    const TableRow = ({ SrNo, PatientID, Category, CategoryID}) => {
        return (
          <tr>
            <td>{SrNo}</td>
            <td>{PatientID}</td>
            <td>{Category}</td>
            <td>{CategoryID}</td>
            <td>
            <ButtonToolbar>
              <button type="button" onClick={()=>this.handleRequest(PatientID, Category,CategoryID)} className="btn" style ={{backgroundColor: '#116ea8',color:'#fff'}}><Icon size={'18'} icon={plus}/></button>
            </ButtonToolbar>
            </td>
          </tr>
        );
      }

    return (
        <div>
        <div>
          <ProfileBar />
          <ProviderNav />
        </div>
        <div className="container">
        <div className="card card-lg">
           <div className ="card card-primary">
                  <div className="card-heading">
                    <b>Patients Request</b>
                  </div>
                  <Modal open = {this.state.open} onClose={(e)=>{this.onCloseModal(e)}} center>
                    <div style={{width: "700px", height:"300px"}}>
                      <h1> FHIR Consent</h1>
                      <hr />
                      {
                        this.putModal()
                      }
                    </div>
                  </Modal>
                  <div className="card-body">
                    <div className="table-hover">
                      <table className ="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">PatientID</th>
                            <th scope="col">Category</th>
                            <th scope="col">CategoryID</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                         {
                           patientUploads.map((upload) => {
                             return (
                                 <TableRow
                                   key={upload.id}
                                   SrNo={upload.id}
                                   PatientID={upload.patID}
                                   Category={upload.category}
                                   CategoryID={upload.categoryID}
                                 />
                             );
                           })
                         }
                        </tbody>
                      </table>
                    </div>
                  </div>
            </div>
            <div className ="col-12">
    <div className ="row-1">
        <div className="card-heading"> BLOCKS</div>
           <div className ="card card-primary">
          <div className="card-body">
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
               blockdata.map((upload) => {
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
});
