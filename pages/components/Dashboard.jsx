import {
  Box,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Flex,
  TabPanel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Navbar from "./Navbar";
import { BiHomeAlt, BiDollarCircle } from "react-icons/bi";
import { MdOutlinePeopleAlt, MdOutlineGeneratingTokens } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { FaPhotoVideo } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { AiOutlinePicture } from "react-icons/ai";
import { useRouter } from "next/router";

import Funds from "./Funds";
import Members from "./Members";
import Tiers from "./Tiers";
import UserProfile from "./UserProfile";
import Posts from "./Posts";
import TokenFunds from "./TokenFunds";
import UserDashboard from "./UserDashboard";
import Nft from "./Nft";
import CreateToken from "./CreateToken";

import Tripleeet from "../../artifacts/contracts/Tripleeet.sol/Tripleeet.json";
import { TripleeetAddress } from "../../contract_address.json";

function Dashboard() {
  const router = useRouter();
  const { address, chain, wallet, connected } = router.query;
  const [getStarted, setGetStarted] = useState(false);

  return (
    <>
      <Box bg="#111" p="0.5em" h="100vh">
        <Box bg="#EAE1DE" h="100%">
          <Navbar
            address={address}
            chain={chain}
            wallet={wallet}
            connected={connected}
          />
          <Divider borderColor="blackAlpha.700" />

          {getStarted ? (
            <CreateToken setGetStarted={setGetStarted} />
          ) : (
            <Box p="1.5em" mt="2em" mx="3em" bg="#DBD4D0" rounded="lg">
              <Tabs isFitted variant="soft-rounded" colorScheme="blackAlpha">
                <TabList fontFamily="Raleway" fontWeight={600}>
                  <Tab
                    py="0.5em"
                    fontWeight="600"
                    fontSize="1.1em"
                    _focus={{ border: "none" }}
                    _selected={{ backgroundColor: "#121", color: "white" }}
                    _hover={{
                      borderBottom: "1px solid black",
                    }}
                  >
                    <BiHomeAlt className="mr" />
                    Dashboard
                  </Tab>
                  <Tab
                    py="0.5em"
                    fontWeight="600"
                    fontSize="1.1em"
                    _focus={{ border: "none" }}
                    _selected={{ backgroundColor: "#121", color: "white" }}
                    _hover={{
                      borderBottom: "1px solid black",
                    }}
                  >
                    <MdOutlinePeopleAlt className="mr" />
                    Members
                  </Tab>
                  <Tab
                    py="0.5em"
                    fontWeight="600"
                    fontSize="1.1em"
                    _focus={{ border: "none" }}
                    _selected={{ backgroundColor: "#121", color: "white" }}
                    _hover={{
                      borderBottom: "1px solid black",
                    }}
                  >
                    <FiLock className="mr" />
                    Tiers
                  </Tab>
                  <Tab
                    py="0.5em"
                    fontWeight="600"
                    fontSize="1.1em"
                    _focus={{ border: "none" }}
                    _selected={{ backgroundColor: "#121", color: "white" }}
                    _hover={{
                      borderBottom: "1px solid black",
                    }}
                  >
                    <BsPerson className="mr" />
                    Profile
                  </Tab>
                  <Tab
                    py="0.5em"
                    fontWeight="600"
                    fontSize="1.1em"
                    _focus={{ border: "none" }}
                    _selected={{ backgroundColor: "#121", color: "white" }}
                    _hover={{
                      borderBottom: "1px solid black",
                    }}
                  >
                    <BiDollarCircle className="mr" />
                    Balance
                  </Tab>
                  <Tab
                    py="0.5em"
                    fontWeight="600"
                    fontSize="1.1em"
                    _focus={{ border: "none" }}
                    _selected={{ backgroundColor: "#121", color: "white" }}
                    _hover={{
                      borderBottom: "1px solid black",
                    }}
                  >
                    <MdOutlineGeneratingTokens className="mr" /> ASM
                  </Tab>
                  <Tab
                    py="0.5em"
                    fontWeight="600"
                    fontSize="1.1em"
                    _focus={{ border: "none" }}
                    _selected={{ backgroundColor: "#121", color: "white" }}
                    _hover={{
                      borderBottom: "1px solid black",
                    }}
                  >
                    <FaPhotoVideo className="mr" />
                    Posts
                  </Tab>
                  <Tab
                    py="0.5em"
                    fontWeight="600"
                    fontSize="1.1em"
                    _focus={{ border: "none" }}
                    _selected={{ backgroundColor: "#121", color: "white" }}
                    _hover={{
                      borderBottom: "1px solid black",
                    }}
                  >
                    <AiOutlinePicture className="mr" />
                    NFTs
                  </Tab>
                </TabList>

                <TabPanels
                  h="65vh"
                  borderBottomEndRadius="lg"
                  borderBottomLeftRadius="lg"
                  bg="#DBD4D0"
                  fontFamily="Montserrat"
                  mt="1em"
                  overflow="auto"
                >
                  <TabPanel>
                    <UserDashboard />
                  </TabPanel>
                  <TabPanel>
                    <Members
                      Tripleeet={Tripleeet}
                      TripleeetAddress={TripleeetAddress}
                    />
                  </TabPanel>
                  <TabPanel>
                    <Tiers
                      Tripleeet={Tripleeet}
                      TripleeetAddress={TripleeetAddress}
                    />
                  </TabPanel>
                  <TabPanel>
                    <UserProfile
                      Tripleeet={Tripleeet}
                      TripleeetAddress={TripleeetAddress}
                    />
                  </TabPanel>
                  <TabPanel>
                    <Funds
                      Tripleeet={Tripleeet}
                      TripleeetAddress={TripleeetAddress}
                    />
                  </TabPanel>
                  <TabPanel>
                    <TokenFunds
                      Tripleeet={Tripleeet}
                      TripleeetAddress={TripleeetAddress}
                    />
                  </TabPanel>
                  <TabPanel>
                    <Posts
                      Tripleeet={Tripleeet}
                      TripleeetAddress={TripleeetAddress}
                    />
                  </TabPanel>
                  <TabPanel>
                    <Nft />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
