import {
  Box,
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import TripleeetERC20 from "../../artifacts/contracts/TripleeetERC20.sol/TripleeetERC20.json";

function CreateToken({ setGetStarted }) {
  const toast = useToast();
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [quantity, setQuantity] = useState();
  const [checker, setChecker] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hash, setHash] = useState();

  //   const account = wallet.connect(provider);
  const getMetamaskProvider = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      return new ethers.providers.Web3Provider(window.ethereum);
    } else {
      return null;
    }
  };

  useEffect(() => {
    success &&
      toast({
        title: `${name} Contract Deployed `,
        description: hash,
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    checker &&
      toast({
        title: "Please Wait!",
        description: `Deploying ${name} Contract...`,
        status: "info",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
  }, [success, checker]);

  const run = async () => {
    setChecker(true);
    const mprovider = await getMetamaskProvider();
    const signer = mprovider.getSigner();
    const factory = new ethers.ContractFactory(
      TripleeetERC20.abi,
      TripleeetERC20.bytecode,
      signer
    );
    const contract = await factory.deploy(name, symbol, quantity);

    console.log(contract.address);
    setSuccess(true);
    setHash(contract.address);
    setGetStarted(false);
    console.log(contract.deployTransaction);
  };

  //   run();

  return (
    <>
      {/* <Modal isOpen={true} onClose={onClose}> */}
      {/* <ModalOverlay /> */}
      {/* <ModalContent> */}
      <Box
        mt="5em"
        w="700px"
        p="2em"
        mx="auto"
        bg="whiteSmoke"
        borderRadius="10px"
      >
        <Heading
          mx="9%"
          mb="1em"
          fontFamily="Raleway"
          fontSize="1.5em"
          fontWeight={500}
        >
          Get Started !
        </Heading>
        {/* <ModalHeader align="center">Get Started</ModalHeader> */}

        <Stack p="1em" mx="9%" mb="2.5em" spacing={4}>
          <Text fontFamily="Raleway" fontWeight={600}>
            Name your Tripleeet token:
          </Text>
          <FormControl>
            <Box>
              <FormLabel>Name</FormLabel>
              <Input
                mb="0.5rem"
                fontFamily="Inter"
                type="text"
                placeholder="My Own Token"
                rounded="md"
                name="title"
                borderColor="black"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>

            <Flex justifyContent="space-between">
              <Box mr="2em">
                <FormLabel>Symbol</FormLabel>
                <Input
                  mb="0.5rem"
                  fontFamily="Inter"
                  type="text"
                  placeholder="MINE"
                  rounded="md"
                  name="title"
                  borderColor="black"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Quantity</FormLabel>
                <Input
                  mb="0.5rem"
                  fontFamily="Inter"
                  type="text"
                  placeholder="10000"
                  borderColor="black"
                  rounded="md"
                  autoComplete="off"
                  name="description"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Box>
            </Flex>
          </FormControl>

          <Button
            bg="#0177FF"
            mt="1em"
            color="white"
            w="min-content"
            _hover={{ backgroundColor: "none" }}
            onClick={run}
          >
            {checker ? (
              <Flex alignItems="center">
                <Spinner mr="10px" /> Deploying..
              </Flex>
            ) : (
              "Deploy Tripleeet Contract"
            )}
          </Button>
        </Stack>
      </Box>
      {/* </ModalContent> */}
      {/* </Modal> */}
    </>
  );
}

export default CreateToken;
