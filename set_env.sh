#!/bin/bash
# Setting evm-lite env config

mkdir logs
cp ./patch/decodeTransaction.js ./node_modules/ethereum-tx-decoder/src/decodeTransaction.js