const ContributeArtifact = require('../artifacts/contracts/Contribute.sol/Contribute.json')
require('dotenv').config()

task("withdraw", "Send donation")
  .addParam("address", "Address to withdraw")
  .addParam("amount", "Amount of tokens to withdraw")
  .setAction(async (taskArgs) => {
    const [signer] = await hre.ethers.getSigners()
    const contributeAddr = process.env.CONTRACT_ADDRESS

    const contributeContract = new hre.ethers.Contract(
      contributeAddr,
      ContributeArtifact.abi,
      signer
    )

    const result = await contributeContract.withdraw(taskArgs.address, taskArgs.amount)
    
    console.log(result)
  });