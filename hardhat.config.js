/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-waffle");
 require("dotenv").config();
 
 // Possible network values
 const TEST_NETWORK = "TEST_NETWORK"
 const LOCAL_NETWORK = "LOCAL_NETWORK"
 
 // By default network is set to local, change it to TEST_NETWORK to make a switch
 const NETWORK = TEST_NETWORK
 
 const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
 const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
 
 let networks = {};
 if (NETWORK == TEST_NETWORK) {
    networks = {
     kovan: {
       url: `https://eth-kovan.alchemyapi.io/v2/ys38VJQFyFRiKXk6cYeRxP-0jkeXMzxQ`,
       accounts: [`72a4fcc49338caef0d708d7db939ef61a8011a5a08ecf468adbcf39158f21b36`, `72a4fcc49338caef0d708d7db939ef61a8011a5a08ecf468adbcf39158f21b36`]
     }
   }
 }
 
 module.exports = {
  solidity: {
    compilers: [
    {
      version: "0.6.7",
    },
    {
      version: "0.6.6",
    }
    ]
  },
   networks: networks
 };
 