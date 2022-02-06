import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiWalletAlt } from "react-icons/bi";
import { GiElectric } from "react-icons/gi";
import Link from "next/link";

function Navbar({ address, chain, wallet, connected }) {
  const router = useRouter();
  return (
    <>
      <Box py="1em">
        <Flex justifyContent="space-between" mx="9%" alignItems="center">
          <Link href="/">
            <Heading
              fontSize="28px"
              fontFamily="Philosopher"
              textTransform="uppercase"
            >
              tripleet
            </Heading>
          </Link>
          <Flex alignItems="center">
            <Box bg="rgb(213, 204, 201)" rounded="10px" p="0.7rem">
              <Flex alignItems="center" lineHeight="1.25rem" fontWeight="500">
                <BiWalletAlt />
                <Text ml="10px" fontFamily="Montserrat" fontSize=".875rem">
                  {address}
                </Text>
              </Flex>
            </Box>
            <Box ml="20px" bg="rgb(213, 204, 201)" rounded="10px" p="0.7rem">
              <Flex alignItems="center" lineHeight="1.25rem" fontWeight="500">
                <GiElectric />
                <Text ml="10px" fontFamily="Montserrat" fontSize=".875rem">
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

            {router.asPath === "/dashboard" && (
              <Link
                href={{
                  pathname: "/Profile",
                  query: {
                    address: address,
                    chain: chain,
                  },
                }}
                as={`/Profile/${address}`}
                isExternal
              >
                <Button
                  boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
                  rounded="20px"
                  py="1.2em"
                  px="2em"
                  bg="#0177FF"
                  color="white"
                  ml="20px"
                  _hover={{
                    bg: "#0177FF",
                    top: "-2px",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  }}
                  fontFamily="Montserrat"
                  // onClick={() => {
                  //   router.push({
                  //     pathname: "/Profile",
                  //     query: {
                  //       address: "0x4be1F454E6a72230Bce064d998779a902747F580",
                  //     },
                  //   });
                  // }}
                >
                  Your Page
                </Button>
              </Link>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
