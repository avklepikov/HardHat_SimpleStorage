// yarn add --dev prettier prettier-plugin-solidity
// no need to import ethers because hardhat already has it (see dependencies)
// it already knows about contact foldery and complied files
// has its own network similar to Ganache.
// you can change it within hardhat "defaultNetwork" in  config or to add network flag into run command --network hardhat

// imports
const hre = require("hardhat")

//async main
async function main() {
    const SimpleStorageFactory = await hre.ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract ...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Deployed to ${simpleStorage.address}`)
    //console.log(hre.network.config)
    if (hre.network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    // interacting with the contract
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value: ${currentValue}`)

    // Update current Value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value: ${updatedValue}`)
}

// add yarn add --dev @nomiclabs/hardhat-etherscan
// and add it to hardhat config
// also we need to sign in to etherscan and get
async function verify(contracAddress, args) {
    console.log(`Verifying ${contracAddress} .... `)
    try {
        await hre.run("verify:verify", {
            address: contracAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("already verified")
        } else {
            console.log(e)
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
