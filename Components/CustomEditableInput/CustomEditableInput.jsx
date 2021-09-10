/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import {
  ButtonGroup,
  IconButton,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  useEditableControls,
  Box,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

function CustomEditableInput({ initialValue, placeholder, value, onSave, as }) {
  const [name, setName] = useState(value);
  const handelChange = (e) => {
    setName(e.target.value);
  };
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
    );
  }

  return (
    <Box width="100%">
      <Editable
        _focus={{ outline: "none" }}
        defaultValue={initialValue}
        isPreviewFocusable={false}
        value={name}
        onSubmit={onSave}
        placeholder={placeholder}
      >
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <EditablePreview mx="3.5" />
          <EditableInput
            onChange={handelChange}
            p="3"
            mx="3.5"
            _focus={{ outline: "none" }}
            as={as}
          />
          <EditableControls />
        </Flex>
      </Editable>
    </Box>
  );
}

export default CustomEditableInput;
