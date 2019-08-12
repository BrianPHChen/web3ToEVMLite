const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const EthereumTx = require('ethereumjs-tx')

// web3.eth.net.isListening().then(console.log);

// web3.eth.getCoinbase().then(console.log);

// web3.eth.getBlockNumber().then(console.log);

// web3.eth.getBlock(2).then(console.log);

// console.log(web3.utils.toHex('123'));

//web3.eth.getGasPrice().then(console.log);

// web3.eth.sendTransaction({from: "524a413be563aa95f45af16b226b9592389ffbb8", to: "5cb76ec4578210b90d913536ac21b2222e10693a", value: 100}, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

//web3.eth.getTransactionCount('0x5cb76ec4578210b90d913536ac21b2222e10693a').then(console.log);

// const privateKey = Buffer.from('63476fa2fbe7d6673be84bec3d66a1b0f70b3376660b6133da3652767dcb9b91', 'hex');
// var tx = new EthereumTx({
//     nonce: '0x04',
//     gasPrice: '0x', 
//     gasLimit: '0x5208', // 21000
//     to: '0x524a413be563aa95f45af16b226b9592389ffbb8', 
//     value: '0x0f', 
//     data: '0x',
// });
// tx.sign(privateKey);

// web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), (err, result) => {
//   if(err){
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

// web3.eth.getTransactionReceipt("0xe5f05b1870986e06264f9cabd273d2b3da8e95482103e2cfe53af1b5256d98b7", (err, result) => {
//   if(err){
//     console.log(err);
//   } else {
//     console.log(result);
//   }  
// });

// var testContract = web3.eth.Contract([{"constant":true,"inputs":[],"name":"a","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_a","type":"uint256"}],"name":"setA","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]);
// testContract.deploy({
//      data: '0x608060405234801561001057600080fd5b5060e38061001f6000396000f3fe6080604052600436106043576000357c0100000000000000000000000000000000000000000000000000000000900480630dbe671f146048578063ee919d50146070575b600080fd5b348015605357600080fd5b50605a60a7565b6040518082815260200191505060405180910390f35b348015607b57600080fd5b5060a560048036036020811015609057600080fd5b810190808035906020019092919050505060ad565b005b60005481565b806000819055505056fea165627a7a72305820e526c85d4c95c88daeb91b4aa41b74a0201ff6f5ed64d22bfd390479404341f00029', 
// }).send({
//   from: '0x524a413be563aa95f45af16b226b9592389ffbb8',
//   gas: '4700000',
//   gasPrice: '0'
// }, (err, tx) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(tx);
//     tx = JSON.parse(tx);
//     let txHash = tx.txHash;
//     web3.eth.getTransactionReceipt(txHash, (err, result) => {
//       if(err){
//         console.log(err);
//       } else {
//         console.log("address: " + result.contractAddress);
//       }  
//     });
//   }
// });

// var testContract = web3.eth.Contract([{"constant":true,"inputs":[],"name":"a","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_a","type":"uint256"}],"name":"setA","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}], "0x1d20D221C1407578293B12bD5b12E85122b3Eda7");
// testContract.methods.a().call({from: '0x524a413be563aa95f45af16b226b9592389ffbb8'},(err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("a: " + result);
//   }
// });

// console.log(testContract.methods.a().encodeABI());

// console.log(web3.eth.accounts.create());

// testContract.methods.setA(0).send({from: '0x524a413be563aa95f45af16b226b9592389ffbb8'}, (err, txHash) => {
//   if (err) {
//     console.log("err: " + err);
//   } else {
//     console.log("call method setA");
//     console.log(txHash);
//   }
// });