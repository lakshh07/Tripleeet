import {
  Box,
  Button,
  Flex,
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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

function CreateTier({ run, isOpen, onClose, checker }) {
  const [name, setName] = useState();
  const [multiplier, setMultiplier] = useState();
  const [amount, setAmount] = useState();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box w="700px" p="2em" mx="auto" bg="whiteSmoke" borderRadius="10px">
            <ModalHeader align="center">Create a Membership Tier</ModalHeader>

            <Stack p="1em" mx="9%" mb="2.5em" spacing={4}>
              <FormControl>
                <Box>
                  <FormLabel>Name</FormLabel>
                  <Input
                    mb="0.5rem"
                    fontFamily="Inter"
                    type="text"
                    placeholder="Lock Name"
                    rounded="md"
                    name="title"
                    borderColor="black"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>

                <Flex justifyContent="space-between">
                  <Box mr="2em">
                    <FormLabel>Price</FormLabel>
                    <Input
                      mb="0.5rem"
                      fontFamily="Inter"
                      type="text"
                      placeholder="Price per month"
                      rounded="md"
                      name="title"
                      borderColor="black"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <FormLabel>Multipier</FormLabel>
                    <Input
                      mb="0.5rem"
                      fontFamily="Inter"
                      type="text"
                      placeholder="2"
                      borderColor="black"
                      rounded="md"
                      autoComplete="off"
                      name="description"
                      value={multiplier}
                      onChange={(e) => setMultiplier(e.target.value)}
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
                {checker ? <Spinner /> : "Create Tier"}
              </Button>
            </Stack>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateTier;
