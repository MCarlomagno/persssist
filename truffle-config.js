/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraProjectId = process.env.INFURA_PROJECT_ID
const accountAddr = process.env.ACCOUNT_ADDRESS;
module.exports = {

  contracts_build_directory: "./abis",
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    },
    kovan: {
      provider: () => {
        const privateKey = process.env.PRIVATE_KEY;
        return new HDWalletProvider(
          privateKey,
          `https://kovan.infura.io/v3/${infuraProjectId}`
        )
      },
      from: accountAddr,
      network_id: 42, // Kovan's id
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200,
    },
    rinkeby: {
      provider: () => {
        const privateKey = process.env.PRIVATE_KEY;
        return new HDWalletProvider(
          privateKey,
          `wss://rinkeby.infura.io/ws/v3/${infuraProjectId}`
        )
      },
      from: accountAddr,
      network_id: 4, // Rinkeby's id
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // reporter: 'eth-gas-reporter',
    // reporterOptions: {
    //   excludeContracts: ['Migrations']
    // }
  },

  test_directory: './src/test',

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows: 
  // $ truffle migrate --reset --compile-all
  //
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
  plugins: ["solidity-coverage"]
};
