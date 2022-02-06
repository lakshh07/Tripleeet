// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Tripleeet = await hre.ethers.getContractFactory("Tripleeet");
  const tripleeet = await Tripleeet.deploy();

  await tripleeet.deployed();

  console.log("Tripleeet deployed to:", tripleeet.address);

  const TripleeetNft = await hre.ethers.getContractFactory("TripleeetNFT");
  const tripleeetNft = await TripleeetNft.deploy();

  await tripleeetNft.deployed();

  console.log("TripleeetNft deployed to:", tripleeetNft.address);

  const contract_address = JSON.stringify({
    TripleeetAddress: tripleeet.address,
    TripleeetNftAddress: tripleeetNft.address,
  });

  fs.writeFileSync(`${__dirname}/../contract_address.json`, contract_address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
