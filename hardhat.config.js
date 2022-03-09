require("@nomiclabs/hardhat-waffle");
require('solidity-coverage')
require('dotenv').config()
require('./tasks/donate.js')
require('./tasks/withdraw.js')
require('./tasks/total_amount.js')
require('./tasks/donators.js')

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
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
      chainId: 1337
    },
    rinkeby: {
      url: process.env.URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};



