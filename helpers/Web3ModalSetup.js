const ethers = require("ethers");

import { sequence } from "0xsequence";
import Web3Modal from "web3modal";
import WalletConnect from "@walletconnect/web3-provider";
import { configureLogger } from "@0xsequence/utils";

const providerOptions = {
  // Example with injected providers
  // injected: {
  //   display: {
  //     // logo: "data:image/gif;base64,INSERT_BASE64_STRING",
  //     name: "Injected",
  //     description: "Connect with the provider in your Browser"
  //   },
  //   package: null
  // },
  // Example with WalletConnect provider
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: "INFURA_ID", // required
    },
  },
  sequence: {
    package: sequence,
    options: {
      appName: "Web3Modal Demo Dapp",
      defaultNetwork: "polygon",
    },
  },
};

const Web3ModalSetup = new Web3Modal({
  providerOptions,
  cacheProvider: true,
});

export default Web3ModalSetup;
