// yarn add --dev dotenv
// https://chainlist.org to use to find chaid ID  or directly on the chain web site
// yarn add --dev solidity-coverage
// yarn hardhat coverage

require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")

const GOERLY_RPC_URL = process.env.GOERLY_RPC_URL || "" // || means OR. In other words if GOERLY_RPC_URL does not exist to use ""
const GOERLY_PRIVATE_KEY = process.env.GOERLY_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    solidity: "0.8.8",
    networks: {
        goerly: {
            url: GOERLY_RPC_URL,
            accounts: [GOERLY_PRIVATE_KEY],
            chainId: 5,
        },
        // hardhat evm resets after each execution
        // but we can run hardhat localhost node in a terminal which resets only with the terminal:
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
            // accounts are not needed, they are provided automatically
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    // we need to install gas reporter from npm: yarn add hardhat-gas-reporter --dev
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKET_API_KEY, // coinmarketcap.com/api
        token: "MATIC",
    },
}
