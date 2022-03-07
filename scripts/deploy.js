const hre = require("hardhat");
const ethers = hre.ethers

async function main() {

  const [signer] = await ethers.getSigners()

  const Contribute = await hre.ethers.getContractFactory("Contribute", signer);
  const contribute = await Contribute.deploy();

  await contribute.deployed();

  console.log("Contribute deployed to:", contribute.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
