/* eslint-disable react/prop-types */
import { Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { decode } from "html-entities";

/**
 * it will create title on the basis of block data
 * title can be image or h1 so after check first block it will return image or h1 tag with style
 */

function Title({ blocks }) {
  const [firstBlock, setFirstBlock] = useState();
  const [isImage, setIsImage] = useState();
  const [isInlineImage, setisInlineImage] = useState();
  useEffect(() => {
    if (blocks && blocks.length > 0) {
      const fBlock = blocks[0];
      if (fBlock.type === "header") {
        setIsImage(false);
        setFirstBlock(fBlock);
      } else if (fBlock.type === "image") {
        setIsImage(true);
        setisInlineImage(false);
        setFirstBlock(fBlock);
      } else if (fBlock.type === "InlineImage") {
        setIsImage(true);
        setisInlineImage(true);
        setFirstBlock(fBlock);
      }
    }
  }, []);
  console.log("blocks", blocks);
  return (
    <>
      {firstBlock && !isImage && (
        <Text
          my="4"
          as="h1"
          fontSize={["30px", "40px"]}
          fontWeight="700"
          lineHeight={["30px", "50px"]}
        >
          {decode(firstBlock.data.text)}
        </Text>
      )}
      {firstBlock &&
        isImage &&
        (!isInlineImage ? (
          <Image
            maxHeight="315"
            objectFit="cover"
            src={firstBlock.data.file.url}
          />
        ) : (
          <Image maxHeight="315" objectFit="cover" src={firstBlock.data.url} />
        ))}
    </>
  );
}

export default Title;
