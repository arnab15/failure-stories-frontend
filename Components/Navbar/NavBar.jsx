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
                            <Flex alignItems="center">
                              <Text h="5" w="5" color="blue.500" mr="2">
                                <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Text>
                              <Text>Write a Story</Text>
                            </Flex>
                          </Text>
                        </NextLink>

                        <NextLink
                          href={{
                            pathname: "/profile/stories/[name]",
                            query: { name: "unpublished" },
                          }}
                        >
                          <Text fontSize="smaller" cursor="pointer">
                            <Flex alignItems="center">
                              <Text h="5" w="5" color="blue.500" mr="2">
                                <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Text>
                              <Text>Stories</Text>
                            </Flex>
                          </Text>
                        </NextLink>
                        <NextLink href="/profile/settings">
                          <Text fontSize="smaller" cursor="pointer">
                            <Flex alignItems="center">
                              <Text h="5" w="5" color="blue.500" mr="2">
                                <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Text>
                              <Text>Account Settings</Text>
                            </Flex>
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
                          <Flex alignItems="center">
                            <Text h="5" w="5" color="blue.500" mr="2">
                              <svg
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                              </svg>
                            </Text>
                            <Text>Bookmarked Stories</Text>
                          </Flex>
                        </Text>
                        <NextLink href="/logout">
                          <Text fontSize="md" cursor="pointer">
                            <Flex alignItems="center">
                              <Text h="5" w="5" color="blue.500" mr="2">
                                <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Text>
                              <Text>Logout</Text>
                            </Flex>
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
