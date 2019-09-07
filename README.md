# web3 to evmlite dockerize
### Dockerize provider

[Notice] Please run [evm_tendermint_node](https://github.com/BrianPHChen/evm_tendermint_node "evm_tendermint_node") first.

#### Build image
`$ docker build -t web3_to_evmlite .`

#### Run container
`$ docker run -tid --name provider -p 8545:8545 --link node web3_to_evmlite`

#### Check the node status
attach the container  
`$ docker exec -ti provider bash`  
check the logs (in container)  
`root@<container>:# tail -f logs/provider.log`  
#### How to use
check the test.js as the web3.js template