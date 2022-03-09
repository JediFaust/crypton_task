const { inputToConfig } = require("@ethereum-waffle/compiler")
const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Contribute", function() {
    let signer
    let acc1
    let acc2
    let contribute

    beforeEach(async function() {
        [signer, acc1, acc2] = await ethers.getSigners()
        const Contribute = await ethers.getContractFactory("Contribute", signer)
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
        let donation = 50
        await contribute.donate(donation, { value: donation })
        let donators = await contribute.getDonators()
        expect(await contribute.getAmount(donators[0])).to.eq(donation)
    })

    it("should return 0 amount when address is not in donators", async function() {
        expect(await contribute.getAmount(acc2.address)).to.eq(0)
    })

    it("should have 3 donators with amounts of 50", async function() {
        let donation = 50
        await contribute.donate(donation, { value: donation })
        await contribute.connect(acc1).donate(donation, { value: donation })
        await contribute.connect(acc2).donate(donation, { value: donation })
        let donators = await contribute.getDonators()

        for (let i = 0; i < donators.length; i++) {
            let amount = await contribute.getAmount(donators[i])
            expect(amount).to.eq(donation) // Checking every amount
        }
        expect(donators.length).to.eq(3)
    })

    it("should add unique donator to the list", async function() {
        let donation = 50
        await contribute.donate(donation, { value: donation })
        let donators = await contribute.getDonators()

        expect(donators.length).to.eq(1)

        await contribute.connect(acc1).donate(donation, { value: donation })
        donators = await contribute.getDonators()

        expect(donators.length).to.eq(2)
    })

    it("should not add non-unique donator to the address and just increment total amount by 50", async function() {
        let donation = 50
        await contribute.connect(acc1).donate(donation, { value: donation })
        let donators = await contribute.getDonators()

        expect(donators.length).to.eq(1)
        expect(await contribute.getAmount(acc1.address)).to.eq(donation)


        await contribute.connect(acc1).donate(donation, { value: donation })
        donators = await contribute.getDonators()
        
        expect(donators.length).to.eq(1)
        expect(await contribute.getAmount(acc1.address)).to.eq(donation * 2)
    })

    it("should revert donation when have no enough token", async function() {
        await expect(contribute.donate(100), { value: 50 })
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

    it("should change balance when withdraw", async function() {
        let amount = 10
        await contribute.connect(acc1).donate(50, { value: 50 })
        let tx = await contribute.withdraw(acc2.address, amount)
        await expect(() => tx)
            .to.changeEtherBalances([contribute, acc2], [-amount, amount])

        await tx.wait()
    })

    
})