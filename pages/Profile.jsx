import {
  Box,
  Flex,
  Heading,
  Text,
  HStack,
  Stack,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  Tag,
} from "@chakra-ui/react";
import Image from "next/image";
import { FaCheckCircle, FaLock } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import g5 from "../src/assets/g5.png";
import dp from "../src/assets/667.gif";
import error from "../src/assets/error.jpg";
import post from "../src/assets/new-post.png";
import message from "../src/assets/message.png";
import heart from "../src/assets/heart.png";
import Navbar from "./components/Navbar";
import { useRouter } from "next/router";
import { ethers } from "ethers";

import { Framework } from "@superfluid-finance/sdk-core";
import { Web3Provider } from "@ethersproject/providers";

import Tripleeet from "../artifacts/contracts/Tripleeet.sol/Tripleeet.json";
import { TripleeetAddress } from "../contract_address.json";
import { useEffect, useState } from "react";

function Profile() {
  const router = useRouter();
  const { address, chain, wallet } = router.query;
  console.log(address);

  const [userData, setUserData] = useState([]);

  async function fetchUserData() {
    if (typeof window.ethereum !== "undefined") {
      // const [account] = await window.ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        TripleeetAddress,
        Tripleeet.abi,
        provider
      );

      let overrides = {
        from: address,
      };

      const filesData = await contract.fetchUserPosts(overrides);
      setUserData(filesData);
      console.log("Data: ", filesData);

      console.log(filesData[0].uploadTime.toString());
      // setBalance(balance.toString());
      // setShowBalance(true);
      return filesData;
    }
  }

  useEffect(() => {
    // fetchUserData();
    // setInterval(() => {
    //   fetchUserData();
    // }, 10000);
  }, []);

  const testFlow = async () => {
    const sf = await Framework.create({
      networkName: "mumbai",
      provider: new Web3Provider(window.ethereum),
    });

    const signer = sf.createSigner({
      privateKey:
        "0x137e99faa9dc8efdbec1516a2914e79d070f92970e7a2eae8db859d9324e7230",
      provider: new Web3Provider(window.ethereum),
    });

    const DAIx = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f";

    try {
      const createFlowOperation = sf.cfaV1.createFlow({
        flowRate: "385802469135802",
        receiver: "0x3bc842B060066802B48834EcC2ec127589caF94E",
        superToken: DAIx,
        // userData?: string
      });

      console.log("Creating your stream...");

      const result = await createFlowOperation.exec(signer);
      console.log(result);

      alert("Joined Successfully!! 🎉🎉🎉");

      console.log(
        `Congrats - you've just created a money stream!
      View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
      Network: mumbai
      Super Token: DAIx
      Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
      Receiver: ${recipient},
      FlowRate: ${flowRate}
      `
      );
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  };

  useEffect(() => {
    // testFlow();
  }, []);

  return (
    <>
      <Box>
        <Navbar address={address} chain={chain} wallet={wallet} />
        <Box w="full" h="350px" overflow="hidden" position="relative">
          <Image layout="responsive" src={g5} objectFit="cover" />
        </Box>
        <Box align="center" mt="-9em">
          <Image src={dp} className="profile-bg" height={190} width={190} />
        </Box>

        <Box align="center">
          <Heading fontFamily="Raleway" my="10px" fontWeight={600}>
            Lakshay
          </Heading>
          <Text fontFamily="Montserrat">
            is creating Videos and Video Essays
          </Text>
          <Tag mt="5px">{"0x3bc842B060066802B48834EcC2ec127589caF94E"}</Tag>
          <Box align="center" my="1em" mt="3em">
            <Stack align="center">
              <Text fontFamily="Montserrat">
                <span className="fontRaleway">1</span>
                <br />
                Tripleet Users
              </Text>
              <Text></Text>
            </Stack>
            <Flex justifyContent="center" mt="20px">
              <Button
                boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
                rounded="20px"
                py="1.2em"
                px="3em"
                bg="#0177FF"
                color="white"
                _hover={{
                  bg: "#0177FF",
                  top: "-2px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
                fontFamily="Montserrat"
              >
                Share
              </Button>
              <Button
                boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
                rounded="20px"
                // p="1.2em"
                py="1.2em"
                px="3em"
                ml="30px"
                bg="#0177FF"
                color="white"
                _hover={{
                  bg: "#0177FF",
                  top: "-2px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
                fontFamily="Montserrat"
              >
                Follow
              </Button>
              <Button
                boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
                rounded="20px"
                // p="1.2em"
                py="1.2em"
                px="3em"
                ml="30px"
                bg="#0177FF"
                color="white"
                _hover={{
                  bg: "#0177FF",
                  top: "-2px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
                fontFamily="Montserrat"
              >
                Tip
              </Button>
            </Flex>
          </Box>
        </Box>

        <Box my="5em" align="center">
          <Heading fontFamily="Raleway">Select a membership level</Heading>
          <Flex justifyContent="space-evenly" mx="9%" mt="4em">
            <Box
              mb={4}
              shadow="base"
              borderWidth="1px"
              alignSelf={{ base: "center", lg: "flex-start" }}
              borderColor={useColorModeValue("gray.200", "gray.500")}
              borderRadius={"xl"}
            >
              <Stack
                textAlign="center"
                justify="center"
                spacing={{ base: 4, lg: 10 }}
              >
                <Box py={4} px={12} position="relative">
                  <Box
                    position="absolute"
                    top="-16px"
                    left="50%"
                    style={{ transform: "translate(-50%)" }}
                  >
                    <Text
                      textTransform="uppercase"
                      bg="#0177ff8c"
                      px={3.5}
                      py={1.5}
                      color="black"
                      fontSize="xl"
                      fontWeight="600"
                      rounded="xl"
                      letterSpacing="2px"
                    >
                      Silver
                    </Text>
                  </Box>
                  <HStack pt="1.4em" justifyContent="center">
                    <Text fontSize="3xl" fontWeight="600">
                      $
                    </Text>
                    <Text fontSize="5xl" fontWeight="900">
                      5
                    </Text>
                    <Text fontSize="3xl" color="gray.500">
                      /month
                    </Text>
                  </HStack>
                </Box>
                <VStack
                  bg={useColorModeValue("gray.50", "gray.700")}
                  py={2}
                  borderBottomRadius={"xl"}
                >
                  <List spacing={3} textAlign="start" px={12}>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Earn 20.0 LKH per month
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Exclusive Tripleeet-Only content
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Unlock Key to access Bronze content
                    </ListItem>
                  </List>
                  <Box w="80%" pt={7}>
                    <Button
                      w="full"
                      colorScheme="blue"
                      variant="outline"
                      onClick={testFlow}
                    >
                      Join
                    </Button>
                  </Box>
                </VStack>
              </Stack>
            </Box>

            <Box
              mb={4}
              shadow="base"
              borderWidth="1px"
              alignSelf={{ base: "center", lg: "flex-start" }}
              borderColor={useColorModeValue("gray.200", "gray.500")}
              borderRadius={"xl"}
            >
              <Stack
                textAlign="center"
                justify="center"
                spacing={{ base: 4, lg: 10 }}
              >
                <Box py={4} px={12} position="relative">
                  <Box
                    position="absolute"
                    top="-16px"
                    left="50%"
                    style={{ transform: "translate(-50%)" }}
                  >
                    <Text
                      textTransform="uppercase"
                      bg="#0177ff8c"
                      px={3.5}
                      py={1.5}
                      color="black"
                      fontSize="xl"
                      fontWeight="600"
                      rounded="xl"
                      letterSpacing="2px"
                    >
                      Gold
                    </Text>
                  </Box>
                  <HStack pt="1.4em" justifyContent="center">
                    <Text fontSize="3xl" fontWeight="600">
                      $
                    </Text>
                    <Text fontSize="5xl" fontWeight="900">
                      10
                    </Text>
                    <Text fontSize="3xl" color="gray.500">
                      /month
                    </Text>
                  </HStack>
                </Box>
                <VStack
                  bg={useColorModeValue("gray.50", "gray.700")}
                  py={2}
                  borderBottomRadius={"xl"}
                >
                  <List spacing={3} textAlign="start" px={12}>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Earn 20.0 LKH per month
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Exclusive Tripleeet-Only content
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Unlock Key to access Bronze content
                    </ListItem>
                  </List>
                  <Box w="80%" pt={7}>
                    <Button w="full" colorScheme="blue" variant="outline">
                      Join
                    </Button>
                  </Box>
                </VStack>
              </Stack>
            </Box>
          </Flex>
        </Box>

        <Box
          w="560px"
          mx="auto"
          border="1px"
          borderColor="gray.300"
          rounded="sm"
          align="center"
          py="2em"
        >
          <Heading fontSize="21px" fontFamily="Raleway" mb="1.7em">
            Become a tripleet user to
          </Heading>
          <Flex justifyContent="space-evenly">
            <Stack fontSize="14px" fontFamily="Montserrat" align="center">
              <Image src={post} height={40} width={40} />
              <Text px="2em" fontSize="14px">
                Unlock exclusive posts
              </Text>
            </Stack>
            <Stack align="center">
              <Image src={heart} height={40} width={40} />
              <Text px="2em" fontSize="14px">
                Be part of the community
              </Text>
            </Stack>
            <Stack align="center">
              <Image src={message} height={40} width={40} />
              <Text px="2em" fontSize="14px">
                Connect via private message
              </Text>
            </Stack>
          </Flex>
        </Box>

        <Box my="5em" align="center">
          <Heading fontFamily="Raleway" mb="1em">
            Recents Posts
          </Heading>

          {userData &&
            userData.map((list) => {
              return (
                <Box
                  w="560px"
                  shadow="base"
                  borderWidth="1px"
                  borderColor={useColorModeValue("gray.200", "gray.500")}
                  borderRadius={"sm"}
                  overflow="hidden"
                >
                  <Box
                    position="absolute"
                    w="558px"
                    h="300px"
                    zIndex="999"
                    className="b-radius blur-box"
                    pt="5em"
                  >
                    <Stack
                      align="center"
                      spacing={2}
                      color="white"
                      fontFamily="Montserrat"
                    >
                      <AiOutlineLock />
                      <Text fontWeight={600}>
                        Unlock this post <br />
                        by becoming a dpatron
                      </Text>
                      <Text></Text>
                      <Button color="black" rounded="20px">
                        Join Now
                      </Button>
                    </Stack>
                  </Box>
                  <Image
                    className="b-radius"
                    src={`https://ipfs.io/ipfs/${list.postHash}`}
                    height={300}
                    width={560}
                  />
                  <Flex justifyContent="space-between" mx="0.7em" mt="0.6em">
                    <Text
                      color="blackAlpha.700"
                      fontSize="13px"
                      fontFamily="Montserrat"
                      fontWeight={500}
                    >
                      {moment.unix(list.uploadTime.toString()).format("D/M/Y")}
                    </Text>
                    <Flex alignItems="center">
                      <FaLock fontSize="11px" color="blackAlpha.700" />{" "}
                      <Text
                        color="blackAlpha.700"
                        pl="5px"
                        fontSize="13px"
                        fontFamily="Montserrat"
                        fontWeight={500}
                      >
                        Locked
                      </Text>
                    </Flex>
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
                    mb="0.6em"
                  >
                    {list && list.postDescription}
                  </Text>
                </Box>
              );
            })}
        </Box>
      </Box>
    </>
  );
}

export default Profile;
