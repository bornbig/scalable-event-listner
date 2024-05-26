const {Web3} = require("web3");
const fs = require('fs');

const saveEventToFile = async (contract, data) => {

    const random = Math.floor(Math.random() * 1000);

    fs.writeFileSync(`./events/${contract}-${random}-${Date.now()}.txt`, JSON.stringify(data, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ))
}


class Web3EventListener{
    i = null;
    transferABI = [
        // Only the Transfer event ABI is needed
        {
            "anonymous": false,
            "inputs": [
                { "indexed": true, "name": "from", "type": "address" },
                { "indexed": true, "name": "to", "type": "address" },
                { "indexed": false, "name": "value", "type": "uint256" }
            ],
            "name": "Transfer",
            "type": "event"
        }
    ];

    constructor(contract){
        this.contract = contract;
        this.web3 = new Web3('wss://polygon-mainnet.g.alchemy.com/v2/ip-A-N0sVOSyjzTrDSODvODdTAzBvK-4');

        this.checkActive();
        setInterval(() => this.checkActive(this.i), 1000 * 60 * 2) // refresh connection for better reliablity
    }

    async start(){
        const that = this;
        const contractInstance = new this.web3.eth.Contract(this.transferABI, this.contract);

        this.i = contractInstance.events.Transfer(
            function(error, event){
                if(error){
                    console.log("restarted events", e);
                    that.start();
                }
            }
        ).on("data", function(event){

            const data = {
                fromAddress: event.returnValues['0'],
                toAddress: event.returnValues['1'],
                tokenId: event.returnValues['2'],
                contract: that.contract,
            }

            saveEventToFile(that.contract, data);
            console.log(event);
        })
    }

    checkActive(i){
        if(i){
            i.unsubscribe();
            console.log("Unsubscribed")
        }
        this.start();
        console.log("Started Event listner")
    }

}


new Web3EventListener('0xc2132d05d31c914a87c6611c10748aeb04b58e8f')