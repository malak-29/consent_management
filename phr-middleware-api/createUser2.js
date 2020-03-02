const fs = require('fs');
const yaml = require('js-yaml');
const{Client} = require('fabric-client');
const { FileSystemWallet, Gateway } = require('fabric-network');
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
    console.log(registrar);

    const fabCAService = certAuth.getFabricCAServices();
    
    keyValueAttribute = {
        name:"User2",
        value:"john",
        ecert:true
    };

    req = {
        enrollmentID:"User2",
        enrollmentSecret:"user2pw",
        profile: "tls",
        maxEnrollments:10,
        attrs:keyValueAttribute
    };

    await client.getUserContext().then(function (user){
	return user
    }).then(function(user){
	const key = fabCAService.enroll(req)
	return key
    }).then(function (key){
	console.log(key);	
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
