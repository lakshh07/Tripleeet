import React, { useState, useEffect } from "react";
import {
  Box,
  chakra,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Text,
  Button,
  useColorModeValue,
  InputLeftAddon,
  Textarea,
  useToast,
} from "@chakra-ui/react";

function UserProfile() {
  const toast = useToast();
  const [profile, setProfile] = useState();

  useEffect(() => {
    profile &&
      toast({
        title: `Profile Saved !!`,
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
  }, [profile]);

  const saveProfile = () => {
    setProfile(false);
    setTimeout(() => {
      setProfile(true);
    }, 2000);
  };
  return (
    <>
      <Box mx="9%" mt="1em">
        <chakra.form
          // method="POST"
          //   bg="#F5F5F5"
          shadow="base"
          rounded={[null, "md"]}
          overflow={{ sm: "hidden" }}
        >
          <Stack
            px={3}
            py={5}
            // bg={useColorModeValue("white", "gray.700")}
            spacing={6}
            p={{ sm: 6 }}
          >
            <FormControl>
              <FormLabel fontSize="lg" fontFamily="Inter" fontWeight="md">
                Name
              </FormLabel>
              <InputGroup size="sm">
                <Input
                  fontFamily="Inter"
                  type="text"
                  placeholder="Your Name"
                  borderColor="black"
                  focusBorderColor="gray.700"
                  rounded="md"
                  //   onChange={(e) => setName(e.target.value)}
                  //   value={name}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="lg" fontFamily="Inter" fontWeight="md">
                Bio
              </FormLabel>
              <InputGroup size="sm">
                <Textarea
                  fontFamily="Inter"
                  type="text"
                  placeholder="your Bio"
                  borderColor="black"
                  focusBorderColor="gray.700"
                  rounded="md"
                  //   onChange={(e) => setBio(e.target.value)}
                  //   value={bio}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="lg" fontFamily="Inter" fontWeight="md">
                Profile Pic:
              </FormLabel>
              <InputGroup borderColor="black">
                <InputLeftAddon
                  bg="blackAlpha.500"
                  color="white"
                  children="Choosen File"
                />
                <Input type="tel" placeholder="no file choosen" />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="lg" fontFamily="Inter" fontWeight="md">
                Cover Pic:
              </FormLabel>
              <InputGroup borderColor="black">
                <InputLeftAddon
                  bg="blackAlpha.500"
                  color="white"
                  children="Choosen File"
                />
                <Input type="tel" placeholder="no file choosen" />
              </InputGroup>
            </FormControl>

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
              onClick={saveProfile}
            >
              Save
            </Button>
          </Stack>
        </chakra.form>
      </Box>
    </>
  );
}

export default UserProfile;
