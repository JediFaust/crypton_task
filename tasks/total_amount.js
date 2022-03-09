const ContributeArtifact = require('../artifacts/contracts/Contribute.sol/Contribute.json')
require('dotenv').config()

task("total-amount", "Amount of donator")
  .addParam("address", "Address to check total amount")
  .setAction(async (taskArgs, hre) => {
    const [signer] = await hre.ethers.getSigners()
    const contributeAddr = process.env.CONTRACT_ADDRESS

    const contributeContract = new hre.ethers.Contract(
      contributeAddr,
      ContributeArtifact.abi,
      signer
    )

    let totalAmount = await contributeContract.getAmount(taskArgs.address)

    console.log(totalAmount)

  });