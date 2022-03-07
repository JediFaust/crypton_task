const { inputToConfig } = require("@ethereum-waffle/compiler")
const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Contribute", function() {
    let acc1
    let acc2
    let acc3
    let contribute

    beforeEach(async function() {
        [acc1, acc2, acc3] = await ethers.getSigners()
        const Contribute = await ethers.getContractFactory("Contribute")
        contribute = await Contribute.deploy()
        await contribute.deployed()
        console.log(contribute.address)
    })

    it("should be deployed", async function() {
        expect(contribute.address).to.be.properAddress;
    })

    it("should have no donators at beginning", async function() {
        let donators = await contribute.getDonators()
        console.log(donators)
    })

    it("should have 1 exact donator with amount of 0", async function() {
        await contribute.donate(0)
        let donators = await contribute.getDonators()
        let amount = await contribute.getAmount(donators[0])
        console.log(donators)
        console.log(amount)
    })

    it("should return 0 amount when address is not in donators", async function() {
        expect(await contribute.getAmount('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0')).to.eq(0)
    })

    it("should have 3 donators with amounts of 0", async function() {
        await contribute.donate(0)
        await contribute.connect(acc2).donate(0)
        await contribute.connect(acc3).donate(0)
        let donators = await contribute.getDonators()
        let amounts = []
        for (let i = 0; i < donators.length; i++) {
            amounts.push(await contribute.getAmount(donators[i]))
        }
        console.log(donators)
        console.log(amounts)
    })

    it("should revert donation when have no enough token", async function() {
        await expect(contribute.donate(100))
  .to.be.revertedWith('Not enough token provided.');
    })

    it("should revert withdraw when balance is not enough", async function() {
        await expect(contribute.withdraw('0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9', 100))
  .to.be.revertedWith('Not enough token on balance.')
    })

    it("should revert withdraw when called by non-owner", async function() {
        await expect(contribute.connect(acc2).withdraw('0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9', 0))
  .to.be.revertedWith('Permission denied.')
    })

    // I couldnt figure out how to set balance of accounts, because they have 0 at starting
    // so I just tested success withdraw and donate with amounts of 0
    // and tested other features with bigger amounts manually on Remix IDE


    
})