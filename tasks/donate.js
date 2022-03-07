const hre = require("hardhat");
const ethers = hre.ethers


task("donate", "Send donation")
  .addParam("amount", "Amount of tokens")
  .setAction(async (taskArgs) => {
    const ContributeArtifact = require('../artifacts/contracts/Contribute.json')
    const [signer] = await ethers.getSigners()
    const contributeAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

    const contributeContract = new ethers.Contract(
      contributeAddr,
      ContributeArtifact.abi,
      signer
    )

    const result = await contributeContract.donate(taskArgs.amount)
    
    console.log(result)
  });

module.exports = {};
