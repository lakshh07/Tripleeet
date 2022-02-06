import {
  Box,
  Stack,
  Text,
  Heading,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import error from "../../src/assets/error.jpg";
import UploadFile from "./UploadFile";
import { ethers } from "ethers";
import moment from "moment";

function Posts({ Tripleeet, TripleeetAddress }) {
  const [userData, setUserData] = useState([]);

  async function fetchUserData() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        TripleeetAddress,
        Tripleeet.abi,
        provider
      );

      let overrides = {
        from: account,
      };

      const filesData = await contract.fetchUserPosts(overrides);
      setUserData(filesData);
      console.log("Data: ", filesData);

      // console.log(filesData[0].uploa dTime.toString());
      // setBalance(balance.toString());
      // setShowBalance(true);
      return filesData;
    }
  }

  useEffect(() => {
    fetchUserData();
    // setInterval(() => {
    //   fetchUserData();
    // }, 10000);
  }, []);

  return (
    <>
      <Box align="center">
        <Box>
          <UploadFile
            Tripleeet={Tripleeet}
            TripleeetAddress={TripleeetAddress}
          />
        </Box>

        <Heading fontFamily="Raleway" mb="1em">
          All Posts
        </Heading>

        {userData &&
          userData.map((list) => {
            return (
              <Box
                align="center"
                w="560px"
                shadow="base"
                borderWidth="1px"
                borderColor={useColorModeValue("gray.200", "gray.500")}
                borderRadius={"sm"}
                overflow="hidden"
                bg="whitesmoke"
              >
                {/* <Image
                  className="b-radius"
                  src={error}
                  height={300}
                  width={560}
                /> */}
                <img
                  className="b-radius"
                  src={`https://ipfs.io/ipfs/${list.postHash}`}
                ></img>
                <Flex justifyContent="space-between" mx="0.7em" mt="0.6em">
                  <Text
                    color="blackAlpha.700"
                    fontSize="13px"
                    fontFamily="Montserrat"
                    fontWeight={500}
                  >
                    {moment.unix(list.uploadTime.toString()).format("D/M/Y")}
                  </Text>
                </Flex>
                <Text
                  fontWeight={700}
                  fontFamily="Montserrat"
                  mx="0.7em"
                  textAlign="left"
                  fontSize="21px"
                  mb="0.6em"
                >
                  {list && list.postName}
                </Text>
                <Text
                  fontFamily="Montserrat"
                  mx="0.7em"
                  textAlign="left"
                  //   fontSize="px"
                  mb="0.6em"
                >
                  {list && list.postDescription}
                </Text>
              </Box>
            );
          })}
      </Box>
    </>
  );
}

export default Posts;
