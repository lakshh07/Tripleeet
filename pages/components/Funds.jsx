import { Box, Divider, Heading, Text, Input, Button } from "@chakra-ui/react";
import React from "react";

function Funds() {
  return (
    <>
      <Box mx="9%" mt="3em">
        <Heading mb="0.5em" fontFamily="Raleway">
          Withdraw Funds
        </Heading>
        <Divider borderColor="blackAlpha.500" />

        <Text mt="20px" align="center">
          Withdraw Funds from Tripleeet Account
        </Text>

        <Text mt="2em" mb="8px">
          Amount:{" "}
        </Text>
        <Input
          // value={value}
          // onChange={handleChange}
          placeholder="0"
          borderColor="black"
          size="sm"
        />
        <Button
          boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
          rounded="20px"
          py="1.2em"
          px="2em"
          bg="#0177FF"
          color="white"
          mt="2em"
          _hover={{
            bg: "#0177FF",
            top: "-2px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          fontFamily="Montserrat"
        >
          Withdraw
        </Button>
      </Box>
    </>
  );
}

export default Funds;
