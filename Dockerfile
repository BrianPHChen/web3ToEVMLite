FROM node:10.16

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app
RUN cp ./patch/decodeTransaction.js ./node_modules/ethereum-tx-decoder/src/decodeTransaction.js
EXPOSE 8545
CMD ["node", "server.js"]