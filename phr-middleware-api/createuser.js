const fs = require('fs');
const yaml = require('js-yaml');
const{Client} = require('fabric-client');
const { FileSystemWallet, Gateway, Global } = require('fabric-network');
const wallet = new FileSystemWallet(__dirname +'/config/identity/Admin/wallet');

async function main() {

    const gateway = new Gateway();
    // Main try/catch block
    try {
    const userName = 'Admin@a.example.com';
    let connectionProfile = yaml.safeLoad(fs.readFileSync(__dirname + '/config/networkConnection_multinode.yaml', 'utf8'));	
    let connectionOptions = {
        identity: userName,
        wallet: wallet,
        discovery: { enabled:false, asLocalhost: true }
      };
    await gateway.connect(connectionProfile, connectionOptions);

    const client = gateway.getClient(); 
    
    const certAuth = client.getCertificateAuthority('ca.a.example.com');    

    const registrar = certAuth.getRegistrar();
    const fabCAService = certAuth.getFabricCAServices();

    const crypto = client.getCryptoSuite();
    
    const admin = gateway.getCurrentIdentity();
	admin.setRoles(["user"]);
	console.log(admin.getRoles());
	console.log(admin.getIdentity());
    const HFREGISTRARATTRIBUTES = '*';
    const HFREGISTRARROLES = ["doctor","patient"];
    const KeyValueAttribute =[ {
        key : "",
        value: "",
        ecert: true
    }]

    const RegisterRequest = {
        enrollmentID : "admin",
	enrollmentSecret : "adminpw",
        role : "user",
        affiliation: "",
        maxEnrollments: 10,
        attrs : KeyValueAttribute
    }
    await fabCAService.register(RegisterRequest, admin).then (res =>{
       console.log(res);
/*	var key = res.key;
	const pubKey = key.getPublicKey();
 	const ski = key.getSKI();
	const keybytes = key.toBytes();
	console.log(keybytes);
     fs.writeFile(__dirname + '/config/keys/certificate', res.certificate, function(err) {
    if(err) {
        return console.log(err);
    }
    });
     fs.writeFile(__dirname + '/config/keys/'+ski+'_sk', keybytes, function(err) {
    if(err) {
        return console.log(err);
    }
    });
	
    console.log("The file was saved!"); */
}); 
    
    } catch (error) {
        console.log(`Error  ${error}`);
        console.log(error.stack);
    }
}

main().then(() => {
    console.log('done');
}).catch((e) => {
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});
