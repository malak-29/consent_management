const { loadFromConfig } = require('fabric-client');
const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, X509WalletMixin, Gateway } = require('fabric-network');

module.exports = function(app) {
  app.get("/register", (req, res) => {
		console.log(req.body);
		var userID = req.param("userID");
		var userType = req.param("userType");

		roles = ["doctor","patient"];
		async function main() {
			const client = loadFromConfig(__dirname + '/../config/networkConnection_multinode.yaml');
			//console.log(client);
			client.initCredentialStores()
			.then((nothing) => {
				client.setUserContext({username:'admin', password:'adminpw'})
				.then((admin) => {
					var certAuth = client.getCertificateAuthority();
					admin.setRoles(roles);
					var adminObj = admin.getRoles(roles);

					console.log(admin);
					//console.log(certAuth);
					certAuth.register({enrollmentID: userID, affiliation: 'a.department1'}, admin)
					.then((secret) => {
								console.log(secret);
								attributeRequest = [ {
									name : userID,
									type : userType,
									optional : true
								} ];
								enrollmentRequest = {
									enrollmentID : userID,
									enrollmentSecret : secret,
									profile : "tls",
									attr_reqs : attributeRequest
								};
								res.send(secret);		
								certAuth.enroll(enrollmentRequest)
								.then((enrollment)=> {
											console.log(enrollment);
											const wallet = new FileSystemWallet(__dirname +'/../config/identity/'+userID+'/wallet');
											const cert = (enrollment.certificate).toString();
											const key = (enrollment.key).toBytes();
											const identityLabel = userID+'@a.example.com';
											const identity = X509WalletMixin.createIdentity('aMSP', cert, key);
											wallet.import(identityLabel, identity);
											

									});
							});
					});
				});	
			}

		

main().then(() => {
  console.log('New user Registered.');
}).catch((e) => {

  console.log('Issue program exception.');
  console.log(e);
  console.log(e.stack);
  process.exit(-1);

});
});
}