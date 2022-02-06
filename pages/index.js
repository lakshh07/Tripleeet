import Head from "next/head";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Dashboard from "./components/Dashboard";
import { useDisclosure } from "@chakra-ui/react";
import Hero from "./components/Hero";
import Link from "next/link";
import Profile from "./Profile";
const ethers = require("ethers");
import { useRouter } from "next/router";
const { Web3Service, WalletService } = require("@unlock-protocol/unlock-js");

import { sequence } from "0xsequence";
import Web3Modal from "./components/Web3Modal";
// import connectSquence from "../src/utils/connectWallet";

import Tripleeet from "../artifacts/contracts/Tripleeet.sol/Tripleeet.json";
import TripleeetAddress from "../contract_address.json";

export default function Home() {
  const router = useRouter();
  const [wallet, setWallet] = useState();
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();
  const [chain, setChain] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [connected, setConnected] = useState(false);

  useEffect(async () => {
    // const wallet = new sequence.Wallet("mumbai");
    // setWallet(wallet);
    // const connectDetails = await wallet.connect({
    //   app: "Tripleet",
    //   authorize: true,
    // });
    // console.log("user accepted connect?", connectDetails.connected);
    // setConnected(connectDetails.connected);
    // console.log(
    //   "users signed connect proof to valid their account address:",
    //   connectDetails.proof
    // );
    // connectSquence();
    // wallet.disconnect();
    if (connected) {
      console.log(connected);
      const chainName = await wallet.getNetworks();
      setChain(chainName[0].title);
      const walletAddress = await wallet.getAddress();
      setAddress(walletAddress);
      const provider = wallet.getProvider();
      setProvider(provider);
      const signer = wallet.getSigner();
      setSigner(signer);
    }
  }, []);

  const connectSquence = async () => {
    const connectDetails = await wallet.connect({
      app: "Tripleeet",
      authorize: true,
    });
    console.log("user accepted connect?", connectDetails.connected);
    console.log(
      "users signed connect proof to valid their account address:",
      connectDetails.proof
    );
  };

  const networks = {
    4: {
      unlockAddress: "0xd8c88be5e8eb88e38e6ff5ce186d764676012b0b",
      provider: "https://rinkeby.infura.io/v3/2ffd2a950cd3424dbdb8ae4296f88068",
    },
  };

  // const provider = new ethers.providers.JsonRpcProvider(networks[4].provider);

  // const getMetamaskProvider = async () => {
  //   if (window.ethereum) {
  //     await window.ethereum.enable();
  //     return new ethers.providers.Web3Provider(window.ethereum);
  //   } else {
  //     return null;
  //   }
  // };

  // const wallet = ethers.Wallet.fromMnemonic(
  //   "solid entry walnut extend aisle skirt myth clog need analyst edit bench"
  // ).connect(provider);

  async function run() {
    const web3Service = new Web3Service(networks);
    const walletService = new WalletService(networks);

    // This lock exists on Rinkeby (you can create one from the dashboard if needed)
    const lockAddress = "0x3B6936bC2EDA4d96CC1f6fcb494D6b18388D1918";

    const lock = await web3Service.getLock(lockAddress, 4);
    //   {
    //     asOf: 10094781,
    //     name: 'May 4th 2021',
    //     publicLockVersion: 8,
    //     maxNumberOfKeys: -1, // -1 means Infinite
    //     expirationDuration: 345600,
    //     keyPrice: '0.01',
    //     beneficiary: '0xDD8e2548da5A992A63aE5520C6bC92c37a2Bcc44',
    //     balance: '0.02',
    //     outstandingKeys: 11,
    //     currencyContractAddress: null
    //   }
    console.log(lock);
    const getMetamaskProvider = async () => {
      if (window.ethereum) {
        await window.ethereum.enable();
        return new ethers.providers.Web3Provider(window.ethereum);
      } else {
        return null;
      }
    };

    const mprovider = await getMetamaskProvider();

    await walletService.connect(mprovider);
    // await walletService.purchaseKey(
    //   {
    //     lockAddress,
    //   },
    //   (error, hash) => {
    //     // This is the hash of the transaction!
    //     console.log({ hash });
    //   }
    // );
    // await walletService.createLock(
    //   {
    //     maxNumberOfKeys: 100,
    //     name: "testing silver",
    //     expirationDuration: 12121311,
    //     keyPrice: "0.01",
    //   },
    //   (error, hash) => {
    //     console.log({ hash });
    //   }
    // );

    // const lockContract = await walletService.getLockContract(lockAddress);
  }
  // run();
  // https://rinkeby.infura.io/v3/2ffd2a950cd3424dbdb8ae4296f88068
  return (
    <>
      <Web3Modal
        connectSquence={connectSquence}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Hero
        Tripleeet={Tripleeet}
        TripleeetAddress={TripleeetAddress}
        onOpen={onOpen}
        chain={chain}
        address={address}
        provider={provider}
        signer={signer}
        wallet={wallet}
        connected={connected}
      />
    </>
  );
}
