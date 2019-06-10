const express = require('express')
const bodyParser = require('body-parser')
const jayson = require('jayson')
const app = express()
const env = require('./env');
const request = require('request');

var tendermintAPIHost = 'http://'+env.tendermintHost+':'+env.tendermintPort

const server = jayson.server({
  net_listening: (args, callback) => {
    // web3.eth.net.isListening
    console.log("curl http://[api_addr]/info")
    request.get(tendermintAPIHost + '/info', (err, rep) => {
      if (err) {
        console.log(err);
        callback({code: 404, message: err.code + " on tendermint node"});
      } else {
        var body = JSON.parse(rep.body);
        console.log(body);
        if (body.type === 'tendermint') {
          callback(null, true);
        } else {
          callback({code: 404, message: "tendermint node not found"})
        }
      }
    });
  },
  eth_coinbase: (args, callback) => {
    // web3.eth.getCoinbase
    console.log("curl http://[api_addr]/accounts")
    request.get(tendermintAPIHost + '/accounts', (err, rep) => {
      if (err) {
        console.log(err);
      } else {
        var body = JSON.parse(rep.body);
        console.log(body)
        callback(null, body.accounts[0].address);
      }
    });
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