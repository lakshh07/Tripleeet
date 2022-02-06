import {
  Box,
  Divider,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import React from "react";

function Members() {
  return (
    <>
      <Box mx="1%" mt="1em">
        <Heading fontSize="2rem" mb="0.5em" fontFamily="Raleway">
          Members
        </Heading>
        <Divider borderColor="blackAlpha.500" />

        <Box mt="2em">
          <Table variant="striped" colorScheme="blackAlpha">
            <Thead>
              <Tr>
                <Th>Address</Th>
                <Th>Tier</Th>
                <Th>Start Date</Th>
                <Th>End Date</Th>
                <Th isNumeric>Revenue</Th>
                <Th isNumeric>Tripleeet Token</Th>
              </Tr>
            </Thead>
            <Tbody align="right">
              <Tr>
                <Td>{`${"0x4be1F454E6a72230Bce064d998779a90274ee540".substr(
                  0,
                  6
                )}...${"0x4be1F454E6a72230Bce064d998779a902747e540".substr(
                  -4
                )}`}</Td>
                <Td>Gold</Td>
                <Td>2022-02-06</Td>
                <Td>-</Td>
                <Td isNumeric>1.63</Td>
                <Td isNumeric>2.165</Td>
              </Tr>
              <Tr>
                <Td>{`${"0x2dc4be1F454E6a72230Bce064d998779a902747F580".substr(
                  0,
                  6
                )}...${"0x4be1F454E6a72230Bce064d998779a902747F583s10".substr(
                  -4
                )}`}</Td>
                <Td>Gold</Td>
                <Td>2022-02-06</Td>
                <Td>-</Td>
                <Td isNumeric>3.213</Td>
                <Td isNumeric>3.1</Td>
              </Tr>
              <Tr>
                <Td>{`${"0x4ax23be1F454E6a72230Bce064d998779a902747F580".substr(
                  0,
                  6
                )}...${"0x4be1F454E6a72230Bce064d998779a902747F58980".substr(
                  -4
                )}`}</Td>
                <Td>Bronze</Td>
                <Td>2022-02-04</Td>
                <Td>2022-02-24</Td>
                <Td isNumeric>0.02</Td>
                <Td isNumeric>1.1</Td>
              </Tr>
              <Tr>
                <Td>{`${"0x43dws4be1F454E6a72230Bce064d998779a902747F580".substr(
                  0,
                  6
                )}...${"0x4be1F454E6a72230Bce064d998779a902747F580as32".substr(
                  -4
                )}`}</Td>
                <Td>Silver</Td>
                <Td>2022-02-04</Td>
                <Td>2022-02-24</Td>
                <Td isNumeric>0.3</Td>
                <Td isNumeric>1.15</Td>
              </Tr>
              <Tr>
                <Td>{`${"0x43dwbe1F454E6a72230Bce064d998779a902747F580".substr(
                  0,
                  6
                )}...${"0x4be1F454E6a72230Bce064d998779a902747F580de32".substr(
                  -4
                )}`}</Td>
                <Td>Silver</Td>
                <Td>2022-02-03</Td>
                <Td>2022-03-03</Td>
                <Td isNumeric>0.3</Td>
                <Td isNumeric>2.35</Td>
              </Tr>
              <Tr>
                <Td>{`${"0x4be1F454E6a72230Bce064d998779a902747F580".substr(
                  0,
                  6
                )}...${"0x4be1F454E6a72230Bce064d998779a902747F580".substr(
                  -4
                )}`}</Td>
                <Td>Silver</Td>
                <Td>2022-02-03</Td>
                <Td>2022-03-03</Td>
                <Td isNumeric>0.53</Td>
                <Td isNumeric>9.165</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
    </>
  );
}

export default Members;
