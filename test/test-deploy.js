const hre = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    // Making 2 variables visible at level available for 'it'
    let simpleStorageFactory
    let simpleStorage

    beforeEach(async function () {
        simpleStorageFactory = await hre.ethers.getContractFactory(
            "SimpleStorage"
        )
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of zero", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"

        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update when we call store", async function () {
        const transactionResponse = await simpleStorage.store(7)
        await transactionResponse.wait(1)
        const updatedValue = await simpleStorage.retrieve()
        const expectedValue = "7"
        assert.equal(updatedValue.toString(), expectedValue)
    })
})
