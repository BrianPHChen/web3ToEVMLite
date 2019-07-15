const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const EthereumTx = require('ethereumjs-tx')

// web3.eth.net.isListening().then(console.log);

// web3.eth.getCoinbase().then(console.log);

// web3.eth.getBlockNumber().then(console.log);

// web3.eth.getBlock(2).then(console.log);

// console.log(web3.utils.toHex('123'));

//web3.eth.getTransactionCount('0x5cb76ec4578210b90d913536ac21b2222e10693a').then(console.log);

const privateKey = Buffer.from('63476fa2fbe7d6673be84bec3d66a1b0f70b3376660b6133da3652767dcb9b91', 'hex');
var tx = new EthereumTx({
    nonce: '0x04',
    gasPrice: '0x', 
    gasLimit: '0x5208', // 21000
    to: '0x524a413be563aa95f45af16b226b9592389ffbb8', 
    value: '0x0f', 
    data: '0x',
});
tx.sign(privateKey);

web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), (err, result) => {
  if(err){
    console.log(err);
  } else {
    console.log(result);
  }
});
