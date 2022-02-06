import React from "react";
import Image from "next/image";
import {
  Box,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import metamask from "../../src/assets/metamask-fox.svg";
import sequence from "../../src/assets/sequence.svg";

function Web3Modal({ connectSquence, isOpen, onClose }) {
  return (
    <div>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Box py="1em" h="min-content">
              <Flex justifyContent="center">
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  flexDir="column"
                  px="3.5em"
                  py="1em"
                  _hover={{ backgroundColor: "whitesmoke" }}
                  rounded="20px"
                  cursor="pointer"
                  //   onClick={() => {
                  //     metamaskLogin();
                  //     onClose();
                  //   }}
                >
                  <Image src={metamask} width={100} height={100} />
                  <Text fontFamily="Lato" textTransform="uppercase" mt="2em">
                    Metamask
                  </Text>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  flexDir="column"
                  px="3em"
                  py="1em"
                  _hover={{ backgroundColor: "whitesmoke" }}
                  rounded="20px"
                  cursor="pointer"
                  onClick={() => {
                    connectSquence();
                    // onClose();
                  }}
                >
                  <Image src={sequence} width={100} height={100} />
                  <Text
                    fontFamily="Lato"
                    textAlign="center"
                    textTransform="uppercase"
                    mt="2em"
                  >
                    Sequence
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Web3Modal;
