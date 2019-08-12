# prerequisite
1. run the evm-lite tendermint  
`https://github.com/bear987978897/evm-lite`
2. set the config in env.js if your environment is different, or you don't have to change
3. npm install the dependency package  
`npm install`
4. overwrite the patch file
```
cp ./patch/decodeTransaction.js ./node_modules/ethereum-tx-decoder/src/decodeTransaction.js
```
# web3ToEVMLite
tendermint host is on localhost:8080 by default

# run the rpc server
```
node server.js
```  
# how to use
check the test.js as the web3.js template