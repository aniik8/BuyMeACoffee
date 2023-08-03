require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
// require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
// console.log(process.env);
module.exports = {
  solidity: "0.8.18",
  networks : {
    goerli : {
      url : "https://eth-goerli.g.alchemy.com/v2/X0fNvHIcsHTODGULv2l0U3zQrJYLHnzg",
      accounts : process.env.TESTNET_PRIVATE_KEY
  },
  }
};
