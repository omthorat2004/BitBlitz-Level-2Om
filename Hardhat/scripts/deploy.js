// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");



async function main() {
  // Setup accounts
  const accounts = await hre.ethers.getSigners()
  const VoterContract = await hre.ethers.getContractFactory('Voter')
  const voterContract = await VoterContract.deploy()
  await voterContract.waitForDeployment()
  const voterAddress = await voterContract.getAddress()
  console.log(voterAddress)

  const ElectionContract = await hre.ethers.getContractFactory('ElectionContract',accounts[0])
  const electionContract = await ElectionContract.deploy()
  await electionContract.waitForDeployment()
  const electionAddress = await electionContract.getAddress()
  console.log(electionAddress)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});