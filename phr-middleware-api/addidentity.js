/*
 *  SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const path = require('path');

const fixtures = path.resolve(__dirname, '/home/philips/fabric/Multinode-al/fabric-starter-a/artifacts/crypto-config/peerOrganizations/a.example.com/users/User1@a.example.com/msp');

// A wallet stores a collection of identities
const wallet = new FileSystemWallet('./config/identity/User1/wallet');

async function main() {

    // Main try/catch block
    try {

        // Identity to credentials to be stored in the wallet
        const credPath = path.join(fixtures, '/');
        const cert = fs.readFileSync(path.join(credPath, '/signcerts/User1@a.example.com-cert.pem')).toString();
        const key = fs.readFileSync(path.join(credPath, '/keystore/ef864edaad59b096b974687bfa6754e6d7b70895edede2d8baaaadb8c656aeed_sk')).toString();

        // Load credentials into wallet
        const identityLabel = 'User1@a.example.com';
        const identity = X509WalletMixin.createIdentity('aMSP', cert, key);

        await wallet.import(identityLabel, identity);

    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
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
