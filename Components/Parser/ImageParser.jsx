/* eslint-disable react/prop-types */
import { Image } from "@chakra-ui/react";
import React from "react";

function ImageParser({ block }) {
  return (
    <>
      {block && block.type === "image" && block.data.file.url && (
        <Image maxHeight="315" objectFit="cover" src={block.data.file.url} />
      )}
      {block && block.type === "InlineImage" && block.data.url && (
        <Image maxHeight="315" objectFit="cover" src={block.data.url} />
      )}
    </>
  );
}

export default ImageParser;
