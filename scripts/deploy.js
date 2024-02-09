const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  //Setup accounts & variables
  const [deployer] = await ethers.getSigners();
  const NAME = "TokenMaster";
  const SYMBOL = "TMB";

  //Deploy contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster");
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL);
  await tokenMaster.deployed();

  console.log("TokenMaster deployed to:", tokenMaster.address);

  //List 6 occasions
  const occasions = [
    {
      name: "ETH Texas",
      cost: tokens(1),
      tickets: 0,
      date: "Apr 27",
      time: "10:00AM CST",
      location: "Austin, TX",
    },
    {
      name: "ETH California",
      cost: tokens(1),
      tickets: 100,
      date: "May 27",
      time: "10:00AM PST",
      location: "San Francisco, CA",
    },
    {
      name: "ETH New York",
      cost: tokens(1),
      tickets: 150,
      date: "Jun 27",
      time: "10:00AM EST",
      location: "New York, NY",
    },
    {
      name: "ETH Florida",
      cost: tokens(1),
      tickets: 200,
      date: "Jul 27",
      time: "10:00AM EST",
      location: "Miami, FL",
    },
    {
      name: "ETH Colorado",
      cost: tokens(1),
      tickets: 100,
      date: "Aug 27",
      time: "10:00AM MST",
      location: "Denver, CO",
    },
    {
      name: "ETH Washington",
      cost: tokens(1),
      tickets: 100,
      date: "Sep 27",
      time: "10:00AM PST",
      location: "Seattle, WA",
    },
  ];

  for (let i = 0; i < occasions.length; i++) {
    const occasion = occasions[i];
    const transaction = await tokenMaster
      .connect(deployer)
      .list(
        occasion.name,
        occasion.cost,
        occasion.tickets,
        occasion.date,
        occasion.time,
        occasion.location
      );
    await transaction.wait();
    console.log(`Occasion ${i + 1} : ${occasion.name} listed successfully!`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
