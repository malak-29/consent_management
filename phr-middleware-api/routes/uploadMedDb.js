'use strict';
const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const mysql = require('mysql');
var crypto = require('crypto');

module.exports = function(app) {    
    var MedHash
    app.post("/uploadMed", (req, res) => {
         console.log('dbconnect');
         const MedID = '';
         const connection = mysql.createConnection({
             host     : '130.147.175.221',
             user     : 'root',
             password : '#welcome123',
             database : 'phrdemo'
         });
         connection.connect();
         console.log(req.body);

         const insertfunc = () =>{
            connection.query("INSERT INTO Medication (PatientID, MedName, Dosage, Frequency) VALUES ('"+ req.body.patID +"','"+ req.body.med +"','"+  req.body.dos +"','"+ req.body.freq+"');", function(err) {
                if (!err) {
                console.log("Successful Upload");
                } else {
                    console.log(err);
                }        
                });
        }

        const createHash = () => {
            connection.query("SELECT * FROM Medication WHERE PatientID = '"+ req.body.patID +"';", function(err, rows) {
                if (!err) {
                    console.log(rows);
                    const result = rows.toString();
                    var hash = crypto.createHash('sha256').update(result).digest('hex');
                    console.log(hash);            
                    MedHash = hash.toString();    
                    console.log(MedHash);            

                } else {
                    console.log('Error while performing Query.');
                }        
            });
        }

        const storeHash = (callback) => {
            setTimeout(async () =>{
                const gateway = new Gateway();
                //userID = req.body.userid;

                const wallet = new FileSystemWallet(__dirname +'/../config/identity/'+req.body.patID+'/wallet');
                try {
                    const userName = req.body.patID+'@a.example.com';
                    let connectionProfile = yaml.safeLoad(fs.readFileSync(__dirname + '/../config/networkConnection_multinode.yaml', 'utf8'));
                    let connectionOptions = {
                        identity: userName,
                        wallet: wallet,
                        discovery: { enabled:false, asLocalhost: true }
                    };
                    console.log('Connect to Fabric gateway.');
                    await gateway.connect(connectionProfile, connectionOptions);
                    // Access PaperNet network
                    console.log('Use network channel: mychannel.');    
                    const network = await gateway.getNetwork('common');    
                    // Get addressability to commercial paper contract
                    console.log('Use org.papernet.commercialpaper smart contract.');    
                    const contract = await network.getContract('reference');    
                    // issue commercial paper
                    console.log('Submit commercial paper issue transaction.');    
                    const issueResponse = await contract.submitTransaction('upload', req.body.patID,'Medication', MedHash);    
                    // process response
                    console.log('Process issue transaction response.');    
                    console.log('Transaction complete.');
                } catch (error) {

                    console.log(`Error processing transaction. ${error}`);
                    console.log(error.stack);
    
                } finally {
                    callback();
                    // Disconnect from the gateway
                    console.log('Disconnect from Fabric gateway.')
                    gateway.disconnect(); 
                }                  
                console.log('Issue program complete.');                
                callback();          
            },1000);
        }
       
        Promise
            .resolve()
            .then(()=>{
                insertfunc();
                return Promise.resolve();
            })
            .then(()=>{
                createHash();
                return Promise.resolve();
            })
            .then(()=>{
                storeHash(()=>{
                    Promise.resolve();
                });
            })
            .catch((error)=>{
                console.log(error);                
            });        
        res.send("Issue program complete.");
    });
}