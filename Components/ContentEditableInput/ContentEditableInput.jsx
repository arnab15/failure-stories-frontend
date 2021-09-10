import { Box, Flex, Text, Button } from "@chakra-ui/react";
import React, { useState } from "react";

function ContentEditableInput({
  ref,
  value,
  onSubmit,
  submitButtonText = "Submit",
  isEditable = false,
  submiting = false,
  isCancelButtonVisible = false,
}) {
  const [textvalue, settextvalue] = useState("");
  const [contentEditable, setcontentEditable] = useState(isEditable);
  const handelDivClick = () => {
    setcontentEditable(true);
    settextvalue("");
  };
  return (
    <Box shadow="md" p="3" my="1.5">
      <Box
        py="2"
        px="3"
        contentEditable={contentEditable}
        onInput={(e) => {
          console.log("Text inside div", e.currentTarget.textContent);
          settextvalue(e.currentTarget.textContent);
        }}
        suppressContentEditableWarning
        ref={ref}
        placeholder="Write Your thought here"
        _focus={{
          outline: "none",
        }}
        // onFocusCapture={() => setplaceholderVisible(false)}
        onClick={handelDivClick}
      >
        {!contentEditable && textvalue.length < 1 && (
          <Text
            display={`${contentEditable && "none"}`}
            pointerEvents="none"
            opacity="0.333"
          >
            Write something here
          </Text>
        )}
      </Box>
      <Flex justifyContent="space-between" py="2" mt="1">
        {isCancelButtonVisible && (
          <Button
            py="1"
            px="2.5"
            colorScheme="gray"
            variant="solid"
            borderRadius="full"
            cursor="pointer"
            disabled
          >
            cancel
          </Button>
        )}

        <Button
          py="0.5"
          px="2.5"
          borderRadius="full"
          colorScheme="teal"
          variant="solid"
          cursor="pointer"
          disabled={!!(submiting || textvalue.length < 1)}
          outline="none"
          onClick={() => {
            onSubmit(textvalue);
          }}
        >
          {submitButtonText}
        </Button>
      </Flex>
    </Box>
  );
}

export default ContentEditableInput;
