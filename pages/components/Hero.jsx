import {
  Box,
  Heading,
  Flex,
  Button,
  Text,
  Link,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import bg from "../../src/assets/hbg.png";
import profilebg from "../../src/assets/h2bg.png";
import membership from "../../src/assets/h3bg.png";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { BiWalletAlt } from "react-icons/bi";
import { GiElectric } from "react-icons/gi";
import { useRouter } from "next/router";
import Web3Modal from "./Web3Modal";
import { useEffect } from "react";

function Hero({ isOpen, onOpen, onClose, address, chain, wallet, connected }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/components/Dashboard");
  }, []);
  return (
    <>
      <Box m="0" p="0.7em" w="100%" h="100%" bg="#111">
        <Box mx="auto" bg="#EAE1DE">
          <Box>
            <Box py="2em">
              <Flex justifyContent="space-between" mx="9%">
                <Heading fontFamily="Philosopher" textTransform="uppercase">
                  tripleet
                </Heading>

                {connected ? (
                  <Flex alignItems="center">
                    <Box bg="rgb(213, 204, 201)" rounded="10px" p="0.7rem">
                      <Flex
                        alignItems="center"
                        lineHeight="1.25rem"
                        fontWeight="500"
                      >
                        <BiWalletAlt />
                        <Text
                          ml="10px"
                          fontFamily="Montserrat"
                          fontSize=".875rem"
                        >
                          {address}
                        </Text>
                      </Flex>
                    </Box>
                    <Box
                      ml="20px"
                      bg="rgb(213, 204, 201)"
                      rounded="10px"
                      p="0.7rem"
                    >
                      <Flex
                        alignItems="center"
                        lineHeight="1.25rem"
                        fontWeight="500"
                      >
                        <GiElectric />
                        <Text
                          ml="10px"
                          fontFamily="Montserrat"
                          fontSize=".875rem"
                        >
                          {chain}
                        </Text>
                      </Flex>
                    </Box>

                    <Button
                      boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
                      rounded="20px"
                      py="1.2em"
                      px="2em"
                      bg="#0177FF"
                      color="white"
                      _hover={{
                        bg: "#0177FF",
                        top: "-2px",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}
                      fontFamily="Montserrat"
                      ml="25px"
                      onClick={() => {
                        wallet.disconnect();
                      }}
                    >
                      Sign Out
                    </Button>
                  </Flex>
                ) : (
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
                    onClick={onOpen}
                  >
                    Connect Wallet
                  </Button>
                )}
              </Flex>
            </Box>

            <Box>
              <Flex
                my="3.5em"
                mx="9%"
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Heading
                  fontFamily="Paytone One"
                  letterSpacing="1px"
                  fontSize="5em"
                  flex="2"
                >
                  Meaningful way
                  <br />
                  to fund your
                  <br />
                  creative work
                </Heading>
                <Flex
                  flexDirection="column"
                  align="flex-start"
                  p="1em"
                  flex="1"
                  color="black"
                  fontWeight="500"
                >
                  <Text>Tripleet makes supporting fun and easy.</Text>
                  <Text pt="5px">
                    In just a couple of taps, your fans can make the payment
                    every second and leave a message
                  </Text>
                  <Button
                    mt="3em"
                    leftIcon={<BsFillArrowUpRightCircleFill fontSize="2.8em" />}
                    textTransform="uppercase"
                    fontFamily="Montserrat"
                    // fontSize="2em"
                    variant="ghost"
                    _hover={{ backgroundColor: "none" }}
                    ml="-1em"
                    onClick={() => {
                      router.push(
                        {
                          pathname: "/components/Dashboard",
                          query: {
                            chain: chain,
                            address: address,
                            wallet: wallet,
                            connected: connected,
                          },
                        },
                        `/dashboard`
                      );
                    }}
                  >
                    <span className="btn-span">Get Involved</span>
                  </Button>
                </Flex>
              </Flex>
            </Box>

            <Box align="right" ml="8%">
              <Image src={bg} height={300} width={1350} />
            </Box>
          </Box>

          <Box my="9em" align="center">
            <Heading fontFamily="Raleway">Who uses Tripleet?</Heading>
            <Text mt="1em" fontFamily="Montserrat">
              If you&apos;re ready to take your work to the next level and
              willing to open your heart to your
              <br />
              audience, Tripleet is for you.
            </Text>
          </Box>

          <Box
            my="9em"
            align="center"
            pt="4em"
            pb="1em"
            bg="rgb(213, 204, 201)"
          >
            <Heading fontFamily="Raleway">
              Why should creators use membership?
            </Heading>
            <Box pt="3em">
              <Image src={membership} height={320} width={1050} />
            </Box>
          </Box>

          <Box my="9em" align="center">
            <Heading fontFamily="Raleway">
              It&apos;s easier than you think
            </Heading>
            <Text mb="3.5em" mt="1em" fontFamily="Montserrat">
              There are many ways to delight your fans and every creator can
              find their own.
            </Text>

            <Image src={profilebg} height={800} width={950} />
          </Box>

          <Box py="4em" bg="rgb(213, 204, 201)" align="center">
            <Heading fontFamily="Raleway" mb="1em">
              Are you ready to take back control?
            </Heading>
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
              mt="1em"
            >
              Get Started
            </Button>
          </Box>

          <Flex
            fontFamily="Montserrat"
            bg="#111"
            mt="3em"
            px="15%"
            color="white"
            py="1em"
            alignItems="center"
            justifyContent="space-around"
          >
            <Link href="https://nfthack.ethglobal.co/" isExternal>
              <Text>Build In ROAD TO WEB3 2022 - ETH GLOBAL</Text>
            </Link>
            <Divider orientation="vertical" height="30px" />
            <Text>
              Build and Designed By{" "}
              <Link href="https://lakshaymaini.ml/" isExternal>
                Lakshay Maini
              </Link>
            </Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default Hero;
