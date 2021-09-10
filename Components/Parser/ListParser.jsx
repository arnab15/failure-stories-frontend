/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import {
  Box,
  List,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { decode } from "html-entities";

function ListParser({ block }) {
  console.log("list---", block);
  if (block && block.type === "list" && block.data.style === "unordered") {
    return (
      <Box my="3">
        <List>
          <UnorderedList>
            <VStack spacing="4" alignItems="flex-start">
              {block.data.items.map((item) => (
                <ListItem key={item}>
                  <Text
                    fontSize={["14px", "20px"]}
                    lineHeight={["24px", "28px"]}
                  >
                    {decode(item)}
                  </Text>
                </ListItem>
              ))}
            </VStack>
          </UnorderedList>
        </List>
      </Box>
    );
  }
  if (block && block.type === "list" && block.data.style === "ordered") {
    return (
      <Box my="3">
        <List>
          <OrderedList>
            <VStack spacing="4" alignItems="flex-start">
              {block.data.items.map((item) => (
                <ListItem key={item}>
                  <Text
                    fontSize={["14px", "20px"]}
                    lineHeight={["24px", "28px"]}
                  >
                    {decode(item)}
                  </Text>
                </ListItem>
              ))}
            </VStack>
          </OrderedList>
        </List>
      </Box>
    );
  }
  return null;
}

export default ListParser;
