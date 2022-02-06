import { Box, Divider, Heading, Text, Input, Button } from "@chakra-ui/react";
import React from "react";

function Funds() {
  return (
    <>
      <Box mx="9%" mt="3em">
        <Heading mb="0.2em" fontFamily="Raleway">
          Token
        </Heading>
        <Text mb="0.5em">
          There are currently 10,000 ASM tokens remaining undistributed.
        </Text>
        <Divider borderColor="blackAlpha.500" />

        <Text mt="2em" fontWeight={500}>
          Send ASM tokens from Tripleeet contract:
        </Text>

        <Text mt="1em" mb="8px">
          To:{" "}
        </Text>
        <Input
          // value={value}
          // onChange={handleChange}
          placeholder="0x"
          borderColor="black"
          size="sm"
        />
        <Text mt="1em" mb="8px">
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
          Send
        </Button>
      </Box>
    </>
  );
}

export default Funds;
