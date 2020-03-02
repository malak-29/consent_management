'use strict';

module.exports = function(app) {
  app.post("/revoke", (req, res) => {
  	console.log(req.body);
	const fs = require('fs');
	const yaml = require('js-yaml');
	const { FileSystemWallet, Gateway } = require('fabric-network');
	//userID = req.body.userid;

	const wallet = new FileSystemWallet(__dirname +'/../config/identity/'+req.body.patID+'/wallet');
	//const wallet = new FileSystemWallet(__dirname +'/../config/identity/User1/wallet');

	async function main() {
	  // A gateway defines the peers used to access Fabric networks
	  const gateway = new Gateway();
	  // Main try/catch block
	  try {
	    // Specify userName for network access
	    // const userName = 'isabella.issuer@magnetocorp.com';
	    const userName = req.body.patID+'@a.example.com';
	    // Load connection profile; will be used to locate a gateway
	    //let connectionProfile = yaml.safeLoad(fs.readFileSync('./networkConnection_multinode.yaml', 'utf8'));
	    let connectionProfile = yaml.safeLoad(fs.readFileSync(__dirname + '/../config/networkConnection_multinode.yaml', 'utf8'));

	    // Set connection options; identity and wallet
	    let connectionOptions = {
	      identity: userName,
	      wallet: wallet,
	      discovery: { enabled:false, asLocalhost: true }
	    };

	    // Connect to gateway using application specified parameters
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
			
			const channel = await network.getChannel();
			const requestTxn = contract.createTransaction('revoke');
			var txnID = requestTxn.getTransactionID();

	    // issue commercial paper
	    console.log('Submit response transaction.');
			console.log(txnID);
			console.log(txnID._transaction_id);

			const issueResponse = await requestTxn.submit(req.body.reqID);	    
			const queryTxn = await	channel.queryBlockByTxID(txnID._transaction_id);
			console.log(queryTxn);

			const channelQuery = await channel.queryInfo();
			console.log(channelQuery.height.low);

			const respObject = {
				transactionID : txnID._transaction_id,
				blockNumber : queryTxn.header.number,
				prevHash : queryTxn.header.previous_hash,
				dataHash : queryTxn.header.data_hash
			};

	    // process response
	    console.log('Process issue transaction response.');
			console.log('Transaction complete.');
			
			console.log(respObject);
			res.send(respObject);


	  } catch (error) {

	    console.log(`Error processing transaction. ${error}`);
			console.log(error.stack);
			
	  } finally {

	    // Disconnect from the gateway
	    console.log('Disconnect from Fabric gateway.')
	    gateway.disconnect();

	  }
	}
	main().then(() => {

	  console.log('Issue program complete.');

	}).catch((e) => {
	  res.send("Issue program exception.");
	  console.log('Issue program exception.');
	  console.log(e);
	  console.log(e.stack);
	  process.exit(-1);

		});
	});
};
