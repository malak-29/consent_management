import React from "react";
import Modal from 'react-responsive-modal';
import {eye} from 'react-icons-kit/feather/eye';
import {fileText} from 'react-icons-kit/feather/fileText'
import { ButtonToolbar } from 'reactstrap';
import ProfileBar from "./layouts/ProfileBar";
import ProviderNav from "./layouts/ProviderNav";
import { Icon } from 'react-icons-kit';

var param=null;
var param2=null;
var username="PRO1";
var requests = [];
var consentdata;

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

function brushingChange(){
  let requestData = requests;
  console.log(requestData);
  
  if(requests.length >0){
    for(var i in requestData){
      if(requestData[i].record.Category == "Lifestyle"){
        requestData[i].record.Category ="Brushing";
      }
    }
    requests=requestData;
  }      
}

export default (class ProviderPermissions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open:false,
      result:null,
      patientID:null,
      category:null,
      categoryID:null,
      patdata:null,
      datahash:null,
      open2:false
    };
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onOpenModal2 = this.onOpenModal2.bind(this);
    this.onCloseModal2 = this.onCloseModal2.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.viewData = this.viewData.bind(this);
    this.checkResult = this.checkResult.bind(this);
    this.getpatdata = this.getpatdata.bind(this);
    this.checkData = this.checkData.bind(this);
    this.putModal = this.putModal.bind(this);
    this.putModal2 = this.putModal2.bind(this);
    this.putblockdata = this.putblockdata.bind(this);
    this.viewconsent = this.viewconsent.bind(this);
  }

  viewconsent(){
    this.onOpenModal2();
  }

  putblockdata(){
    fetch('http://130.147.175.221:8099/chaindashboard?'+`${param2}`,{
     method: 'get'
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

  onOpenModal2() {
    this.setState({open2:true});
  }

  onCloseModal2() {
    this.setState({open2:false});
  }

  

  componentWillMount(){
    blockdata.length=0;
    requests.length=0;

        param="proID="+username;
        param2="patID="+username;      

      fetch('http://130.147.175.221:8099/queryproreq?'+`${param}`,{
       method: 'get'
     }).then(res =>{if (res.status>=200 && res.status<300) {
      return res.json();
    }
   else {
     console.log('sometihng went wrong');
        }
      }).then(function (json){
        for (var i in json){
        console.log(json[i].Key);
        console.log(json[i].Record);
        let req={
          reqID:json[i].Key,
          record:json[i].Record
        }
        requests.push(req);
        }
        console.log(requests);
        brushingChange();
        console.log(requests);
      });
    
    this.putblockdata();
}


    viewData(Req, PatientID, Category,CategoryID){
      var response = '' ;
      var reqparam='reqID='+Req;
      console.log("hello1");
      console.log('The ViewData button was clicked. ');
       fetch('http://130.147.175.221:8099/proview?'+`${reqparam}`+'&'+`${param}`,{
         method: 'get',
         headers: {'Access-Control-Allow-Origin':'*'}
       }).then(res =>{if (res.status>=200 && res.status<300) {
         console.log("hello12");
        this.checkResult(res.json(),PatientID, Category,CategoryID);
      }
     else {
       console.log('sometihng went wrong');
          }
        });

  }

  checkResult(res,PatientID, Category,CategoryID){
    res.then(data =>{
      let temp=Category;
      console.log("hello123");
      console.log(data)
      if(Category=="Brushing"){
        temp="Lifestyle";
      }
      this.setState({
        result:data.result,
        patientID:PatientID,
        category:temp,
        categoryID:CategoryID
      })
      if(this.state.result !== "false"){
          console.log("hello1234");
       this.getpatdata();
       console.log(this.state)
     } else{
       console.log("Request not accepted")
     }
    });

  }
  getpatdata(){
      console.log("hello12345");
      var patIDparam = 'patID='+this.state.patientID;
      var catparam = 'category='+this.state.category;
      var catIDparam = 'categoryID='+this.state.categoryID;
      fetch('http://130.147.175.221:8099/queryproview?'+`${patIDparam}`+'&'+`${catparam}`+'&'+`${catIDparam}`,{
             method: 'get',
             headers: {'Access-Control-Allow-Origin':'*'}
           }).then(res =>{if (res.status>=200 && res.status<300) {
                console.log("hello123456");
                console.log(res);
                this.checkData(res.json());
              }
            else {
                console.log('sometihng went wrong');
            }
          });
  }

  checkData(res){
    console.log("hello1234567");
    res.then(data =>{
      this.setState({patdata:data});
      console.log(this.state.patdata.hash);
      if(this.state.patdata.hash === this.state.result ){
        console.log("hello12345678");
        this.onOpenModal();
    } else {
      var response = {
        message:"Data instance has changed"
      };
      this.setState({patdata:response});
      console.log(this.state)
      console.log("Data instance has changed")
    }

    });

  }

  putModal2(){
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

  putModal (){
        if(this.state.open===true){
          var data = JSON.stringify(this.state.patdata.data);
          var data2= this.state.patdata.data;
          var data3=[];
          if(data2[0].LifeID){
            console.log("yesss");
            for(var i in data2){
              let temp ={
                LifeID:data2[i].LifeID,
                PatientID:data2[i].PatientID,
                Time:data2[i].Steps,
                Coverage:data2[i].Sleep,
                Pressure:data2[i].Calories
              }
              data3.push(temp);
            }
            data=JSON.stringify(data3);
          }
          console.log(data);
            if(data.LifeID)
            {
              console.log("LIfestyle exists");
            }
          return(
            <div>
            <h3>PatientID: {this.state.patientID}</h3>
              {
                data
              }
            </div>
          );
        }
        else
          return (<div></div>)
      }


  render() {
    console.log("hurray")
    const TableRow1 = ({ Req, PatientID, Category, CategoryID, Status}) => {
        return (
          <tr>
            <td>{Req}</td>
            <td>{PatientID}</td>
            <td>{Category}</td>
            <td>{CategoryID}</td>
            <td>{Status}</td>
            <td>
            <ButtonToolbar>
              <button type="button" onClick={()=>{this.viewconsent();}} className="btn" style ={{backgroundColor: '#116ea8',color:'#fff'}}><Icon size={'18'} icon={fileText}/></button>
            </ButtonToolbar>
            </td>
            <td>
            <ButtonToolbar>
              <button type="button" onClick={()=>{this.viewData(Req, PatientID, Category,CategoryID);}} className="btn" style ={{backgroundColor: '#116ea8',color:'#fff'}}><Icon size={'18'} icon={eye}/></button>
            </ButtonToolbar>
            </td>
          </tr>
        );
      }

      const TableRow2 = ({ Req, PatientID, Category, CategoryID, Status}) => {
          return (
            <tr>
              <td>{Req}</td>
              <td>{PatientID}</td>
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

    console.log("featured");

    return (
    <div>
    <div>
        <ProfileBar />
        <ProviderNav />
    </div>
    <div>
        <div className="container">
      <div className="card card-lg">
        <div className ="card card-primary">
              <div className ="card-heading">
                <b>Requested Patients Status</b>
              </div>
              <div className ="card-body">
                <div className ="table-hover">
                  <table className ="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">PatientID</th>
                        <th scope="col">Category</th>
                        <th scope="col">CategoryID</th>
                        <th scope="col">Status</th>
                        <th scope="col">Consent</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                          requests.map((request) => {
                            if(request.record.Status === "accepted"){
                              return (
                                  <TableRow1
                                    key={request.reqID}
                                    Req={request.reqID}
                                    PatientID={request.record.PatientID}
                                    Category={request.record.Category}
                                    CategoryID={request.record.CategoryID}
                                    Status={request.record.Status}
                                  />);
                                }
                            else {
                              return(
                              <TableRow2
                                key={request.reqID}
                                Req={request.reqID}
                                PatientID={request.record.PatientID}
                                Category={request.record.Category}
                                CategoryID={request.record.CategoryID}
                                Status={request.record.Status}
                              />);
                            }

                          })
                    }
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
      </div>
        <Modal open = {this.state.open} onClose={(e)=>{this.onCloseModal(e)}} center>
                    <div style={{width: "700px", height:"300px"}}>
                      <h1> Patient Data </h1>
                      <hr />
                      {
                        this.putModal()
                      }
                    </div>
        </Modal>
        <Modal open = {this.state.open2} onClose={(e)=>{this.onCloseModal2(e)}} center>
                    <div style={{width: "700px", height:"300px"}}>
                      <h1> consent Data </h1>
                      <hr />
                      {
                        this.putModal2()
                      }
                    </div>
        </Modal>
        <div className ="col-12">
<div className ="row-1">
    <div className ="card-heading"> BLOCKS</div>
       <div className ="card card-primary">
      <div className ="card-body">
       <div className ="table-hover">
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