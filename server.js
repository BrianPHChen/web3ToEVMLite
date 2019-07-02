const express = require('express')
const bodyParser = require('body-parser')
const jayson = require('jayson')
const app = express()
const env = require('./env');
const request = require('request');
const moment = require('moment');
const EthereumTx = require('ethereumjs-tx')
var txDecoder = require('ethereum-tx-decoder');

var evmliteAPI = 'http://' + env.apiHost + ':' + env.evmlitePort;
var tendermintAPI = 'http://' + env.apiHost + ':' + env.tendermintPort;

const server = jayson.server({
  net_listening: (args, callback) => {
    // web3.eth.net.isListening
    console.log("Get /isListening");
    request.get(evmliteAPI + '/info', (err, rep) => {
      if (err) {
        console.log(err);
        callback({code: 404, message: err.code + " on tendermint node"});
      } else {
        var body = JSON.parse(rep.body);
        //console.log(body);
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
    console.log("GET /getCoinbase");
    request.get(evmliteAPI + '/accounts', (err, rep) => {
      if (err) {
        console.log(err);
      } else {
        var body = JSON.parse(rep.body);
        var coinbase = body.accounts[0].address
        callback(null, coinbase);
      }
    });
  },
  eth_blockNumber: (args, callback) => {
    // web3.eth.getBlockNumber
    console.log("GET /getBlockNumber");
    request.get(tendermintAPI + '/block', (err, rep) => {
      if (err) {
        console.log(err);
      } else {
        var body = JSON.parse(rep.body);
        var height = body.result.block.header.height;
        //console.log(height);
        callback(null, height);
      }
    });
  },
  eth_getBlockByNumber: (args, callback) => {
    // web3.eth.getBlock
    console.log("POST /getBlock");
    console.log("block: " + args[0]);
    var height = parseInt(args[0]);
    request.get(tendermintAPI + '/block?height=' + height, (err, rep) => {
      if (err) {
        console.log(err);
      } else {
        var body = JSON.parse(rep.body);
        var tendermintblock = body.result.block;
        var timestamp = moment(tendermintblock.header.time).unix();
        var txs = [];
        for (let val of tendermintblock.data.txs) {
          let buffer = Buffer.from(val, 'base64');
          let rawtx = '0x' + buffer.toString('hex');
          let decodedTx = txDecoder.decodeTx(rawtx);
          let ethereumTx = new EthereumTx(decodedTx);
          let txHash = ethereumTx.hash();
          txs.push('0x' + txHash.toString('hex'));
        }
        var returnBlock = {
          "number": Number(height).toString(16),
          "timestamp": timestamp.toString(16),
          "transactions": txs,
        }
        callback(null, returnBlock);
      }
    });
  },
  eth_sendRawTransaction: (args, callback) => {
    callback(null, true);
    console.log("web3.eth.sendSignedTransaction");    
  },
  eth_getTransactionCount: (args, callback) => {
    // web3.eth.getTransactionCount
    console.log("POST /getTransactionCount");
    console.log("address: " + args[0]);
    request.get(evmliteAPI + '/account/' + args[0], (err, rep) => {
      if (err) {
        console.log(err);
      } else {
        var body = JSON.parse(rep.body);
        callback(null, body.nonce);
      }
    });
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
  console.log('tendermint node is listening on port ' + env.tendermintPort);
  console.log('EVM_lite is listening on port '+ env.evmlitePort)
  console.log('RPC server is listening on port 8545');
});