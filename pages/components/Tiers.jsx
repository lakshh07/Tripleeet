import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Divider,
  Text,
  Button,
  Flex,
  VStack,
  HStack,
  Stack,
  List,
  ListItem,
  useColorModeValue,
  ListIcon,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { ethers } from "ethers";
import CreateTier from "./CreateTier";
const { Web3Service, WalletService } = require("@unlock-protocol/unlock-js");

function Tiers({ Tripleeet, TripleeetAddress }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [checker, setChecker] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    success &&
      toast({
        title: "Tier Created",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    checker &&
      toast({
        title: "Please Wait!",
        description: "Creating Tier",
        status: "info",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
  }, [success, checker]);

  const networks = {
    4: {
      unlockAddress: "0xd8c88be5e8eb88e38e6ff5ce186d764676012b0b",
      provider: `https://rinkeby.infura.io/v3/${process.env.KEY}`,
    },
  };

  async function run() {
    setChecker(true);
    const web3Service = new Web3Service(networks);
    const walletService = new WalletService(networks);

    const lockAddress = "0x3B6936bC2EDA4d96CC1f6fcb494D6b18388D1918";

    const lock = await web3Service.getLock(lockAddress, 4);

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
    await walletService.createLock(
      {
        maxNumberOfKeys: 100,
        name: "testing silver",
        expirationDuration: 12121311,
        keyPrice: "0.01",
      },
      (error, hash) => {
        console.log({ hash });
      }
    );
    setSuccess(true);
    // const lockContract = await walletService.getLockContract(lockAddress);
  }
  // run();

  return (
    <>
      <CreateTier
        run={run}
        checker={checker}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Box mx="1%" mt="1em">
        <Heading fontSize="2rem" mb="0.3em" fontFamily="Raleway">
          Tiers
        </Heading>
        <Text>
          Add tiers for you backer to choose from. Tip: offer higher Tripleeet
          token multipliers for higher tiers.
        </Text>
        <Divider mt="0.5em" borderColor="blackAlpha.500" />

        <Button
          boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
          rounded="20px"
          py="1.2em"
          px="2em"
          mt="3em"
          bg="#0177FF"
          color="white"
          _hover={{
            bg: "#0177FF",
            top: "-2px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          fontFamily="Montserrat"
          onClick={onOpen}
        >
          Add Tier
        </Button>

        <Box display="">
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
                bg="whiteAlpha.800"
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
                </VStack>
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default Tiers;
