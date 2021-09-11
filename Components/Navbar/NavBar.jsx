/* eslint-disable no-nested-ternary */
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import {
  MoonIcon,
  SunIcon,
  HamburgerIcon,
  CloseIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";
import React from "react";

import NextLink from "next/link";
import { useAuth } from "../../context/AuthContextProvider";

const Links = [
  { name: "Home", path: "/" },
  // { name: "Write a story", path: "/editor" },
  // { name: "Login", path: "/login" },
  // { name: "Create an account", path: "/signup" },
];

// eslint-disable-next-line react/prop-types
const NavLink = ({ children, path }) => (
  <Link
    as={NextLink}
    px={2}
    py={1}
    rounded="md"
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={path}
  >
    {children}
  </Link>
);

// eslint-disable-next-line react/prop-types
export default function Navbar({ children }) {
  const { currentUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        boxShadow="md"
        px={4}
        width="100%"
        position="fixed"
        top="0"
        zIndex="sticky"
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          /> */}
          <HStack spacing={8} alignItems="center">
            <NextLink href="/">
              <Box>Logo</Box>
            </NextLink>
            {/* <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
              {Links.map(({ name, path }) => (
                <NavLink key={name} path={path}>
                  {name}
                </NavLink>
              ))}
            </HStack> */}
          </HStack>
          <Flex alignItems="center">
            {currentUser ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}
                >
                  <Avatar
                    size="sm"
                    src={
                      currentUser.profilePic
                        ? currentUser.profilePic
                        : "https://bit.ly/dan-abramov"
                    }
                  />
                </MenuButton>
                <MenuList>
                  <Box>
                    <Flex direction="row" p="1" alignItems="center" px="3.5">
                      <Box>
                        <Avatar
                          name="Dan Abrahmov"
                          size="sm"
                          src={
                            currentUser.profilePic
                              ? currentUser.profilePic
                              : "https://bit.ly/dan-abramov"
                          }
                        />
                      </Box>
                      <Box pl="3">
                        <Flex direction="column">
                          <Text as="p" fontSize="sm">
                            {currentUser.name}
                          </Text>
                          <Text as="p" fontSize="sm">
                            @{currentUser.username}
                          </Text>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                  <MenuDivider />
                  <Box>
                    <Flex
                      direction="column"
                      alignItems="flex-start"
                      pl="5"
                      py="1.5"
                    >
                      <Stack spacing="4">
                        <NextLink href="/story/new-story">
                          <Text fontSize="smaller" cursor="pointer">
                            Write a Story
                          </Text>
                        </NextLink>

                        <NextLink
                          href={{
                            pathname: "/profile/stories/[name]",
                            query: { name: "unpublished" },
                          }}
                        >
                          <Text fontSize="smaller" cursor="pointer">
                            Stories
                          </Text>
                        </NextLink>
                        <NextLink href="/profile/settings">
                          <Text fontSize="smaller" cursor="pointer">
                            Settings
                          </Text>
                        </NextLink>
                      </Stack>
                    </Flex>
                  </Box>
                  <MenuDivider />
                  <Box>
                    <Flex
                      direction="column"
                      alignItems="flex-start"
                      pl="5"
                      py="1.5"
                    >
                      <Stack spacing="4">
                        <Text fontSize="smaller" cursor="pointer">
                          Saved Stories
                        </Text>
                        <Text fontSize="smaller" cursor="pointer">
                          Read Later
                        </Text>
                        <NextLink href="/logout">
                          <Text fontSize="smaller" cursor="pointer">
                            Logout
                          </Text>
                        </NextLink>
                      </Stack>
                    </Flex>
                  </Box>
                  <MenuDivider />
                  <Flex my="1.5" justifyContent="center">
                    <IconButton
                      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                      onClick={toggleColorMode}
                      _focus={{
                        outline: "none",
                      }}
                    >
                      Switch Mode
                    </IconButton>
                  </Flex>
                </MenuList>
              </Menu>
            ) : (
              <NextLink href="/login">
                <Button
                  colorScheme="gray"
                  // _hover={{ bg: "green.200" }}
                  rightIcon={<ArrowForwardIcon />}
                >
                  <Text>Login</Text>
                </Button>
              </NextLink>
            )}
          </Flex>
        </Flex>
        {/* 
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4}>
              {Links.map(({ name, path }) => (
                <NavLink key={name} path={path}>
                  {name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null} */}
      </Box>
      <Box position="relative" zIndex={1}>
        {children}
      </Box>
    </>
  );
}
