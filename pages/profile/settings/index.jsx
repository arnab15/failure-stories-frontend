/* eslint-disable import/no-extraneous-dependencies */
import {
  Box,
  Text,
  Divider,
  Flex,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  Button,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import CustomEditableInput from "../../../Components/CustomEditableInput/CustomEditableInput";
import withProtectedRoute from "../../../hoc/withProtectedRoute";
import {
  getUserProfileDetails,
  updateBio,
  updateName,
} from "../../../services/profileService";

// eslint-disable-next-line no-unused-vars
function ProfileSettings(_props) {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    isOpen: isDeactivateOpen,
    onOpen: onDeactivateOpen,
    onClose: onDeactivateClose,
  } = useDisclosure();

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const { data } = await getUserProfileDetails();
      console.log("data---", data);
      setUserDetails(data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  const onNameSave = async (value) => {
    console.log("name", value);
    try {
      await updateName(value);
      await fetchUserProfile();
    } catch (error) {
      toast({
        title: error?.response?.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handelBioSave = async (bio) => {
    console.log("bio", bio);
    try {
      await updateBio(bio);
      await fetchUserProfile();
    } catch (error) {
      toast({
        title: error?.response?.data.error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handelUsernameSave = (username) => {
    console.log("username", username);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handelAccountDelete = () => {};
  return (
    <Box p="2">
      <Box>
        <Skeleton isLoaded={!loading}>
          <Text as="h3" fontWeight="600" fontSize="25px" pl="4" mt="6">
            About You
          </Text>
          <Divider my="3.5" />
          <Text as="h3" fontWeight="500" fontSize="20px" pl="4">
            Name
          </Text>
          {userDetails.name && (
            <CustomEditableInput
              initialValue={userDetails?.name}
              value={userDetails?.name}
              onSave={onNameSave}
            />
          )}

          <Divider my="3.5" w="80%" />
          <Text as="h3" fontWeight="500" fontSize="20px" pl="4">
            Bio
          </Text>
          {userDetails.bio ? (
            <CustomEditableInput
              initialValue={userDetails.bio}
              value={userDetails.bio}
              onSave={handelBioSave}
              as="textarea"
            />
          ) : (
            <CustomEditableInput
              placeholder="Write something about you here"
              onSave={handelBioSave}
              as="textarea"
            />
          )}

          <Divider my="3.5" w="80%" />
          <Box>
            <Text as="h3" fontWeight="500" fontSize="20px" pl="4">
              Photo
            </Text>
          </Box>
          <Divider my="3.5" />
          <Box>
            <Text as="h3" fontWeight="500" fontSize="20px" pl="4">
              Username
            </Text>
            <Box pl="4" py="2">
              {userDetails.username && (
                <CustomEditableInput
                  initialValue={userDetails?.username}
                  value={userDetails?.username}
                  onSave={handelUsernameSave}
                />
              )}
            </Box>
            <Text pl="4" py="2">
              <Text as="span" fontWeight="500" fontSize="16px" pr="2">
                Url
              </Text>
              <Text as="span">failure.com/{userDetails.username}</Text>
            </Text>
          </Box>
          <Divider my="3.5" />
          <Box>
            <Text as="h3" fontWeight="500" fontSize="20px" pl="4">
              Security
            </Text>
            <Divider my="3.5" />
            <Text as="h3" fontWeight="500" fontSize="20px" pl="4">
              Deactivate account
            </Text>
            <Text pl="4">
              Deactivating your account will remove it from failue within a few
              minutes.You can sign back in anytime to reactivate your account
              and restore its content.
            </Text>
            <Text
              pl="4"
              textDecoration="underline"
              color="gray.600"
              _hover={{ color: "red.400", cursor: "pointer" }}
              onClick={onDeactivateOpen}
            >
              Deactivate Account
            </Text>
            <FullScreenModal
              isOpen={isDeactivateOpen}
              onClose={onDeactivateClose}
              successButtonText="Deactivate"
              onSubmit={handelAccountDelete}
              description="Are you sure you want to Deactivate your account?"
            />
            <Divider my="3.5" />
            <Text as="h3" fontWeight="500" fontSize="20px" pl="4">
              Delete account
            </Text>
            <Text pl="4">
              Permanently delete your account and all of your content.
            </Text>
            <Text
              pl="4"
              textDecoration="underline"
              color="gray.600"
              _hover={{ color: "red.400", cursor: "pointer" }}
              onClick={onOpen}
            >
              Delete Account
            </Text>
            <FullScreenModal
              isOpen={isOpen}
              onClose={onClose}
              successButtonText="Delete"
              onSubmit={handelAccountDelete}
              description="Are you sure you want to Delete your account?"
            />
          </Box>
        </Skeleton>
      </Box>
    </Box>
  );
}

function FullScreenModal({
  isOpen,
  onClose,
  successButtonText,
  onSubmit,
  description,
}) {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size="full"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex justifyContent="center" my="50%">
            <Box>
              <Text as="h3" fontWeight="bold">
                Confirm
              </Text>
              <Text>{description}</Text>
              <Flex my="4">
                <Button colorScheme="red" mr="4" onClick={() => onSubmit()}>
                  {successButtonText}
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </Flex>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default dynamic(
  () => Promise.resolve(withProtectedRoute(ProfileSettings)),
  {
    ssr: false,
  }
);
