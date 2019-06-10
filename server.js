const express = require('express')
const bodyParser = require('body-parser')
const jayson = require('jayson')
const app = express()
const env = require('./env');

const server = jayson.server({
  net_listening: (args, callback) => {
    callback(null, true);
    console.log("web3.eth.net.isListening");
  },
  eth_coinbase: (args, callback) => {
    callback(null, true);
    console.log("web3.eth.getCoinbase");    
  },
  eth_blockNumber: (args, callback) => {
    callback(null, true);
    console.log("web3.eth.getBlockNumber");    
  },
  eth_getBlockByNumber: (args, callback) => {
    callback(null, true);
    console.log("web3.eth.getBlock");    
  },
  eth_sendRawTransaction: (args, callback) => {
    callback(null, true);
    console.log("web3.eth.sendSignedTransaction");    
  },
  }
  // , {
  //   router: (method, params) => {
  //     console.log(method)
  //   }
  // }
);
  
// parse request body before the jayson middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(server.middleware());

app.listen(8545, () => {
  console.log('tendermint node is listening on http://' + env.tendermintHost + ":" + env.tendermintPort);
  console.log('RPC server is listening on port 8545');
});