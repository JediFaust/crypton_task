require("@nomiclabs/hardhat-waffle");
require('solidity-coverage')
require('dotenv').config()
const ContributeArtifact = require('./artifacts/contracts/Contribute.sol/Contribute.json')

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("donate", "Send donation")
  .addParam("amount", "Amount of tokens")
  .setAction(async (taskArgs) => {
    const [signer] = await hre.ethers.getSigners()
    const contributeAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

    const contributeContract = new hre.ethers.Contract(
      contributeAddr,
      ContributeArtifact.abi,
      signer
    )

    const result = await contributeContract.donate(taskArgs.amount)
    
    console.log(result)
  });

task("withdraw", "Send donation")
  .addParam("address", "Address to withdraw")
  .addParam("amount", "Amount of tokens to withdraw")
  .setAction(async (taskArgs) => {
    const [signer] = await hre.ethers.getSigners()
    const contributeAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

    const contributeContract = new hre.ethers.Contract(
      contributeAddr,
      ContributeArtifact.abi,
      signer
    )

    const result = await contributeContract.withdraw(taskArgs.address, taskArgs.amount)
    
    console.log(result)
  });

task("donators", "Donators list", async (taskArgs, hre) => {
    const [signer] = await hre.ethers.getSigners()
    const contributeAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

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

  task("total-amount", "Amount of donator")
  .addParam("address", "Address to check total amount")
  .setAction(async (taskArgs, hre) => {
    const [signer] = await hre.ethers.getSigners()
    const contributeAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

    const contributeContract = new hre.ethers.Contract(
      contributeAddr,
      ContributeArtifact.abi,
      signer
    )

    let totalAmount = await contributeContract.getAmount(taskArgs.address)

    console.log(totalAmount)

  });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */



module.exports = {
  solidity: "0.8.4",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      // See its defaults
    },
    rinkeby: {
      url: process.env.URL,
      accounts: [process.env.API_KEY]
    }
  }
};



