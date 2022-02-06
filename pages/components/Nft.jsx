import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  chakra,
  Box,
  Text,
  Button,
  Stack,
  FormControl,
  Flex,
  FormLabel,
  Input,
  useColorModeValue,
  Badge,
  Spinner,
  VisuallyHidden,
  useToast,
  Heading,
  Wrap,
  WrapItem,
  Link,
} from "@chakra-ui/react";
import * as IPFS from "ipfs-core";
import error from "../../src/assets/error.jpg";
import Image from "next/image";
import { ethers } from "ethers";

import TripleeetNft from "../../artifacts/contracts/TripleeetNft.sol/TripleeetNFT.json";
import { TripleeetNftAddress } from "../../contract_address.json";

function Nft() {
  const toast = useToast();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [hash, setHash] = useState();
  const [checker, setChecker] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fileName, setFilename] = useState();
  const [address, setAddress] = useState(
    "0x4be1F454E6a72230Bce064d998779a902747F580"
  );
  const [userData, setUserData] = useState();
  const [file, setFile] = useState({
    fileName: "",
    file: "",
  });

  let NewBuffer;
  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    }

    const reader = new window.FileReader();

    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onloadend = () => {
      NewBuffer = Buffer(reader.result);
      console.log("buffer", NewBuffer);
    };
  };

  useEffect(() => {
    success &&
      toast({
        title: "NFT Minted",
        description: hash,
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    checker &&
      toast({
        title: "Please Wait!",
        description: "Minting your Nft...",
        status: "info",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
  }, [success, checker]);

  const options = {
    method: "POST",
    url: "https://api.nftport.xyz/v0/mints/easy/urls",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${process.env.NFTPORt_KEY}`,
    },
    data: {
      chain: "polygon",
      name: name,
      description: description,
      file_url: `https://ipfs.io/ipfs/${hash}`,
      mint_to_address: address,
    },
  };

  const mint = async () => {
    setChecker(true);
    const ipfs = await IPFS.create();
    const { cid } = await ipfs.add(file);
    setHash(cid.toString());
    console.log(cid.toString());

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  async function uploadingFile() {
    setChecker(true);
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        TripleeetNftAddress,
        TripleeetNft.abi,
        signer
      );

      let overrides = {
        from: account,
      };

      await mint();

      const result = await contract.uploadNft(name, description, overrides);
      console.log(result.hash);
      setHash(result.hash);
      setSuccess(true);
      setSuccess(true);
    }
    // setInterval(() => {
    //   router.reload();
    // }, 15000);
  }

  async function fetchUserData() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        TripleeetNftAddress,
        TripleeetNft.abi,
        provider
      );

      let overrides = {
        from: account,
      };

      const filesData = await contract.fetchUserNfts(overrides);
      setUserData(filesData);
      console.log("Data: ", filesData);

      // setBalance(balance.toString());
      // setShowBalance(true);
      return filesData;
    }
  }

  useEffect(() => {
    fetchUserData();
  });

  return (
    <div>
      <Box>
        <Stack p="1em" mx="9%" mb="2.5em" spacing={4}>
          <FormControl>
            <Flex justifyContent="space-between" mr="30%">
              <Box>
                <FormLabel>Name</FormLabel>
                <Input
                  mb="0.5rem"
                  fontFamily="Inter"
                  type="text"
                  placeholder="Post Name"
                  rounded="md"
                  name="title"
                  borderColor="black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Description</FormLabel>
                <Input
                  mb="0.5rem"
                  fontFamily="Inter"
                  type="text"
                  placeholder="Short Description"
                  borderColor="black"
                  rounded="md"
                  autoComplete="off"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
            </Flex>
          </FormControl>
          <Flex alignItems="center" mt={1}>
            <Badge m={0}>{fileName}</Badge>
            <chakra.label
              cursor="pointer"
              rounded="md"
              fontSize="md"
              ml={5}
              size="sm"
              fontWeight="medium"
              color={useColorModeValue("brand.600", "brand.200")}
              pos="relative"
              _hover={{
                color: useColorModeValue("brand.400", "brand.300"),
              }}
            >
              <span>Upload a file</span>
              <VisuallyHidden>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept="*"
                  onChange={handleFile}
                />
              </VisuallyHidden>
            </chakra.label>
          </Flex>
          <Button
            bg="#0177FF"
            mt="1em"
            color="white"
            w="min-content"
            _hover={{ backgroundColor: "none" }}
            onClick={uploadingFile}
          >
            {checker && <Spinner mr={4} />}
            {checker ? "Minting NFT" : "Mint"}
          </Button>
        </Stack>

        <Heading
          align="center"
          fontFamily="Raleway"
          //   fontSize="1.2em"
          fontWeight="400"
        >
          Your Nfts
        </Heading>
        <Wrap px="2em" py="2em">
          <Link href="https://opensea.io/account?tab=private" isExternal>
            {userData &&
              userData.map((nft) => {
                return (
                  <WrapItem mr="1em" bg="blackAlpha.500" p="2em" rounded="10px">
                    <Stack align="center">
                      {/* <Image height={200} width={200} src={book} /> */}
                      <Heading mt="10px" fontFamily="Raleway">
                        {nft.nftName}
                      </Heading>
                      <Text>{nft.nftDescription}</Text>
                    </Stack>
                  </WrapItem>
                );
              })}
          </Link>
        </Wrap>
      </Box>
    </div>
  );
}

export default Nft;
