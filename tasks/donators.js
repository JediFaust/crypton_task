const ContributeArtifact = require('../artifacts/contracts/Contribute.sol/Contribute.json')
require('dotenv').config()

task("donators", "Donators list", async (taskArgs, hre) => {
    const [signer] = await hre.ethers.getSigners()
    const contributeAddr = process.env.CONTRACT_ADDRESS

    const contributeContract = new hre.ethers.Contract(
      contributeAddr,
      ContributeArtifact.abi,
      signer
    )

    let donators = await contributeContract.getDonators()

    for (const donator of donators) {
      console.log(donator)
    }

  });